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
        'date',
        'time_start',
        'time_end'
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
            'date' => $this?->date,
            'timeStart' => $this?->time_start,
            'timeEnd' => $this?->time_end,
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
            'date' => isset($vm?->date) ? $vm->date : null,
            'time_start' => isset($vm?->timeStart) ? $vm->timeStart : null,
            'time_end' => isset($vm?->timeEnd) ? $vm->timeEnd : null,
        ];

        $service = new Service(array_filter($serviceData, function ($value) {
            return !is_null($value);
        }));

        return $service;
    }
}
