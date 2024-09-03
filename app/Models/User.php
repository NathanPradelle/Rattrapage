<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'deleted',
        'abonnement',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function benevole()
    {
        return $this->hasOne(Benevole::class, 'user_id');
    }

    public function harvestRequests()
    {
        return $this->hasMany(HarvestRequest::class);
    }

    public function banLink(){
        return $this->hasMany(Ban::class , 'user');
    }

    /// <summary>
    /// Fonction to set user to return
    /// </summary>
    /// <return> a formatted user </return>
    public function modelSetter()
    {
        $user = [
            'id' => $this?->id,
            'name' => $this?->name,
            'email' => $this?->email,
            'role' => $this?->role,
            'abonnement' => $this?->abonnement,
            'ban' => $this?->banLink,
        ];

        return array_filter($user, function ($value) {
            return !is_null($value);
        });
    }

    /// <summary>
    /// Fonction to set UserVm to User.
    /// </summary>
    /// <return>User.</return>
    public function modelGetter($vm)
    {
        $userData = [
            'id' => isset($vm?->id) ? $vm->id : null,
            'name' => isset($vm?->name) ? $vm->name : null,
            'email' => isset($vm?->email) ? $vm->email : null,
            'role' => isset($vm?->role) ? $vm->role : null,
            'abonnement' => isset($vm?->abonnement) ? $vm->abonnement : null,
        ];

        $user = new User($userData);

        // if (isset($vm?->profiles)) {
        //     $user->userProfiles = $vm->profiles;
        // }

        return $user;
    }
    public function harvestTours()
    {
        return HarvestTour::where('volunteer_driver_id', $this->id)
            ->orWhereJsonContains('volunteer_assistants_ids', $this->id)
            ->get();
    }

    public function harvestToursVolunteer(): BelongsToMany
    {
        return $this->belongsToMany(HarvestTour::class, 'harvest_tour_volunteer')
            ->withPivot('status') // Inclure la colonne de statut
            ->withTimestamps(); // Inclure les timestamps
    }

    public function distributionTours()
    {
        return $this->belongsToMany(DistributionTour::class, 'distribution_tour_volunteer')
            ->withPivot('status') // Inclure la colonne de statut de la relation
            ->withTimestamps();   // Inclure les timestamps de la relation
    }
}
