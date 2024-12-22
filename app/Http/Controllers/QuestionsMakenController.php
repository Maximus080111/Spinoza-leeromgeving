<?php

namespace App\Http\Controllers;

use App\Models\Question1;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuestionsMakenController extends Controller
{
    public function index() : Response
    {
        $lessons = Lesson::all();
        return Inertia::render('QuestionsMaken/Index', [
            'lessons' => $lessons,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'correct' => 'required|string|max:255',
            'answers' => 'required|string|max:255',
        ]);

        $question1 = Question1::create([
            'question' => $request->input('question'),
            'correct' => $request->input('correct'),
            'answers' => $request->input('answers'),
        ]);

        return redirect(route('QuestionsMaken.index'));
    }
}
