<?php

namespace App\Http\Controllers;

use App\Models\Question4;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuestionsMaken4Controller extends Controller
{
    public function index() : Response
    {
        $lessons = Lesson::all();
        return Inertia::render('QuestionsMaken4/Index', [
            'lessons' => $lessons,
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'word' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imageName = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'.'.$image->extension(); 
            $image->storeAs('public/images', $imageName); 
        }
    
        Question4::create([
            'word' => $validated['word'],
            'image' => $imageName,
        ]);
    
        return redirect()->route('QuestionsMaken4.index')->with('success', 'Vraag succesvol toegevoegd.');
    } 
}
