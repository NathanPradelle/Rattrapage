<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benevole extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'validation',
        'motif',
        'service_id',
        'warehouse_id',
        'nationalite',
        'phone_number',
        'date_derniere_candidature',
        'age',
        'refus',
    ];

    // Relation avec le modèle User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec le modèle Service
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    // Relation avec le modèle Warehouse
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id');
    }
}
