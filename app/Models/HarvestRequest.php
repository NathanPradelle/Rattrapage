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
        'note',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function volunteers()
    {
        return $this->belongsToMany(User::class, 'harvest_volunteer', 'harvest_request_id', 'user_id');
    }
}
