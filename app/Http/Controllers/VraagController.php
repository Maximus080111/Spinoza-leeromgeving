<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VraagController extends Controller
{
    public function index()
    {
        return Inertia::render('Vraag');
    }
}
