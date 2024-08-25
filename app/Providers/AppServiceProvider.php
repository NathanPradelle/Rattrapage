<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('layouts.navigation', function ($view) {
            if (Auth::check()) {
                $user = User::findOrFail(Auth()->id());
                $notifications = $user->notifications()->latest()->take(5)->get();
                $view->with('notifications', $notifications)
                    ->with('user', $user);
            }
        });
    }
}
