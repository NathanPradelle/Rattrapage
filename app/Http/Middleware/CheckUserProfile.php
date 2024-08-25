<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CheckUserProfile
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $profileAuth)
    {
        switch ($profileAuth) {
            case 'isAdmin':
                return $this->isAdmin($request, $next);
            case 'isManager':
                return $this->isManager($request, $next);
            case 'isProvider':
                return $this->isProvider($request, $next);
            case 'isTraveler':
                return $this->isTraveler($request, $next);
            case 'isLessor':
                return $this->isLessor($request, $next);
            default:
                throw new NotFoundHttpException();
        };
    }

    // TODO maybe change target page when not allowed
    public function isAdmin(Request $request, Closure $next): Response
    {
        $currentUser = User::join('user_profiles', 'users.id', '=', 'user_profiles.user')
            ->where('users.id', '=', auth()->id())
            ->where('users.profile_in_use', '=', 5)
            ->where('user_profiles.profile', '=', 5)
            ->get();

        if ($currentUser->isEmpty()) {
            throw new NotFoundHttpException();
        }

        return $next($request);
    }

    public function isManager(Request $request, Closure $next): Response
    {
        $currentUser = User::join('user_profiles', 'users.id', '=', 'user_profiles.user')
            ->where('users.id', '=', auth()->id())
            ->whereIn('users.profile_in_use', [4, 5])
            ->whereIn('user_profiles.profile', [4, 5])
            ->get();

        if ($currentUser->isEmpty()) {
            throw new NotFoundHttpException();
        }

        return $next($request);
    }

    public function isProvider(Request $request, Closure $next): Response
    {
        $currentUser = User::join('user_profiles', 'users.id', '=', 'user_profiles.user')
            ->where('users.id', '=', auth()->id())
            ->where('users.profile_in_use', '=', 3)
            ->where('user_profiles.profile', '=', 3)
            ->get();

        if ($currentUser->isEmpty()) {
            throw new NotFoundHttpException();
        }

        return $next($request);
    }

    public function isTraveler(Request $request, Closure $next): Response
    {
        $currentUser = User::join('user_profiles', 'users.id', '=', 'user_profiles.user')
            ->where('users.id', '=', auth()->id())
            ->where('users.profile_in_use', '=', 2)
            ->where('user_profiles.profile', '=', 2)
            ->get();

        if ($currentUser->isEmpty()) {
            throw new NotFoundHttpException();
        }

        return $next($request);
    }

    public function isLessor(Request $request, Closure $next): Response
    {
        $currentUser = User::join('user_profiles', 'users.id', '=', 'user_profiles.user')
            ->where('users.id', '=', auth()->id())
            ->where('users.profile_in_use', '=', 1)
            ->where('user_profiles.profile', '=', 1)
            ->get();

        if ($currentUser->isEmpty()) {
            throw new NotFoundHttpException();
        }

        return $next($request);
    }
}
