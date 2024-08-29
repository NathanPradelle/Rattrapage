<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = ['user_first', 'user_second', 'message'];

    public function firstUserLink()
    {
        return $this->belongsTo(User::class, 'user_first');
    }

    public function secondUserLink()
    {
        return $this->belongsTo(User::class, 'user_second');
    }

    /// <summary>
    /// Fonction to set chat to return
    /// </summary>
    /// <return> a formatted chat </return>
    public function modelSetter()
    {
        $chat = [
            'id' => $this?->id,
            'userFirst' => $this?->firstUserLink?->modelSetter(),
            'userSecond' => $this?->secondUserLink?->modelSetter(),
            'message' => $this?->message,
        ];

        return array_filter($chat, function ($value) {
            return !is_null($value);
        });
    }

    /// <summary>
    /// Fonction to set ChatVm to Chat.
    /// </summary>
    /// <return>Chat.</return>
    public function modelGetter($vm)
    {
        $userData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'user_first' => isset($vm?->userFirst) ? $vm->userFirst : null,
            'user_second' => isset($vm?->userSecond) ? $vm->userSecond : null,
            'message' => isset($vm?->message) ? $vm->message : null,
        ];

        $user = new Chat($userData);

        // if (isset($vm?->profiles)) {
        //     $user->userProfiles = $vm->profiles;
        // }

        return $user;
    }
}
