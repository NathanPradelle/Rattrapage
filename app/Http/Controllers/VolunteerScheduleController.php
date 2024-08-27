<?php

namespace App\Http\Controllers;

use App\Models\HarvestRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VolunteerScheduleController extends Controller
{
    public function index()
    {

        $assignments = HarvestRequest::whereHas('volunteers', function ($query) {
            $query->where('user_id', auth()->id());
        })->with(['user'])->orderBy('preferred_date', 'asc')->get();

        return Inertia::render('User/VolunteerSchedule', [
            'assignments' => $assignments,
        ]);
    }
}
