<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ban extends Model
{
    protected $table = 'ban';

    protected $fillable = [
        'user',
        'date_start',
        'date_end',
        'reason'
    ];

    /// <summary>
    /// Fonction to set ban to return
    /// </summary>
    /// <return> a formatted Ban </return>
    public function modelSetter()
    {
        $ban = [
            'id' => $this?->id,
            'dateStart' => $this?->date_start,
            'dateEnd' => $this?->date_end,
            'reason' => $this?->reason,
        ];

        return array_filter($ban, function ($value) {
            return !is_null($value);
        });
    }

    /// <summary>
    /// Fonction to set BanVm to Ban.
    /// </summary>
    /// <return>Ban.</return>
    public function modelGetter($vm)
    {
        $banData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'user' => isset($vm?->user) ? $vm->user : null,
            'date_start' => isset($vm?->dateStart) ? $vm->dateStart : null,
            'date_end' => isset($vm?->dateEnd) ? $vm->dateEnd : null,
            'reason' => isset($vm?->reason) ? $vm->reason : null,
        ];

        $ban = new Ban($banData);

        // if (isset($vm?->profiles)) {
        //     $user->userProfiles = $vm->profiles;
        // }

        return $ban;
    }
}
