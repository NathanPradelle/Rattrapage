<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceMessage extends Model
{
    use HasFactory;

    protected $fillable = ['service', 'user', 'content'];

    public function userLink() {
        return $this->belongsTo(User::class, 'user');
    }

    public function serviceLink() {
        return $this->belongsTo(Service::class, 'service');
    }

    /// <summary>
    /// Fonction to set ChatMembers to return
    /// </summary>
    /// <return> a formatted ChatMembers </return>
    public function modelSetter()
    {
        $chat = [
            'id' => $this?->id,
            'user' => $this?->userLink?->modelSetter(),
            'message' => $this?->content,
        ];

        return array_filter($chat, function ($value) {
            return !is_null($value);
        });
    }

    /// <summary>
    /// Fonction to set ChatMembersVm to ChatMembers.
    /// </summary>
    /// <return>ChatMembers.</return>
    public function modelGetter($vm)
    {
        $userData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'service' => isset($vm?->service) ? $vm->service : null,
            'user' => isset($vm?->user) ? $vm->user : null,
            'content' => isset($vm?->message) ? $vm->message : null,
        ];

        $user = new ServiceMessage($userData);

        // if (isset($vm?->profiles)) {
        //     $user->userProfiles = $vm->profiles;
        // }

        return $user;
    }
}
