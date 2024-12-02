<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Thema;

class StudentDashboardController extends Controller
{
    public function index()
    {
        $themas = Thema::all();
        // Fetch data or perform any necessary logic
        return Inertia::render('Student_Dashboard', [
            'themas' => $themas,
        ]);
    }
}