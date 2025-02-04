<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentDashboardController;
use App\Http\Controllers\ThemaController;
use App\Http\Controllers\QuestionsMaken1Controller;
use App\Http\Controllers\QuestionsMaken2Controller;
use Illuminate\Foundation\Application;
use App\Http\Controllers\LessonsMakenController;    
use App\Http\Controllers\CreateQuestionsController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\LessonsController;
use App\Http\Controllers\VragenController;
use App\Http\Controllers\VraagController1;
use App\Http\Controllers\VraagController3;
use App\Http\Controllers\VraagController4;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\AchievementController;
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
    return Inertia::render('Auth/Login');
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

Route::get('/Slepen', [VragenController::class, 'Slepen'])
    ->middleware(['auth', 'verified'])
    ->name('Slepen');

Route::get('/Hussel', [VragenController::class, 'Hussel'])
    ->middleware(['auth', 'verified'])
    ->name('Hussel');

Route::get('/TypHetWoord', [VragenController::class, 'TypHetWoord'])
    ->middleware(['auth', 'verified'])
    ->name('TypeHetWoord');

Route::get('/Kahoot', [VragenController::class, 'Kahoot'])
    ->middleware(['auth', 'verified'])
    ->name('Kahoot');

Route::get('LessonsMaken', [LessonsMakenController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('LessonsMaken');
Route::post('LessonsMaken', [LessonsMakenController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('LessonsMakenStore');

Route::get('CreateQuestions', [CreateQuestionsController::class, 'redirectToQuestionMaken'])
    ->middleware(['auth', 'verified'])
    ->name('CreateQuestions');

Route::post('/store-question-kahoot', [CreateQuestionsController::class, 'StoreKahoot'])
    ->middleware(['auth', 'verified'])
    ->name('storeKahoot');

Route::post('/store-question-hussel', [CreateQuestionsController::class, 'StoreHussel'])
    ->middleware(['auth', 'verified'])
    ->name('storeHussel');

Route::get('redirect-to-vraag', [VragenController::class, 'redirectToVraag'])
    ->middleware(['auth', 'verified'])
    ->name('redirectToVraag');

Route::get('/Achievements', [AchievementController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('Achievements');

// Route::get('/Achievements', function () {
//     return Inertia::render('Achievements');
// })->middleware(['auth', 'verified'])->name('Achievements');

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
    
Route::post('/progress', [ProgressController::class, 'store'])
        ->middleware(['auth', 'verified'])
        ->name('progress.store');

require __DIR__.'/auth.php';
