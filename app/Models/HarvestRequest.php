<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HarvestRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'address',
        'product_type',
        'quantity',
        'preferred_date',
        'status',
        'note'
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
