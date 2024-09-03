<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistributionTour extends Model
{
    use HasFactory;

    protected $fillable = [
        'warehouse_id',
        'date',
        'period',
        'volunteer_driver_id',
        'volunteer_assistants_ids',
        'address',
        'status',
        'chief_volunteer_id',
        'pdf_link',
    ];

    protected $casts = [
        'volunteer_assistants_ids' => 'array',
        'product_ids' => 'array',
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
        return $this->belongsToMany(User::class, 'distribution_tour_volunteer')
            ->withPivot('status')
            ->withTimestamps();
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'distribution_tour_id');
    }
}
