<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function admin(): Response
    {
        return Inertia::render('Dashboard');
    }
}
