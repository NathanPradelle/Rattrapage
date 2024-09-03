<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Benevole;
use App\Models\DistributionTour;
use App\Models\HarvestTour;
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
        $candidature = Benevole::where('user_id', $user->id)->with(['service'])->first();

        // Récupérer les tournées de récolte auxquelles le bénévole est assigné avec statut "pending"
        $harvestTours = HarvestTour::whereHas('volunteers', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->where('status', 'pending')->get();

        // Récupérer les tournées de distribution auxquelles le bénévole est assigné avec statut "pending"
        $distributionTours = DistributionTour::whereHas('volunteers', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->where('status', 'pending')->get();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'abonnement' => $user->abonnement,
            'status' => session('status'),
            'candidature' => $candidature ? [
                'date_derniere_candidature' => $candidature->date_derniere_candidature,
                'validation' => $candidature->validation,
                'service' => $candidature->service ? $candidature->service->name : null,
                'refus' => $candidature->refus,
            ] : null,
            'harvestTours' => $harvestTours->map(function ($tour) {
                return [
                    'id' => $tour->id,
                    'date' => $tour->date,
                    'period' => $tour->period,
                ];
            }),
            'distributionTours' => $distributionTours->map(function ($tour) {
                return [
                    'id' => $tour->id,
                    'date' => $tour->date,
                    'period' => $tour->period,
                    'address' => $tour->address,
                ];
            }),
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
