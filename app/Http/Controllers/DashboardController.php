<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $student = User::where('is_teacher', false)->get();
        $teacher = User::where('is_teacher', true)->get();

        return Inertia::render('Dashboard', [
            'student' => $student,
            'teacher' => $teacher,
        ]);
    }
}
