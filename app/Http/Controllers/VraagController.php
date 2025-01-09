<?php

namespace App\Http\Controllers;

use App\Models\Question1;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VraagController extends Controller
{
    public function index()
    {
        return Inertia::render('Vraag');
    }

    public function kahoot()
    {
        $Kahoot = Question1::all();
        return Inertia::render('Kahoot', ['Question1' => $Kahoot]);
    }
}