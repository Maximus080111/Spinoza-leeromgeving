<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Models\Question3;

class QuestionMaken3Controller extends Controller
{
    public function index() : Response
    {
        $questions = Question3::all();
        return Inertia::render('QuestionMaken3/Index', [
            'questions' => $questions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'questions' => 'required|array|min:10|max:10',
            'questions.*.word' => 'required|string|max:255',
            'questions.*.image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        foreach ($validated['questions'] as $question) {
            $imageName = null;
            if (isset($question['image'])) {
                $image = $question['image'];
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/images', $imageName);
            }

            Question3::create([
                'word' => $question['word'],
                'image' => $imageName,
            ]);
        }

        return redirect()->route('QuestionMaken3.index')->with('success', 'Vragen succesvol toegevoegd.');
    }
}