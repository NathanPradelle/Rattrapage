<?php

namespace App\Mail;

use App\Exports\ToursExport;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Maatwebsite\Excel\Facades\Excel;

class PlanningReminder extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    public function build(): PlanningReminder
    {
        $export = new ToursExport();
        $date = Carbon::now()->addDays(1);;

        return $this->subject('Vos prochaines missions')
            ->view('planingReminder')
            ->with([
                'userName' => $this->user->name,
                'tommorow' => $date,
            ])
            ->attachData(
                Excel::raw($export, \Maatwebsite\Excel\Excel::XLSX),
                'planning-$date.xlsx',
                ['mime' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
            );;
    }
}
