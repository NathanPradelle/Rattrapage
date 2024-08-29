<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Utils\FilePaths;


class ChatController extends Controller
{

    #region Pages

    public function chatsPage()
    {
        $userController = new UserController();
        $usersList = $userController->getAllForChatP();

        return Inertia::render(FilePaths::CHATS, [
            'users' => $usersList['users'],
            'pagination' => $usersList['pagination'],
        ]);
    }
    
    public function chatPage(int $id)
    {
        if (auth()->id() === $id) {
            return null;
        }

        $userController = new UserController();
        $user = $userController->getName($id);

        return Inertia::render(FilePaths::CHAT, [
            'interlocutor' => $user->modelSetter()
        ]);
    }

    #endregion

    #region Get

    public function getMessages(int $id)
    {
        $authUserId = auth()->id();
        $messages = Chat::with('firstUserLink', 'secondUserLink')
            ->where(function ($query) use ($authUserId, $id) {
                $query->where('user_first', $authUserId)
                    ->where('user_second', $id);
            })
            ->orWhere(function ($query) use ($authUserId, $id) {
                $query->where('user_first', $id)
                    ->where('user_second', $authUserId);
            })
            ->get();

        $messagesVm = $messages->map(function ($message) {
            return $message->modelSetter();
        });

        return $messagesVm;
    }

    #endregion

    public function sendMessage(Request $request)
    {
        $authUserId = auth()->id();
        $request['userFirst'] = $authUserId;
        $validatedData = $request->validate([
            'userFirst' => ['required', 'integer'],
            'userSecond' => ['required', 'integer'],
            'message' => ['required', 'max:255'],
        ]);

        $chat = (new Chat())->modelGetter((object) $validatedData);

        $chat->save();
        // broadcast(new MessageSent($chat))->toOthers();

        return redirect()->back()->with('success', "Message sent successfully");
    }
}

