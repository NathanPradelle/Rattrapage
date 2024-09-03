<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    use HasFactory;

    protected $fillable = [
        'user',
        'service',
        'harvest_tour',
        'distribution_tour',
        'date',
        'time_start',
        'time_end'
    ];

    public function userLink()
    {
        return $this->belongsTo(User::class, 'user');
    }

    public function serviceLink()
    {
        return $this->belongsTo(Service::class, 'service');
    }

    public function harvestLink()
    {
        return $this->belongsTo(HarvestTour::class, 'harvest_tour');
    }

    public function distributionLink()
    {
        return $this->belongsTo(DistributionTour::class, 'distribution_tour');
    }
}
