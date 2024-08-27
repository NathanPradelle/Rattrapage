<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\Auth;

class StripeController extends Controller
{
    public function showPaymentPage()
    {
        return Inertia::render('Abonnement/Payment', [
            'stripeKey' => env('STRIPE_KEY'),
        ]);
    }

    public function createPaymentIntent(Request $request)
    {

        $user = Auth::user();

        // Vérifier si l'utilisateur est déjà abonné
        if ($user->abonnement) {
            return response()->json(['error' => 'Vous êtes déjà abonné en tant que Particulier+.'], 400);
        }

        // Set the Stripe API key
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Create a PaymentIntent with the amount and currency
        $intent = PaymentIntent::create([
            'amount' => 599, // Amount in cents (e.g., 5.99 EUR)
            'currency' => 'eur',
            'metadata' => [
                'user_id' => Auth::id(),
            ],
        ]);

        // Return the clientSecret as JSON
        return response()->json(['clientSecret' => $intent->client_secret]);
    }

    public function handlePayment(Request $request)
    {
        $user = Auth::user();
        $user->abonnement = 1;
        $user->save();

        return redirect()->route('profile.edit')->with('success', 'Payment successful! You are now a Particulier+ member.');
    }
}
