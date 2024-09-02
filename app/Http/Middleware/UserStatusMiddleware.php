<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Models\Ban;

class UserStatusMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if ($user) {
            // Vérifier si l'utilisateur est supprimé
            if ($user->deleted) {
                Auth::logout();
                return redirect('/login')->withErrors(['Votre compte est désactivé.']);
            }

            // Vérifier si l'utilisateur est banni
            $ban = Ban::where('user_id', $user->id)
                ->where('date_end', '>=', now())
                ->first();

            if ($ban) {
                Auth::logout();
                return redirect('/login')->withErrors(['Votre compte est banni jusqu\'au ' . $ban->date_end . '.']);
            }
        }

        return $next($request);
    }
}
