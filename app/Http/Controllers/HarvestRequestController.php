<?php

namespace App\Http\Controllers;

use App\Models\HarvestRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HarvestRequestController extends Controller
{
    public function create()
    {
        return Inertia::render('Harvest/CreateHarvestRequest');
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
            'preferred_date' => 'required|date|after_or_equal:today', // Validation pour bloquer les dates passées
            'preferred_time' => 'required', // Vérifier que l'heure est fournie
            'note' => 'nullable|string',
        ]);

        // Combine date and time before storing
        $combinedDateTime = $request->preferred_date . ' ' . $request->preferred_time;

        HarvestRequest::create([
            'user_id' => auth()->id(),
            'building_number' => $request->building_number,
            'street' => $request->street,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
            'quantity' => $request->quantity,
            'preferred_date' => $combinedDateTime,
            'note' => $request->note,
        ]);

        return redirect()->route('welcome')->with('success', 'Harvest request submitted successfully.');
    }


    public function index()
    {
        if (auth()->user()->role === 2) { // Administrateur
            $requests = HarvestRequest::with('user')->orderBy('preferred_date', 'asc')->get();
        } else { // Particulier/Commerçant
            $requests = HarvestRequest::where('user_id', auth()->id())->orderBy('preferred_date', 'asc')->get();
        }

        return Inertia::render('Harvest/HarvestRequestsIndex', [
            'requests' => $requests,
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
}
