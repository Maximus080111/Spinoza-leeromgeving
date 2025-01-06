<?php

namespace App\Http\Controllers;

use App\Models\Question2;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuestionsMaken2Controller extends Controller
{
    public function index() : Response
    {
        $lessons = Lesson::all();
        return Inertia::render('QuestionsMaken2/Index', [
            'lessons' => $lessons,
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'sentence' => 'required|string|max:255',
        ]);
    
        Question2::create([
            'sentence' => $validated['sentence'],
        ]);
    
        return redirect()->route('QuestionsMaken2.index')->with('success', 'Vraag succesvol toegevoegd.');
    } 
}
