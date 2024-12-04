<?php

namespace App\Http\Controllers;

use App\Models\Thema;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ThemaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $themas = Thema::all();

        return Inertia::render('Themas/Index', [
            'themas' => $themas,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $imageName = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'.'.$image->extension(); 
            $image->storeAs('public/images', $imageName); 
        }
 
        Thema::create([
            'name' => $request->input('name'),
            'image' => $imageName
        ]);
 
        return redirect(route('Themas.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Thema $thema)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Thema $thema)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Thema $thema)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thema $thema)
    {
        //
    }
}
