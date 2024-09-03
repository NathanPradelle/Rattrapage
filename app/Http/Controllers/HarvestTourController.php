<?php

namespace App\Http\Controllers;

use App\Models\DistributionTour;
use App\Models\HarvestRequest;
use App\Models\HarvestTour;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class HarvestTourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = HarvestTour::query();

        // Appliquer les filtres s'ils sont définis
        if ($request->filled('search')) {
            $query->whereHas('volunteerDriver', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            })->orWhereHas('warehouse', function($q) use ($request) {
                $q->where('city', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('warehouse_id')) {
            $query->where('warehouse_id', $request->warehouse_id);
        }

        if ($request->filled('period')) {
            $query->where('period', $request->period);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $tours = $query->with(['volunteerDriver', 'warehouse'])->paginate(10);
        $warehouses = Warehouse::all();

        return Inertia::render('Harvest/HarvestToursIndex', [
            'tours' => $tours,
            'warehouses' => $warehouses,
            'filters' => $request->only(['search', 'warehouse_id', 'period', 'status']),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $warehouses = Warehouse::all();
        $services = ['morning', 'afternoon', 'evening'];

        return Inertia::render('Harvest/CreateHarvest', [
            'warehouses' => $warehouses,
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'date' => 'required|date|after:today',
            'period' => 'required|in:morning,afternoon,evening',
            'volunteer_driver_id' => 'required|exists:users,id',
            'volunteer_assistants_ids' => 'required|array|size:2',
            'volunteer_assistants_ids.*' => 'exists:users,id',
            'harvest_requests_ids' => 'required|array',
            'harvest_requests_ids.*' => 'exists:harvest_requests,id',
            'total_quantity' => 'required|integer|between:50,500',
        ]);

        // Charger toutes les tournées de récolte pour la date et la période spécifiées
        $toursOnSameDateAndPeriod = HarvestTour::where('date', $request->date)
            ->where('period', $request->period)
            ->get();

        // Vérifier la disponibilité du routier
        $driverIsAssigned = $toursOnSameDateAndPeriod->contains('volunteer_driver_id', $request->volunteer_driver_id);

        // Vérifier la disponibilité des assistants
        $assistantsAreAssigned = collect($request->volunteer_assistants_ids)->contains(function ($assistantId) use ($toursOnSameDateAndPeriod) {
            return $toursOnSameDateAndPeriod->contains(function ($tour) use ($assistantId) {
                return in_array($assistantId, json_decode($tour->volunteer_assistants_ids));
            });
        });

        if ($driverIsAssigned || $assistantsAreAssigned) {
            return back()->withErrors(['error' => 'Un ou plusieurs bénévoles sont déjà engagés dans une autre tournée pour cette date et période.']);
        }

        // Créer la tournée
        $harvestTour = HarvestTour::create([
            'warehouse_id' => $request->warehouse_id,
            'date' => $request->date,
            'period' => $request->period,
            'volunteer_driver_id' => $request->volunteer_driver_id,
            'volunteer_assistants_ids' => json_encode($request->volunteer_assistants_ids),
            'harvest_requests_ids' => json_encode($request->harvest_requests_ids),
            'status' => 'pending',
        ]);

        // Ajouter le routier à la table pivot
        $harvestTour->volunteers()->attach($request->volunteer_driver_id, ['status' => 'pending']);

        // Ajouter les assistants à la table pivot
        foreach ($request->volunteer_assistants_ids as $assistantId) {
            $harvestTour->volunteers()->attach($assistantId, ['status' => 'pending']);
        }

        // Mettre à jour le statut des harvest_requests à 'assigned'
        HarvestRequest::whereIn('id', $request->harvest_requests_ids)
            ->update(['status' => 'assigned']);

        return redirect()->route('harvest-requests.index')->with('success', 'Tournée créée avec succès.');
    }






    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $harvestTour = HarvestTour::with(['warehouse', 'volunteerDriver', 'volunteers', 'harvestRequests'])
            ->findOrFail($id);

        // Vérifier si la tournée est complétée et s'il y a un lien PDF
        $pdfAvailable = $harvestTour->status === 'completed' && !empty($harvestTour->pdf_link);

        return Inertia::render('Harvest/Show', [
            'harvestTour' => $harvestTour,
            'pdfAvailable' => $pdfAvailable,
            'pdfLink' => $pdfAvailable ? $harvestTour->pdf_link : null,
        ]);
    }







    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HarvestTour $harvestTour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HarvestTour $harvestTour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HarvestTour $harvestTour)
    {
        //
    }

    public function validateTour(HarvestTour $tour)
    {
        $volunteer = Auth::user();
        $volunteer->harvestToursVolunteer()->updateExistingPivot($tour->id, ['status' => 'accepted']);

        // Vérifier si tous les bénévoles ont validé
        if ($tour->volunteers()->wherePivot('status', 'pending')->count() === 0) {
            // Sélectionner un bénévole chef au hasard parmi les assistants
            $assistants = json_decode($tour->volunteer_assistants_ids, true);
            if ($assistants && count($assistants) > 0) {
                $randomAssistantId = $assistants[array_rand($assistants)];
                $tour->chief_volunteer_id = $randomAssistantId;
            }

            $tour->update(['status' => 'assigned']);
        }

        return redirect()->route('profile.edit')->with('success', 'Vous avez validé votre participation à la tournée.');
    }

    public function refuseTour(HarvestTour $tour)
    {
        $volunteer = Auth::user();
        $volunteer->harvestToursVolunteer()->updateExistingPivot($tour->id, ['status' => 'refused']);

        // Si un bénévole refuse, la tournée reste en attente pour un remplacement
        $tour->update(['status' => 'pending']);

        return redirect()->route('profile.edit')->with('error', 'Vous avez refusé de participer à la tournée.');
    }

    public function updateVolunteers(Request $request, $id)
    {
        $request->validate([
            'volunteer_driver_id' => 'nullable|exists:users,id',
            'volunteer_assistants_ids' => 'nullable|array|size:2',
            'volunteer_assistants_ids.*' => 'exists:users,id',
        ]);

        $harvestTour = HarvestTour::findOrFail($id);

        if ($request->filled('volunteer_driver_id')) {
            $harvestTour->volunteer_driver_id = $request->volunteer_driver_id;
        }

        if ($request->filled('volunteer_assistants_ids')) {
            $harvestTour->volunteer_assistants_ids = json_encode($request->volunteer_assistants_ids);
        }

        $harvestTour->save();

        return redirect()->route('harvest-tours.show', $harvestTour->id)->with('success', 'Volunteers updated successfully.');
    }

    public function showRecapForm($type, $id)
    {
        if ($type === 'harvest') {
            $tour = HarvestTour::findOrFail($id);
        } elseif ($type === 'distribution') {
            $tour = DistributionTour::findOrFail($id);
        } else {
            return redirect()->back()->withErrors(['error' => 'Type de tournée non reconnu.']);
        }

        $user = Auth::user();

        // Check if user is the chief volunteer for this tour
        $assistantsIds = json_decode($tour->volunteer_assistants_ids, true);

        if (is_array($assistantsIds) && $tour->chief_volunteer_id === $user->id) {
            // Render the recap form with the tour details and type
            return Inertia::render('Recap/RecapForm', [
                'tour' => $tour,
                'tourType' => $type
            ]);
        } else {
            return redirect()->back()->withErrors(['error' => 'Vous n\'êtes pas autorisé à remplir le récapitulatif de cette tournée.']);
        }
    }


    public function completeRecap(Request $request, $id)
    {
        $request->validate([
            'description' => 'required|string',
        ]);

        $harvestTour = HarvestTour::findOrFail($id);

        // Vérifier si l'utilisateur actuel est bien le chef bénévole
        if (Auth::id() !== $harvestTour->chief_volunteer_id) {
            return redirect()->route('profile.edit')->with('error', 'Vous n\'êtes pas autorisé à soumettre le récapitulatif pour cette tournée.');
        }

        // Mettre à jour le statut à 'completed'
        $harvestTour->status = 'completed';
        $harvestTour->save();

        // Générer le PDF
        $pdf = Pdf::loadView('pdf.harvest', ['harvestTour' => $harvestTour, 'description' => $request->description]);

        // Définir le nom de fichier pour le PDF
        $fileName = 'recap_tournee_' . $harvestTour->id . '.pdf';

        // Sauvegarder le PDF dans le système de fichiers (par exemple, dans storage/app/public)
        $pdf->save(storage_path('app/public/' . $fileName));

        // Ajouter le lien du PDF au HarvestTour
        $harvestTour->pdf_link = '/storage/' . $fileName;
        $harvestTour->save();

        return redirect()->route('welcome')->with('success', 'Récapitulatif validé et PDF généré avec succès.');
    }


}
