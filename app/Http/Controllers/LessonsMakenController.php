<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;   
use Inertia\Response;
use App\Models\Thema;
use App\Models\Lesson;
use Illuminate\Http\RedirectResponse;


class LessonsMakenController extends Controller
{
    public function index() : Response
    {
        $themas = Thema::all();
        return Inertia::render('LessonsMaken/Index', [
            'themas' => $themas,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'les_name' => 'required|string|max:255',
            'les_number' => 'required|integer',
            'thema_id' => 'required|integer',
        ]);

        $lesson = Lesson::create([
            'les_name' => $request->input('les_name'),
            'les_number' => $request->input('les_number'),
            'thema_id' => $request->input('thema_id'),
        ]);

        return redirect(route('LessonsMaken.index'));
    }
}
