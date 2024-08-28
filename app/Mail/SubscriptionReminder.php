<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SubscriptionReminder extends Mailable
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

    public function build(): SubscriptionReminder
    {
        return $this->subject('Votre abonnement expire bientôt')
            ->view('subscriptionReminder')
            ->with([
                'userName' => $this->user->name,
                'expiryDate' => $this->user->abonnement,
            ]);
    }
}
