<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Progress;
use App\Models\User;

class AchievementController extends Controller
{
    public function index() : Response
    {
        $achievements = Progress::all();
        $students = User::where('is_teacher', false)->get();
        return Inertia::render('Achievements', [
            'achievements' => $achievements,
            'students' => $students,
        ]);
    }
}
