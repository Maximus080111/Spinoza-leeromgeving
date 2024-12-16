<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VraagController4 extends Controller
{
    public function index()
    {
        return Inertia::render('Vraag4');
    }

}
