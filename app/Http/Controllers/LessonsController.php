<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Lesson;

class LessonsController extends Controller
{
    public function index(Request $request) : Response
    {
        $thema_id = $request->query('thema_id');
        $lessons = Lesson::where('thema_id', $thema_id)->get();
        return Inertia::render('Lessons/Index', [
            'lessons' => $lessons,
        ]);
    }
}
