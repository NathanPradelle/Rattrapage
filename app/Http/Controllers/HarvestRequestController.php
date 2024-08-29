<?php

namespace App\Http\Controllers;

use App\Models\HarvestRequest;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HarvestRequestController extends Controller
{
    public function create()
    {
        // Récupérer tous les entrepôts disponibles
        $warehouses = Warehouse::all();

        // Renvoyer la vue avec les entrepôts
        return Inertia::render('Harvest/CreateHarvestRequest', [
            'warehouses' => $warehouses,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'building_number' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'country' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'preferred_date' => 'required|date|after_or_equal:today',
            'period' => 'required|in:morning,afternoon,evening',
            'warehouse_id' => 'required|exists:warehouses,id', // Validation pour l'ID de l'entrepôt
            'note' => 'nullable|string',
        ]);

        HarvestRequest::create([
            'user_id' => auth()->id(),
            'building_number' => $request->building_number,
            'street' => $request->street,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
            'quantity' => $request->quantity,
            'preferred_date' => $request->preferred_date,
            'period' => $request->period,
            'warehouse_id' => $request->warehouse_id, // Stocker l'ID de l'entrepôt
            'note' => $request->note,
        ]);

        return redirect()->route('welcome')->with('success', 'Harvest request submitted successfully.');
    }



    public function index(Request $request)
    {
        // Récupérer les filtres du query string
        $search = $request->input('search');
        $warehouseId = $request->input('warehouse_id');
        $period = $request->input('period');
        $status = $request->input('status');

        // Récupérer toutes les demandes de récolte avec les relations nécessaires
        $query = HarvestRequest::with(['user', 'warehouse']);

        // Filtrer par recherche de nom d'utilisateur ou de ville
        if ($search) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            })->orWhere('city', 'like', '%' . $search . '%');
        }

        // Filtrer par entrepôt
        if ($warehouseId) {
            $query->where('warehouse_id', $warehouseId);
        }

        // Filtrer par période
        if ($period) {
            $query->where('period', $period);
        }

        // Filtrer par statut
        if ($status) {
            $query->where('status', $status);
        }

        // Paginer les résultats
        $requests = $query->paginate(25);

        // Récupérer tous les entrepôts pour le filtrage
        $warehouses = Warehouse::all();

        // Renvoyer les résultats à la vue avec les filtres appliqués
        return Inertia::render('Harvest/HarvestRequestsIndex', [
            'requests' => $requests,
            'warehouses' => $warehouses,
            'filters' => [
                'search' => $search,
                'warehouse_id' => $warehouseId,
                'period' => $period,
                'status' => $status,
            ],
        ]);
    }


    public function complete($id)
    {
        $request = HarvestRequest::findOrFail($id);

        return Inertia::render('Harvest/CompleteHarvest', [
            'request' => $request,
        ]);
    }

    public function storeComplete(Request $request, $id)
    {
        $request->validate([
            'final_quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);

        $harvestRequest = HarvestRequest::findOrFail($id);
        $harvestRequest->update([
            'status' => 'completed',
            'final_quantity' => $request->final_quantity,
            'note' => $request->note,
        ]);

        return redirect()->route('admin.harvest-requests.index')->with('success', 'Harvest request completed successfully.');
    }

    public function show($id)
    {
        $request = HarvestRequest::with('user')->findOrFail($id);

        return Inertia::render('Harvest/HarvestRequestDetail', [
            'request' => $request,
        ]);
    }

    public function edit($id)
    {
        $request = HarvestRequest::findOrFail($id);

        return Inertia::render('Harvest/EditHarvestRequest', [
            'request' => $request,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'address' => 'required|string|max:255',
            'product_type' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'preferred_date' => 'required|date',
            'status' => 'required|in:pending,assigned,completed,cancelled',
            'note' => 'nullable|string',
        ]);

        $harvestRequest = HarvestRequest::findOrFail($id);
        $harvestRequest->update($request->all());

        return redirect()->route('admin.harvest-requests.index')->with('success', 'Harvest request updated successfully.');
    }

    public function destroy($id)
    {
        $harvestRequest = HarvestRequest::findOrFail($id);
        $harvestRequest->delete();

        return redirect()->route('admin.harvest-requests.index')->with('success', 'Harvest request deleted successfully.');
    }

    public function refuse($id)
    {
        $request = HarvestRequest::findOrFail($id);
        $request->status = 'refused';
        $request->save();

        return redirect()->route('harvest-requests.index')->with('success', 'Harvest request refused successfully.');
    }
}
