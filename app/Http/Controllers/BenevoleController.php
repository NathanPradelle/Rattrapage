<?php

namespace App\Http\Controllers;

use App\Models\Benevole;
use App\Models\DistributionTour;
use App\Models\HarvestTour;
use App\Models\Service;
use App\Models\User;
use App\Models\Warehouse;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
    public function create()
    {
        // Récupérer les services et les entrepôts depuis la base de données
        $services = Service::all(); // Modèle Service
        $warehouses = Warehouse::all(); // Modèle Warehouse

        return Inertia::render('Candidature/Form', [
            'services' => $services,
            'warehouses' => $warehouses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

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

        // Validation des champs
        $validated = $request->validate([
            'phone_number' => ['required', 'regex:/^\+?[0-9]{7,15}$/'],
            'motif' => ['required', 'string', 'max:255'],
            'service_id' => ['required', 'integer', 'exists:services,id'], // Un seul service
            'warehouse_id' => ['required', 'integer', 'exists:warehouses,id'], // L'entrepôt associé
            'nationalite' => ['required', 'string', 'max:100'],
            'age' => ['required', 'integer', 'min:18'],
        ]);

        Benevole::create([
            'user_id' => $user->id,
            'phone_number' => $validated['phone_number'],
            'validation' => 0, // Par défaut non validé
            'motif' => $validated['motif'],
            'service_id' => $validated['service_id'],
            'warehouse_id' => $validated['warehouse_id'],
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
        $candidature = Benevole::with(['service', 'warehouse', 'user'])->findOrFail($id);

        return Inertia::render("Candidature/Show", [
            'candidature' => [
                'id' => $candidature->id,
                'name' => $candidature->user->name,
                'email' => $candidature->user->email,
                'phone_number' => $candidature->phone_number,
                'date_derniere_candidature' => $candidature->date_derniere_candidature,
                'motif' => $candidature->motif,
                'service' => $candidature->service ? $candidature->service->name : null,
                'warehouse' => $candidature->warehouse ? $candidature->warehouse->city : null,
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
    public function update(Request $request, Benevole $benevole)
    {
        $validated = $request->validate([
            'phone_number' => ['required', 'regex:/^\+?[0-9]{7,15}$/'],
            'motif' => ['required', 'string', 'max:255'],
            'service_id' => ['required', 'integer', 'exists:services,id'], // Un seul service
            'warehouse_id' => ['required', 'integer', 'exists:warehouses,id'], // L'entrepôt associé
            'nationalite' => ['required', 'string', 'max:100'],
            'age' => ['required', 'integer', 'min:18'],
        ]);

        // Mise à jour de la candidature existante
        $benevole->update([
            'phone_number' => $validated['phone_number'],
            'motif' => $validated['motif'],
            'service_id' => $validated['service_id'], // Un seul service
            'warehouse_id' => $validated['warehouse_id'], // ID de l'entrepôt associé
            'nationalite' => $validated['nationalite'],
            'date_derniere_candidature' => now(), // Mise à jour de la date de dernière candidature
            'age' => $validated['age'],
        ]);

        return redirect()->route('welcome')->with('success', 'Candidature mise à jour avec succès!');
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
                    'service' => $candidature->service->name ?? null,
                    'warehouse' => $candidature->warehouse->city ?? null, // Ville de l'entrepôt associé
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
                    'service' => $candidature->service->name ?? null,
                    'warehouse' => $candidature->warehouse->city ?? null, // Ville de l'entrepôt associé
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
                    'service' => $candidature->service->name ?? null,
                    'warehouse' => $candidature->warehouse->city ?? null, // Ville de l'entrepôt associé
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
        $user->role = 1; // Nouveau rôle pour le bénévole
        $user->save();

        return redirect()->route('admin')->with('success', 'La candidature a été approuvée et le rôle du candidat a été mis à jour.');
    }

    // VolunteerController
    public function filter(Request $request)
    {
        $warehouseId = $request->warehouse;
        $date = $request->date;
        $period = $request->period;

        // Récupérer toutes les tournées de récolte pour la date et la période spécifiées
        $toursOnSameDateAndPeriod = HarvestTour::where('date', $date)
            ->where('period', $period)
            ->get();

        // Récupérer toutes les demandes de récolte pour la date et la période spécifiées
        $harvestRequestsOnSameDateAndPeriod = HarvestRequest::where('preferred_date', $date)
            ->where('period', $period)
            ->get();

        // Récupérer tous les routiers disponibles dans l'entrepôt sélectionné
        $availableDrivers = User::whereHas('benevole', function ($query) use ($warehouseId) {
            $query->where('warehouse_id', $warehouseId)
                ->where('service_id', 1); // Filtrer les routiers
        })
            ->get()
            ->filter(function ($user) use ($toursOnSameDateAndPeriod, $harvestRequestsOnSameDateAndPeriod) {
                // Vérifier les tournées du conducteur
                $hasTourConflict = $toursOnSameDateAndPeriod->contains('volunteer_driver_id', $user->id);

                // Vérifier les demandes de récolte du conducteur
                $hasHarvestRequestConflict = $harvestRequestsOnSameDateAndPeriod->contains('user_id', $user->id);

                return !$hasTourConflict && !$hasHarvestRequestConflict;
            });

        // Récupérer tous les assistants bénévoles disponibles dans l'entrepôt sélectionné
        $availableAssistants = User::whereHas('benevole', function ($query) use ($warehouseId) {
            $query->where('warehouse_id', $warehouseId)
                ->where('service_id', '!=', 1); // Exclure les routiers pour cette liste
        })
            ->get()
            ->filter(function ($user) use ($toursOnSameDateAndPeriod, $harvestRequestsOnSameDateAndPeriod) {
                // Vérifier si le bénévole est déjà assigné comme routier ou assistant
                $isAssignedAsDriver = $toursOnSameDateAndPeriod->contains('volunteer_driver_id', $user->id);

                $isAssignedAsAssistant = $toursOnSameDateAndPeriod->contains(function ($tour) use ($user) {
                    return in_array($user->id, json_decode($tour->volunteer_assistants_ids));
                });

                // Vérifier les demandes de récolte de l'assistant
                $hasHarvestRequestConflict = $harvestRequestsOnSameDateAndPeriod->contains('user_id', $user->id);

                return !$isAssignedAsDriver && !$isAssignedAsAssistant && !$hasHarvestRequestConflict;
            });

        return response()->json([
            'drivers' => $availableDrivers->values(),
            'assistants' => $availableAssistants->values(),
        ]);
    }


    public function showMyAssignedTours(Request $request)
    {
        $user = $request->user();

        // Tournées de récolte où l'utilisateur est chef bénévole
        $harvestTours = HarvestTour::where('chief_volunteer_id', $user->id)
            ->where('status', 'assigned')
            ->with('warehouse')
            ->get();

        // Tournées de distribution où l'utilisateur est chef bénévole
        $distributionTours = DistributionTour::where('chief_volunteer_id', $user->id)
            ->where('status', 'assigned')
            ->get();

        return Inertia::render('Recap/VolunteerIndex', [
            'harvestTours' => $harvestTours,
            'distributionTours' => $distributionTours,
        ]);
    }


}
