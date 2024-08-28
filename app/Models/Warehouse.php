<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'building_number',
        'street',
        'city',
        'postal_code',
        'country'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function fullAddress()
    {
        return "{$this->building_number} {$this->street}, {$this->city}, {$this->postal_code}, {$this->country}";
    }
}
