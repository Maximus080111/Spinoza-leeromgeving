<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuestionMaken3Controller extends Controller
{
    public function index() : Response
    {
        return Inertia::render('QuestionMaken3/Index');
    }
}
