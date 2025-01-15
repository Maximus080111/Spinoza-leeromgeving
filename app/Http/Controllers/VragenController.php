<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Question1;
use App\Models\Question2;
use Illuminate\Http\RedirectResponse;

class VragenController extends Controller
{
    public function redirectToVraag(Request $request) : RedirectResponse
    {
        $Les_Type = $request->query('Les_Type');
        $thema_id = $request->query('thema_id');
        $lesson_id = $request->query('lesson_id');
            

        if (!$Les_Type) {
            return redirect()->back()->with('error', 'Lesson not found.');
        }

        switch ($Les_Type) {
            case 1:
                return redirect()->route('Kahoot', ['Les_Type' => $Les_Type, 'thema_id' => $thema_id,  'lesson_id' => $lesson_id]);
            case 2:
                return redirect()->route('Hussel', ['Les_Type' => $Les_Type, 'thema_id' => $thema_id,  'lesson_id' => $lesson_id]);
            case 3:
                return redirect()->route('Vraag3');
            default:
                return redirect()->back()->with('error', 'Invalid lesson type.');
        }
    }

    public function Kahoot(Request $request) : Response
    {
        $lesson_id = $request->query('lesson_id');
        $questions = Question1::where('lesson_id', $lesson_id)->get();     
        return Inertia::render('VragenTypen/Kahoot', ['Question1' => $questions]);
    }

    public function Hussel(Request $request) : Response
    {
        $lesson_id = $request->query('lesson_id');
        $questions = Question2::where('lesson_id', $lesson_id)->get();
        return Inertia::render('VragenTypen/Hussel', ['question2' => $questions]);
    }
}