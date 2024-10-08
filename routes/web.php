<?php

use App\Http\Controllers\BenevoleController;
use App\Http\Controllers\HarvestAssignmentController;
use App\Http\Controllers\HarvestRequestController;
use App\Http\Controllers\HarvestTourController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\StockMovementController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VolunteerScheduleController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\BenevoleMiddleware;
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

Route::get('/contact', [TicketController::class, 'contact'])->name('contact.show');

Route::middleware('auth')->group(function () {
    Route::middleware([AdminMiddleware::class])->prefix('admin')->group(function () {
        Route::get('/', [UserController::class, 'admin'])->name('admin');

        Route::resource('stock-movements', StockMovementController::class)->only(['index', 'create', 'store']);

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

        Route::get('/harvest-requests', [HarvestRequestController::class, 'index'])->name('harvest-requests.index');
        Route::post('/harvest-requests/{id}/refuse', [HarvestRequestController::class, 'refuse'])->name('harvest-requests.refuse');
        Route::get('/harvest-requests/{id}/assign', [HarvestAssignmentController::class, 'assign'])->name('harvest-requests.assign');
        Route::post('/harvest-requests/{id}/assign', [HarvestAssignmentController::class, 'storeAssignment'])->name('harvest-requests.assign.store');
        Route::get('/harvest-requests/{id}/complete', [HarvestRequestController::class, 'complete'])->name('harvest-requests.complete');
        Route::post('/harvest-requests/{id}/complete', [HarvestRequestController::class, 'storeComplete'])->name('harvest-requests.complete.store');
        Route::get('/harvest-tour/create', [HarvestTourController::class, 'create'])->name('harvest.create');
        Route::get('api/harvest-requests/filter', [HarvestRequestController::class, 'filter'])->name('api.harvest-requests.filter');
        Route::get('api/volunteers/filter', [BenevoleController::class, 'filter'])->name('api.volunteers.filter');
        Route::post('/harvest-tour/', [HarvestTourController::class, 'store'])->name('harvest-tours.store');


    });

    Route::middleware('verified')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('/benevolat', function () {
            return Inertia::render('Candidature/Info');
        })->name('benevolat');

        Route::get('/abonnement', function () {
            return Inertia::render('Abonnement/Index');
        })->name('abonnement');

        Route::get('/abonnement/payment', [StripeController::class, 'showPaymentPage'])->name('abonnement.payment.page');
        Route::post('/abonnement/payment/intent', [StripeController::class, 'createPaymentIntent'])->name('abonnement.payment.intent');
        Route::post('/abonnement/payment/handle', [StripeController::class, 'handlePayment'])->name('abonnement.handlePayment');

        Route::resource('candidature', BenevoleController::class);

        Route::get('/harvest-requests/create', [HarvestRequestController::class, 'create'])->name('harvest-requests.create');
        Route::post('/harvest-requests', [HarvestRequestController::class, 'store'])->name('harvest-requests.store');

        Route::get('/ticket/create', [TicketController::class, 'create'])->name('ticket.create');
        Route::post('/ticket', [TicketController::class, 'store'])->name('ticket.store');
        Route::get('/tickets/{Id}', [TicketController::class, 'customerIndex'])->name('tickets.index');
        Route::get('/ticket/{id}', [TicketController::class, 'show'])->name('ticket.show');
        Route::put('/ticket/{id}', [TicketController::class, 'update'])->name('ticket.update');

        Route::middleware([BenevoleMiddleware::class])->prefix('benevole')->group(function () {
            Route::get('/schedule', [VolunteerScheduleController::class, 'index'])->name('benevole.schedule');
            Route::resource('stock', StockController::class);
        });
    });
});

require __DIR__.'/auth.php';
