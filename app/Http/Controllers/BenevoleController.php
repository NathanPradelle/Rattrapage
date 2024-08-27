<?php

namespace App\Http\Controllers;

use App\Models\Benevole;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BenevoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Candidature/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Validation des services pour éviter les doublons
        $services = array_filter([$request->input('service_1'), $request->input('service_2'), $request->input('service_3')]);
        if (count($services) !== count(array_unique($services))) {
            return back()->withErrors(['candidature' => 'Vous ne pouvez pas sélectionner le même service plusieurs fois.']);
        }

        $existingCandidature = Benevole::where('user_id', $user->id)->first();

        if ($existingCandidature) {
            // Vérifier si la validation est à 0
            if ($existingCandidature->validation == 0 || $existingCandidature->validation == 3) {
                $profileLink = route('profile.edit');
                $message = 'Vous avez déjà candidaté, vous pouvez voir le statut de votre candidature en cliquant <u><a href="' . $profileLink . '">ici</a></u>.';
                return back()->withErrors(['candidature' => $message]);
            }

            // Vérifier si la validation est à 2
            // et que la date de dernière candidature est trop récente (moins de 1 jour)
            if ($existingCandidature->validation === 2) {
                $dateDerniereCandidature = Carbon::parse($existingCandidature->date_derniere_candidature);
                $now = Carbon::now();

                if ($dateDerniereCandidature->diffInDays($now) < 1) {
                    $nextPossibleDate = $dateDerniereCandidature->addDay();
                    $profileLink = route('profile.edit');
                    $message = 'Votre dernière candidature a été refusée, vous pourrez de nouveau candidater le ' . $nextPossibleDate->format('Y-m-d H:i:s') . '. Retrouvez le motif du refus en cliquant <u><a href="' . $profileLink . '">ici</a></u>.';
                    return back()->withErrors(['candidature' => $message]);
                }
            }

            // Si aucune des conditions ci-dessus n'est vraie, mettre à jour la candidature existante
            return $this->update($request, $existingCandidature);
        }

        $validated = $request->validate([
            'phone' => ['required', 'regex:/^\+?[0-9]{7,15}$/'],
            'motif' => ['required', 'string', 'max:255'],
            'service_1' => ['required', 'integer', 'exists:services,id'],
            'service_2' => ['nullable', 'integer', 'exists:services,id'],
            'service_3' => ['nullable', 'integer', 'exists:services,id'],
            'nationalite' => ['required', 'string', 'max:100'],
            'age' => ['required', 'integer', 'min:18'],
        ]);

        Benevole::create([
            'user_id' => $user->id,
            'phone' => $validated['phone'],
            'validation' => 0, // Par défaut non validé
            'motif' => $validated['motif'],
            'service_1' => $validated['service_1'],
            'service_2' => $validated['service_2'],
            'service_3' => $validated['service_3'],
            'nationalite' => $validated['nationalite'],
            'date_derniere_candidature' => now(),
            'age' => $validated['age'],
        ]);

        return redirect()->route('welcome')->with('success', 'Candidature soumise avec succès!');
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $candidature = Benevole::with(['service1', 'service2', 'service3', 'user'])->findOrFail($id);

        return Inertia::render("Candidature/Show", [
            'candidature' => [
                'id' => $candidature->id,
                'name' => $candidature->user->name,
                'email' => $candidature->user->email,
                'phone' => $candidature->phone,
                'date_derniere_candidature' => $candidature->date_derniere_candidature,
                'motif' => $candidature->motif,
                'service_1' => $candidature->service1 ? $candidature->service1->name : null,
                'service_2' => $candidature->service2 ? $candidature->service2->name : null,
                'service_3' => $candidature->service3 ? $candidature->service3->name : null,
                'validation' => $candidature->validation,
                'refus' => $candidature->refus,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, benevole $benevole)
    {
        $validated = $request->validate([
            'phone' => ['required', 'regex:/^\+?[0-9]{7,15}$/'],
            'motif' => ['required', 'string', 'max:255'],
            'service_1' => ['required', 'integer', 'exists:services,id'],
            'service_2' => ['nullable', 'integer', 'exists:services,id'],
            'service_3' => ['nullable', 'integer', 'exists:services,id'],
            'nationalite' => ['required', 'string', 'max:100'],
            'age' => ['required', 'integer', 'min:18'],
        ]);

        // Mise à jour de la candidature existante
        $benevole->update([
            'phone' => $validated['phone'],
            'motif' => $validated['motif'],
            'service_1' => $validated['service_1'],
            'service_2' => $validated['service_2'],
            'service_3' => $validated['service_3'],
            'nationalite' => $validated['nationalite'],
            'date_derniere_candidature' => now(), // Mise à jour de la date de dernière candidature
            'age' => $validated['age'],
        ]);

        return redirect()->route('candidature')->with('success', 'Candidature mise à jour avec succès!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(benevole $benevole)
    {
        //
    }

    public function candidaturesEnAttente(Request $request): Response
    {
        // Récupérer les candidatures en attente
        $candidatures = Benevole::where('validation', 0)
            ->orderBy('date_derniere_candidature', 'asc')
            ->paginate(15)
            ->through(function ($candidature) {
                return [
                    'id' => $candidature->id,
                    'name' => $candidature->user->name,
                    'email' => $candidature->user->email,
                    'date_derniere_candidature' => Carbon::parse($candidature->date_derniere_candidature)->format('Y-m-d'),
                    'service_1' => $candidature->service1->name,
                    'service_2' => $candidature->service2->name ?? null,
                    'service_3' => $candidature->service3->name ?? null,
                ];
            });

        return Inertia::render('Candidature/CandidatureA', [
            'candidatures' => $candidatures,
        ]);
    }

    public function candidaturesEnExamen(Request $request): Response
    {
        // Récupérer les candidatures en examen
        $candidatures = Benevole::where('validation', 3)
            ->orderBy('date_derniere_candidature', 'desc')
            ->paginate(15)
            ->through(function ($candidature) {
                return [
                    'id' => $candidature->id,
                    'name' => $candidature->user->name,
                    'email' => $candidature->user->email,
                    'date_derniere_candidature' => Carbon::parse($candidature->date_derniere_candidature)->format('Y-m-d'),
                    'service_1' => $candidature->service1->name,
                    'service_2' => $candidature->service2->name ?? null,
                    'service_3' => $candidature->service3->name ?? null,
                ];
            });

        return Inertia::render('Candidature/CandidatureE', [
            'candidatures' => $candidatures,
        ]);
    }

    public function candidaturesRefusees(Request $request): Response
    {
        // Récupérer les candidatures refusées
        $candidatures = Benevole::where('validation', 2)
            ->orderBy('date_derniere_candidature', 'desc')
            ->paginate(15)
            ->through(function ($candidature) {
                return [
                    'id' => $candidature->id,
                    'name' => $candidature->user->name,
                    'email' => $candidature->user->email,
                    'date_derniere_candidature' => Carbon::parse($candidature->date_derniere_candidature)->format('Y-m-d'),
                    'service_1' => $candidature->service1->name,
                    'service_2' => $candidature->service2->name ?? null,
                    'service_3' => $candidature->service3->name ?? null,
                ];
            });

        return Inertia::render('Candidature/CandidatureR', [
            'candidatures' => $candidatures,
        ]);
    }

    public function updateEnAttente($id)
    {
        $candidature = Benevole::findOrFail($id);
        $candidature->validation = 0; // En attente
        $candidature->save();

        return redirect()->route('candidatures.index.enattente')->with('success', 'La candidature a été remise en attente.');
    }

    public function updateEnExamen($id)
    {
        $candidature = Benevole::findOrFail($id);
        $candidature->validation = 3; // En cours d'examen
        $candidature->save();

        return redirect()->route('candidatures.index.enexamen')->with('success', 'La candidature est maintenant en cours d\'examen.');
    }
    public function updateRefusees($id, Request $request)
    {
        $request->validate([
            'refus' => 'required|string|max:255',
        ]);

        $candidature = Benevole::findOrFail($id);
        $candidature->validation = 2; // Refusée
        $candidature->refus = $request->input('refus'); // Texte de refus
        $candidature->save();

        return redirect()->route('candidatures.index.refusees')->with('success', 'La candidature a été refusée avec le motif indiqué.');
    }
    public function updateValidees($id)
    {
        $candidature = Benevole::findOrFail($id);
        $candidature->validation = 1; // Validée
        $candidature->save();

        // Mettre à jour le rôle de l'utilisateur candidat
        $user = $candidature->user;
        $user->role = 1; // Nouveau rôle
        $user->save();

        return redirect()->route('admin')->with('success', 'La candidature a été approuvée et le rôle du candidat a été mis à jour.');
    }

}
