<?php

namespace App\Http\Controllers;

use App\Models\Question4;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VraagController4 extends Controller
{
    public function index()
    {
        $question4 = Question4::all();
        return Inertia::render('Vraag4', ['question4' => $question4]);
    }
}
