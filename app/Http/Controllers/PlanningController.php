<?php

namespace App\Http\Controllers;

use App\Models\DistributionTour;
use App\Models\HarvestTour;
use App\Models\Planning;
use Carbon\Carbon;

class PlanningController extends Controller
{
    public function update(HarvestTour $harvest = null, DistributionTour $distribution = null)
    {
        if ($harvest) {
            $this->updatePlanning($harvest->id, $harvest->date, $harvest->volunteers, 'harvest_tour', $harvest->period);
        }
    
        if ($distribution) {
            $this->updatePlanning($distribution->id, $distribution->date, $distribution->volunteers, 'distribution_tour', $distribution->period);
        }
    }
    
    private function updatePlanning($tourId, $date, $volunteers, $tourType, $period)
    {
        $assignmentDate = Carbon::parse($date);
        $timeRanges = $this->getTimeRanges($period);
    
        foreach ($volunteers as $volunteer) {
            $planning = Planning::where($tourType, $tourId)->firstOrNew([
                'user_id' => $volunteer->user->id,
                $tourType => $tourId
            ]);
    
            $planning->date = $assignmentDate;
            $planning->time_start = $timeRanges['start'];
            $planning->time_end = $timeRanges['end'];
            $planning->save();
        }
    }
    
    private function getTimeRanges($period)
    {
        switch ($period) {
            case 'morning':
                return ['start' => '08:00', 'end' => '12:00'];
            case 'afternoon':
                return ['start' => '14:00', 'end' => '18:00'];
            case 'evening':
                return ['start' => '18:00', 'end' => '23:00'];
            default:
                throw new \Exception("Invalid period: $period");
        }
    }    
}
