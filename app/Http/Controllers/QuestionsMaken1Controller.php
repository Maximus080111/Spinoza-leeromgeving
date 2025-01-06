<?php

namespace App\Http\Controllers;

use App\Models\Question1;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuestionsMaken1Controller extends Controller
{
    public function index() : Response
    {
        $lessons = Lesson::all();
        return Inertia::render('QuestionsMaken1/Index', [
            'lessons' => $lessons,
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answers' => 'required|array|min:2',
            'answers.*' => 'string|max:255',
            'correct' => 'required|string|max:255',
        ]);
    
        Question1::create([
            'question' => $validated['question'],
            'answers' => json_encode($validated['answers']),
            'correct' => $validated['correct'],
        ]);
    
        return redirect()->route('QuestionsMaken1.index')->with('success', 'Vraag succesvol toegevoegd.');
    } 
}
