<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'country',
        'city',
        'postal_code',
        'street',
        'description',
        'date_start',
        'date_end',
        'is_validated',
    ];

    /// <summary>
    /// Fonction to set Tour to return
    /// </summary>
    /// <return>TourVm.</return>
    public function modelSetter()
    {
        $tour = [
            'id' => $this?->id,
            'name' => $this?->name,
            'country' => $this?->country,
            'city' => $this?->city,
            'postalCode' => $this?->postal_code,
            'street' => $this?->street,
            'description' =>  $this?->description,
            'dateStart' => $this?->date_start,
            'dateEnd' => $this?->date_end,
            'isValidated' =>  $this?->is_validated,
        ];

        return array_filter($tour, function ($value) {
            return !is_null($value);
        });
    }

    /// <summary>
    /// Fonction to set TourVm to Tour.
    /// </summary>
    /// <return>Tour.</return>
    public function modelGetter($vm)
    {
        $tourData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'name' => isset($vm?->name) ? $vm->name : null,
            'country' => isset($vm?->country) ? $vm->country : null,
            'city' => isset($vm?->priceWinter) ? $vm->city : null,
            'postal_code' => isset($vm?->postalCode) ? $vm->postalCode : null,
            'street' => isset($vm?->street) ? $vm->street : null,
            'description' => isset($vm?->description) ? $vm->description : null,
            'date_start' => isset($vm?->dateStart) ? $vm->dateStart : null,
            'date_end' => isset($vm?->dateEnd) ? $vm->dateEnd : null,
            'isValidated' => isset($vm?->isValidated) ? $vm->isValidated : null,
        ];

        $tour = new Tour(array_filter($tourData, function ($value) {
            return !is_null($value);
        }));

        return $tour;
    }
}
