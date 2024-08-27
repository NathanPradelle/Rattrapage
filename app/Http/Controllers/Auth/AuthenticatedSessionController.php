<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     * @throws ValidationException
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        if (Auth::user()->role != 2) {

            return redirect()->intended(route('welcome', absolute: false));
        }

        return redirect()->intended(route('admin', absolute: false));

    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function apiLogin(LoginRequest $request)
    {
        try {
            // Authentification de l'utilisateur
            $request->authenticate();

            $user = Auth::user();
            Log::info('Utilisateur authentifié', ['user_id' => $user->id]);

            // Vérification du rôle de l'utilisateur
            if ($user->role !== 2) {
                Log::warning('Accès refusé en raison d’un rôle non autorisé', ['user_id' => $user->id]);
                return response()->json([
                    'message' => 'Accès refusé : rôle non autorisé.'
                ], 403);
            }

            // Création d'un token
            $token = $user->createToken('auth_token')->plainTextToken;
            Log::info('Token créé', ['token' => $token]);

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la tentative de connexion : ' . $e->getMessage());
            return response()->json(['message' => 'Erreur interne du serveur. Veuillez réessayer plus tard.'], 500);
        }
    }

    /**
     * Détruit une session authentifiée pour l'API.
     */
    public function apiLogout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            Log::info('Utilisateur déconnecté avec succès', ['user_id' => $request->user()->id]);
            return response()->json(['message' => 'Déconnexion réussie'], 200);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la tentative de déconnexion : ' . $e->getMessage());
            return response()->json(['message' => 'Erreur interne du serveur. Veuillez réessayer plus tard.'], 500);
        }
    }
}
