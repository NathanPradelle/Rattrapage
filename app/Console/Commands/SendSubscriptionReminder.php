<?php

namespace App\Console\Commands;

use App\Mail\SubscriptionReminder;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendSubscriptionReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:subscription-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envoie un rappel d\'abonnement aux utilisateurs dont l\'abonnement expire dans moins d\'une semaine';

    public function __construct()
    {
        parent::__construct();
    }
    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Récupérer la date actuelle
        $today = Carbon::now();

        // Initialiser un compteur pour suivre les rappels envoyés
        $remindersSent = 0;

        // Parcourir tous les utilisateurs et afficher leurs dates d'abonnement
        $users = User::all();

        foreach ($users as $user) {
            $this->info('Utilisateur: ' . $user->email . ' | Date d\'abonnement: ' . ($user->abonnement ?? 'Non abonné'));

            // Vérifier si l'utilisateur a une date d'expiration d'abonnement
            if ($user->abonnement) {
                // Convertir la date d'abonnement en objet Carbon
                $expiryDate = Carbon::parse($user->abonnement);

                // Vérifier si l'abonnement expire dans moins d'une semaine
                if ($expiryDate->diffInDays($today) <= 7 && $expiryDate->greaterThanOrEqualTo($today)) {
                    // Envoyer un e-mail de rappel
                    Mail::to($user->email)->send(new SubscriptionReminder($user));

                    $this->info('Rappel d\'abonnement envoyé à : ' . $user->email);
                    $remindersSent++;
                }
            }
        }

        // Afficher un message si aucun utilisateur n'est concerné
        if ($remindersSent === 0) {
            $this->info('Aucun utilisateur n\'a un abonnement expirant dans moins d\'une semaine.');
        } else {
            $this->info('Rappels d\'abonnement envoyés aux utilisateurs concernés.');
        }
    }
}
