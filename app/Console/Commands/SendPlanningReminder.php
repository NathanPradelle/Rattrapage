<?php

namespace App\Console\Commands;

use App\Mail\PlanningReminder;
use App\Models\HarvestTour;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendPlanning extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:planning-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envoie le planning d\'un bénévole pour le jour suivant';

    public function __construct()
    {
        parent::__construct();
    }
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $date = Carbon::now()->addDays(1);

        $remindersSent = 0;

        $assignments = HarvestTour::with('user')->get();

        foreach ($assignments as $assignment) {

            $assignmentDate = Carbon::parse($assignment->date);
            if ($date->greaterThanOrEqualTo($assignmentDate) && $assignmentDate->diffInDays($date) <= 1) {
                // Envoyer un e-mail de rappel
                Mail::to($assignment->user->email)->send(new PlanningReminder($assignment->user));
                $this->info('Planning envoyé à : ' . $assignment->user);
                $remindersSent++;
            }
        }

        if ($remindersSent === 0) {
            $this->info('Aucun utilisateur n\'a un abonnement expirant dans moins d\'une semaine.');
        } else {
            $this->info('Planning envoyés aux utilisateurs concernés.');
        }
    }
}
