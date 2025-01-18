<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Lesson;
use App\Models\Progress;

class LessonsController extends Controller
{
    public function index(Request $request) : Response
    {
        $thema_id = $request->query('thema_id');
        $user_id = auth()->user()->id;

        $lessons = Lesson::where('thema_id', $thema_id)->get();
        $progress = Progress::where('student_id', $user_id)
            ->whereIn('lesson_id', $lessons->pluck('id'))
            ->pluck('percentage', 'lesson_id');

        return Inertia::render('Lessons/Index', [
            'lessons' => $lessons,
            'progress' => $progress,
            'thema_id' => $thema_id,
        ]);
    }
}