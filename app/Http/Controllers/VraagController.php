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
        // Je kunt dezelfde gegevens gebruiken of verschillende gegevens ophalen
        $Kahoot = Question1::all();
        return Inertia::render('Kahoot', ['Question1' => $Kahoot]);
    }
}

