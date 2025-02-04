<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Progress;

class ProgressController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'percentage' => 'required|integer',
            'student_id' => 'required|exists:users,id',
            'lesson_id' => 'required|exists:lesson,id',
        ]);

        $existingProgress = Progress::where('student_id', $validated['student_id'])
            ->where('lesson_id', $validated['lesson_id'])
            ->first();

        if ($existingProgress) {
            if ($validated['percentage'] > $existingProgress->percentage) {
                $existingProgress->update(['percentage' => $validated['percentage']]);
            }
        } else {
            Progress::create([
                'percentage' => $validated['percentage'],
                'student_id' => $validated['student_id'],
                'lesson_id' => $validated['lesson_id'],
            ]);
        }

        return back()->with('success', 'Progress opgeslagen');
    }
}