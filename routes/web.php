<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SocialiteController;
use App\Livewire\Dashboard;
use App\Livewire\ProjectEditor;

Route::get('/', function () {
    return view('home');
});

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/auth/google', [SocialiteController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', Dashboard::class);
    Route::get('/projects/{project}', ProjectEditor::class);

    Route::post('/logout', function () {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/');
    })->name('logout');
});

Route::get('/sitemap.xml', function () {
    $content = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $content .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    $content .= '  <url><loc>' . config('app.url') . '/</loc></url>' . "\n";
    $content .= '</urlset>';

    return response($content, 200)->header('Content-Type', 'text/xml');
});
