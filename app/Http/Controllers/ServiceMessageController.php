<?php

namespace App\Http\Controllers;

use App\Models\ServiceMessage;
use Illuminate\Http\Request;


class ServiceMessageController extends Controller
{

    public function getMessages(int $id)
    {
        $messages = ServiceMessage::with('userLink')
            ->where('service', $id)
            ->get();

        $messagesVm = $messages->map(function ($message) {
            return $message->modelSetter();
        });

        return $messagesVm;
    }

    public function sendMessage(Request $request)
    {
        $authUserId = auth()->id();
        $request['user'] = $authUserId;
        $validatedData = $request->validate([
            'service' => ['required', 'integer'],
            'user' => ['required', 'integer'],
            'message' => ['required', 'max:255'],
        ]);

        $chat = (new ServiceMessage())->modelGetter((object) $validatedData);

        $chat->save();

        return redirect()->back()->with('success', "Message sent successfully");
    }
}

