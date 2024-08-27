<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'barcode',
        'quantity',
        'expiry_date',
        'location',
    ];
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }
}
