<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HarvestTour extends Model
{
    use HasFactory;

    protected $fillable = [
        'warehouse_id',
        'date',
        'period',
        'volunteer_driver_id',
        'volunteer_assistants_ids',
        'harvest_requests_ids',
        'status',
        'chief_volunteer_id',
        'pdf_link',
    ];

    protected $casts = [
        'volunteer_assistants_ids' => 'array',
        'harvest_requests_ids' => 'array',
    ];

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function volunteerDriver()
    {
        return $this->belongsTo(User::class, 'volunteer_driver_id');
    }

    public function volunteers()
    {
        return $this->belongsToMany(User::class, 'harvest_tour_volunteer')
            ->withPivot('status')
            ->withTimestamps();
    }

    public function harvestRequests()
    {
        return $this->hasMany(HarvestRequest::class, 'id', 'harvest_requests_ids');
    }

    public function chiefVolunteer()
    {
        return $this->belongsTo(User::class, 'chief_volunteer_id');
    }
}
