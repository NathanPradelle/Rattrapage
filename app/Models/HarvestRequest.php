<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HarvestRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'building_number',
        'street',
        'city',
        'postal_code',
        'country',
        'quantity',
        'preferred_date',
        'period',
        'warehouse_id',
        'status',
        'note',
    ];

    // Relation avec le modèle User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec le modèle Warehouse
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function volunteers()
    {
        return $this->belongsToMany(User::class, 'harvest_volunteer', 'harvest_request_id', 'user_id');
    }
}
