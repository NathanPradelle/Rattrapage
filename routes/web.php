<?php

use App\Http\Controllers\BenevoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware([AdminMiddleware::class])->prefix('admin')->group(function () {
        Route::get('/', [UserController::class, 'admin'])->name('admin');

        Route::prefix('candidatures')->group(function () {
            Route::get('/EnAttente', [BenevoleController::class, 'candidaturesEnAttente'])->name('candidatures.index.enattente');
            Route::get('/EnExamen', [BenevoleController::class, 'candidaturesEnExamen'])->name('candidatures.index.enexamen');
            Route::get('/Refusees', [BenevoleController::class, 'candidaturesRefusees'])->name('candidatures.index.refusees');

            Route::patch('{id}/EnAttente', [BenevoleController::class, 'updateEnAttente'])->name('candidatures.update.enattente');
            Route::patch('{id}/EnExamen', [BenevoleController::class, 'updateEnExamen'])->name('candidatures.update.enexamen');
            Route::patch('{id}/Refusees', [BenevoleController::class, 'updateRefusees'])->name('candidatures.update.refusees');
            Route::patch('{id}/Validees', [BenevoleController::class, 'updateValidees'])->name('candidatures.update.validees');
            Route::get('{id}/Details', [BenevoleController::class, 'show'])->name('candidature.details');
        });

        Route::get('/tours', [TourController::class, 'calendarPage'])->name('page.tours');
        Route::get('/tour/creation', [TourController::class, 'creationPage'])->name('page.tour.creation');
        Route::post('/tour/create', [TourController::class, 'create'])->name('tour.create');

    });

    Route::get('/benevolat', function () {
        return Inertia::render('Candidature/CandidatureInfo');
    })->name('benevolat');

    Route::get('/abonnement', function () {
        return Inertia::render('Abonnement/AbonnementIndex');
    })->name('abonnement');

    Route::get('/abonnement/payment', [StripeController::class, 'showPaymentPage'])->name('abonnement.payment.page');
    Route::post('/abonnement/payment/intent', [StripeController::class, 'createPaymentIntent'])->name('abonnement.payment.intent');
    Route::post('/abonnement/payment/handle', [StripeController::class, 'handlePayment'])->name('abonnement.handlePayment');


    Route::resource('candidature', BenevoleController::class);


});

require __DIR__.'/auth.php';
