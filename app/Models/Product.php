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
        'weight',
        'brand',
        'expiry_date',
        'warehouse_id',
        'distribution_tour_id',
    ];
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function distributionTour()
    {
        return $this->belongsTo(DistributionTour::class);
    }
}
