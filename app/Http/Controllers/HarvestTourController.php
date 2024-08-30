<?php

namespace App\Http\Controllers;

use App\Models\HarvestRequest;
use App\Models\HarvestTour;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HarvestTourController extends Controller
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

        // Mettre à jour le statut des harvest_requests à 'assigned'
        HarvestRequest::whereIn('id', $request->harvest_requests_ids)
            ->update(['status' => 'assigned']);

        return redirect()->route('harvest-requests.index')->with('success', 'Tournée créée avec succès.');
    }





    /**
     * Display the specified resource.
     */
    public function show(HarvestTour $harvestTour)
    {
        //
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
}
