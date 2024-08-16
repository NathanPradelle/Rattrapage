<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Benevole;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {

        $user = $request->user();

        // Récupérer les informations de la candidature du bénévole si elles existent
        $candidature = Benevole::where('user_id', $user->id)->with(['service1', 'service2', 'service3'])->first();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'abonnement' => $user->abonnement,
            'status' => session('status'),
            'candidature' => $candidature ? [
                'date_derniere_candidature' => $candidature->date_derniere_candidature,
                'validation' => $candidature->validation,
                'service_1' => $candidature->service1 ? $candidature->service1->name : null,
                'service_2' => $candidature->service2 ? $candidature->service2->name : null,
                'service_3' => $candidature->service3 ? $candidature->service3->name : null,
                'refus' => $candidature->refus,
            ] : null,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
