<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Lesson;
use App\Models\Question1;
use App\Models\Question2;

class CreateQuestionsController extends Controller
{
    public function redirectToQuestionMaken (Request $request): Response
    {
        $Les_Type = $request->query('Les_Type');
        $lesson_id = $request->query('lesson_id');

        if (!$Les_Type) {
            return redirect()->back()->with('error', 'Lesson not found.');
        }

        switch ($Les_Type) {
            case 1:
                return $this->createQuestionKahoot($request);
            case 2:
                return $this->createQuestionHussel($request);
            default:
                return redirect()->back()->with('error', 'Invalid lesson type.');
        }
    }

    public function createQuestionKahoot(Request $request): Response
    {
        $lesson_id = $request->query('lesson_id');
        $les_type = $request->query('Les_Type');
        $lessons = Lesson::all();
        // $questions = Question1::where('lesson_id', $lesson_id)->get();
        $questions = Question1::where('lesson_id', $lesson_id)->get();  
        return Inertia::render('CreateQuestions/CreateKahootQuestion', ['questions' => $questions, 'les_type' => $les_type, 'lesson_id' => $lesson_id, 'lessons' => $lessons]);
    }

    public function StoreKahoot(Request $request)
    {;
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answers' => 'required|array|min:2',
            'answers.*' => 'string|max:255',
            'correct' => 'required|string|max:255',
            'lesson_id' => 'required|integer',
        ]);

    
        Question1::create([
            'question' => $validated['question'],
            'answers' => json_encode($validated['answers']),
            'correct' => $validated['correct'],
            'lesson_id' => $validated['lesson_id'],
        ]);

        return redirect()->back()->with('success', 'Vraag succesvol toegevoegd.');
    }

    public function createQuestionHussel(Request $request): Response
    {
        $lesson_id = $request->query('lesson_id');
        $les_type = $request->query('Les_Type');
        $lessons = Lesson::all();
        $questions = Question1::where('lesson_id', $lesson_id)->get();
        return Inertia::render('CreateQuestions/CreateHusselQuestion', ['questions' => $questions, 'les_type' => $les_type, 'lesson_id' => $lesson_id, 'lessons' => $lessons]);
    }

    public function StoreHussel(Request $request)
    {
        $validated = $request->validate([
            'sentence' => 'required|string|max:255',
            'lesson_id' => 'required|integer',
        ]);
    
        Question2::create([
            'sentence' => $validated['sentence'],
            'lesson_id' => $validated['lesson_id'],
        ]);
    
        return redirect()->back()->with('success', 'Vraag succesvol toegevoegd.');
    }
}
