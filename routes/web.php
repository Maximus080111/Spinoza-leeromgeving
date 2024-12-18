<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentDashboardController;
use App\Http\Controllers\VraagController;
use App\Http\Controllers\ThemaController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\LessonsMakenController;    
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\VraagController1;
use App\Http\Controllers\VraagController2;
use App\Http\Controllers\VraagController3;
use App\Http\Controllers\VraagController4;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
    ]);
});

Route::controller(GoogleController::class)->group(function() {
    Route::get('auth/google', 'googleLogin')->name('auth.google');
    Route::get('auth/google-callback', 'googleAuthentication')->name('auth.google-callback');
});

Route::get('lessons_dashboard', [LessonsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('lessons_dashboard');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Route::get('/LessonsMaken', [LessonsMakenController::class, 'index'])
//     ->middleware(['auth', 'verified'])
//     ->name('LessonsMaken');
Route::get('/Vraag', [VraagController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('Vraag');

Route::get('/Vraag1', [VraagController1::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('Vraag1');

Route::get('/Vraag2', [VraagController2::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('Vraag2');

Route::get('/Vraag3', [VraagController3::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('Vraag3');

Route::get('/Vraag4', [VraagController4::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('Vraag4');

Route::get('/Kahoot', [VraagController::class, 'kahoot'])
    ->middleware(['auth', 'verified'])
    ->name('Kahoot');
Route::get('LessonsMaken', [LessonsMakenController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('LessonsMaken');
Route::post('LessonsMaken', [LessonsMakenController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('LessonsMakenStore');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/Achievements', function () {
    return Inertia::render('Achievements');
})->middleware(['auth', 'verified'])->name('Achievements');

Route::get('/Student_Dashboard', [StudentDashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('Student_Dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('Themas', ThemaController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
