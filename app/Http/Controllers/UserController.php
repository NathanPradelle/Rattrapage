<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Utils\FilePaths;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{

    #region Pages
    
    public function admin(): Response
    {
        return Inertia::render('Dashboard');
    }

    public function customersPage()
    {
        $usersList = $this->getAllCustomerP(0);

        return Inertia::render(FilePaths::CUSTOMERS, [
            'users' => $usersList['users'],
            'pagination' => $usersList['pagination'],
        ]);
    }

    #endregion

    #region Get

    /// <summary>
    /// Get a User name.
    /// </summary>
    public function getName(int $id)
    {
        $user = User::query()
            ->select(['id', 'name'])
            ->where('id', $id)
            ->where('delete', false)
            ->firstOrFail();

        return $user;
    }

    /// <summary>
    /// Get all Users of a role.
    /// </summary>
    public function getAllCustomerP(int $role)
    {
        $users = User::query()
            ->select(['id', 'name', 'email'])
            ->where('role', 0)
            ->where('delete', false)
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
    /// Get all Users name.
    /// </summary>
    public function getAllForChatP()
    {
        $authUserId = auth()->id();
        $users = User::query()
            ->select(['id', 'name'])
            ->whereNot('id', $authUserId)
            ->where('delete', false)
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

    #endregion

    #region Post

    /// <summary>
    /// Remove user.
    /// </summary>
    public function RGPDUser(int $id)
    {
        $user = $this->getName($id);
        
        $user->update([
            'email' => 'RGPD',
            'password' => 'RGPD',
            'deleted' => true,
        ]);

        return response()->json(['success' => 'User removed successfully']);
    }

    #endregion
}
