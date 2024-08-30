<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HarvestTour extends Model
{
    use HasFactory;

    protected $fillable = [
        'warehouse_id',
        'period',
        'date',
        'volunteer_driver_id',
        'volunteer_assistants_ids',
        'harvest_requests_ids',
        'status',
    ];

    protected $casts = [
        'volunteer_assistants_ids' => 'array',
        'harvest_requests_ids' => 'array',
    ];

    // Relations
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function volunteerDriver()
    {
        return $this->belongsTo(User::class, 'volunteer_driver_id');
    }

    public function harvestRequests()
    {
        return HarvestRequest::whereIn('id', $this->harvest_requests_ids)->get();
    }
}
