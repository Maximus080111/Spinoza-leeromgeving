<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Question3;

class VraagController1 extends Controller
{
    public function index()
    {
        $words = Question3::pluck('word');
        $questions = Question3::all()->map(function ($question, $index) {
            return [
                'id' => $index + 1,
                'correctwoord' => $question->word,
                'image1' => '/storage/images/' . $question->image,
            ];
        });
        return Inertia::render('Vraag1', [
            'questions' => $questions,
            'words' => $words,
        ]);
    }

}
