<?php

namespace App\Http\Controllers;

use App\Models\Question2;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VraagController2 extends Controller
{
    public function index()
    {
        $question2 = Question2::all();
        return Inertia::render('Vraag2', ['question2' => $question2]);
    }

}
