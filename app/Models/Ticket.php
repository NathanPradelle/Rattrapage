<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'objet',
        'status',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class,'user_id');
    }

    public function ticketCategory(): BelongsTo {
        return $this->belongsTo(Ticket_category::class, 'ticket_category_id');
    }

    public function ticketNotes(): HasMany {
        return $this->HasMany(Ticket_note::class);
    }
}
