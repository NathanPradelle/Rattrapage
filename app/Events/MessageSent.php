<?php

namespace App\Events;

use App\Models\Chat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(Chat $message)
    {
        $this->message = $message;
        Log::info('MessageSent event created: ', ['message' => $message]);
    }

    public function broadcastOn()
    {
        $channelName = 'chat.' . $this->message->user_first . '.' . $this->message->user_second;
        Log::info('MessageSent event broadcast on channel: ', ['channel' => $channelName]);
        return new Channel($channelName);
    }

    public function broadcastWith()
    {
        return ['message' => $this->message];
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}
