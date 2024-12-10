<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;   
use Inertia\Response;
use App\Models\Thema;


class LessonsMakenController extends Controller
{
    public function index() : Response
    {
        $themas = Thema::all();
        return Inertia::render('LessonsMaken/Index', [
            'themas' => $themas,
        ]);
    }
}
