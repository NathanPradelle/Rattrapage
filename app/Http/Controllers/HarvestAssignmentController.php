<?php

namespace App\Http\Controllers;

use App\Models\HarvestRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HarvestAssignmentController extends Controller
{
    public function assign($id)
    {
        $request = HarvestRequest::findOrFail($id);
        $volunteers = User::where('role', 1)
            ->with(['benevole.service1', 'benevole.service2', 'benevole.service3'])
            ->select('id', 'name')
            ->get();


        return Inertia::render('Harvest/AssignVolunteers', [
            'request' => $request,
            'volunteers' => $volunteers,
        ]);
    }

    public function storeAssignment(Request $request, $id)
    {
        $request->validate([
            'volunteers' => 'required|array',
            'volunteers.*' => 'exists:users,id',
        ]);

        $harvestRequest = HarvestRequest::findOrFail($id);
        $volunteerIds = $request->input('volunteers');
        $harvestRequest->volunteers()->sync($volunteerIds);
        $harvestRequest->update(['status' => 'assigned']);

        return redirect()->route('harvest-requests.index')->with('success', 'Volunteers assigned successfully.');
    }
}
