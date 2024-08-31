<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'date_start',
        'date_end'
    ];

    /// <summary>
    /// Fonction to set Service to return
    /// </summary>
    /// <return>ServiceVm.</return>
    public function modelSetter()
    {
        $service = [
            'id' => $this?->id,
            'name' => $this?->name,
            'description' =>  $this?->description,
            'dateStart' => $this?->date_start,
            'dateEnd' => $this?->date_end,
        ];

        return array_filter($service, function ($value) {
            return !is_null($value);
        });
    }

    /// <summary>
    /// Fonction to set ServiceVm to Service.
    /// </summary>
    /// <return>Service.</return>
    public function modelGetter($vm)
    {
        $serviceData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'name' => isset($vm?->name) ? $vm->name : null,
            'description' => isset($vm?->description) ? $vm->description : null,
            'date_start' => isset($vm?->dateStart) ? $vm->dateStart : null,
            'date_end' => isset($vm?->dateEnd) ? $vm->dateEnd : null,
        ];

        $service = new Service(array_filter($serviceData, function ($value) {
            return !is_null($value);
        }));

        return $service;
    }
}
