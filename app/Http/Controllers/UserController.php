<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function admin(): Response
    {
        return Inertia::render('Dashboard');
    }

    #region Get

    /// <summary>
    /// Get all Users name.
    /// </summary>
    public function getAllForChat()
    {
        $authUserId = auth()->id();
        $users = User::query()
            ->select(['id', 'name'])
            ->whereNot('id', $authUserId)
            ->distinct()
            ->paginate(10);

        $pagination = [
            'current_page' => $users->currentPage(),
            'first_page_url' => $users->url(1),
            'from' => $users->firstItem(),
            'last_page' => $users->lastPage(),
            'last_page_url' => $users->url($users->lastPage()),
            'links' => $users->linkCollection(),
            'next_page_url' => $users->nextPageUrl(),
            'path' => $users->path(),
            'per_page' => $users->perPage(),
            'prev_page_url' => $users->previousPageUrl(),
            'to' => $users->lastItem(),
            'total' => $users->total(),
        ];

        $formattedUsers = $users->map(function ($user) {
            return $user->modelSetter();
        });

        return [
            'users' => $formattedUsers,
            'pagination' => $pagination
        ];
    }

        /// <summary>
    /// Get a User name.
    /// </summary>
    public function getName(int $id)
    {
        $user = User::query()
            ->select(['id', 'name'])
            ->where('id', $id)
            ->firstOrFail();

        return $user->modelSetter();
    }

    #endregion
}
