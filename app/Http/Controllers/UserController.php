<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Utils\FilePaths;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    #region Pages
    
    public function admin(): Response
    {
        return Inertia::render('Dashboard');
    }

    public function customersPage()
    {
        $usersList = $this->getAllCustomerP(0, new Request());

        return Inertia::render(FilePaths::CUSTOMERS, [
            'users' => $usersList['users'],
            'pagination' => $usersList['pagination'],
        ]);
    }

    public function volunteersPage()
    {
        $usersList = $this->getAllCustomerP(1, new Request());

        return Inertia::render(FilePaths::VOLUNTEERS, [
            'users' => $usersList['users'],
            'pagination' => $usersList['pagination'],
        ]);
    }

    public function adminsPage()
    {
        $usersList = $this->getAllCustomerP(2, new Request());

        return Inertia::render(FilePaths::ADMINS, [
            'users' => $usersList['users'],
            'pagination' => $usersList['pagination'],
        ]);
    }

    public function userPage(int $id)
    {
        $user = $this->getUserDetails($id);

        return Inertia::render(FilePaths::USER, [
            'user' => $user,
        ]);
    }

    public function creationPage(int $id)
    {
        return Inertia::render(FilePaths::USER_CREATION, [
            'profile' => $id,
        ]);
    }

    #endregion

    #region Get

    /// <summary>
    /// Get a User name.
    /// </summary>
    public function getUserDetails(int $id)
    {
        $user = User::with(['benevole'])->findOrFail($id);

        return $user;
    }

    /// <summary>
    /// Get a User name.
    /// </summary>
    public function getName(int $id)
    {
        $user = User::query()
            ->select(['id', 'name'])
            ->where('id', $id)
            ->where('deleted', false)
            ->firstOrFail();
        
        return $user;
    }

    /// <summary>
    /// Get all Users of a role.
    /// </summary>
    public function getAllCustomerP(int $role, Request $request)
    {
        $users = User::query()
            ->select(['id', 'name', 'email'])
            ->where('role', $role)
            ->where('deleted', false);

        if ($request->has('params')) {
            $params = $request->input('params');
            $users->where(function ($query) use ($params) {
                $query->where('name', 'like', "%{$params}%")
                    ->orWhere('email', 'like', "%{$params}%");
            });
        }

        $users = $users->distinct()->paginate(10);

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
            ->where('deleted', false)
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
            'role' => 162,
        ]);

        return response()->json(['success' => 'User removed successfully']);
    }

    /// <summary>
    /// create new Admin.
    /// </summary>
    public function createAdmin(Request $request)
    {
        $request->validate([
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 2,
        ]);

        event(new Registered($user));

        return response()->json(['success' => 'User created successfully']);
    }

    #endregion
}
