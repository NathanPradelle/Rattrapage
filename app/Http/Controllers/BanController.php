<?php

namespace App\Http\Controllers;

use App\Models\Ban;
use Illuminate\Http\Request;

class BanController extends Controller
{
    public function ban(Request $request)
    {
        $validatedData = $request->validate([
            'user' => ['required', 'integer'],
            'dateStart' => ['required', 'date'],
            'dateEnd' => ['required', 'date'],
            'reason' => ['required', 'max:255'],
        ]);

        $ban = (new Ban())->modelGetter((object) $validatedData);

        $ban->save();

        return response()->json(['success' => 'User banned successfully']);
    }

    public function banlist(int $id)
    {
        $bans = Ban::query()
            ->where('user', $id)
            ->distinct()
            ->get();
        
        $formattedBans = $bans->map(function ($ban) {
            return $ban->modelSetter();
        });

        return $formattedBans;
    }
}
