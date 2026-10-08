<?php

use App\Http\Controllers\Auth\SocialiteController;
use App\Livewire\Dashboard;
use App\Livewire\ProjectEditor;
use App\Models\Project;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/sitemap.xml', function () {
    $projects = Project::select('id', 'updated_at')->get();

    $content = '<?xml version="1.0" encoding="UTF-8"?>';
    $content .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    $content .= '<url><loc>' . url('/') . '</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>';
    $content .= '<url><loc>' . url('/login') . '</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>';

    foreach ($projects as $p) {
        $content .= '<url>';
        $content .= '<loc>' . url('/projects/' . $p->id) . '</loc>';
        $content .= '<lastmod>' . $p->updated_at->toAtomString() . '</lastmod>';
        $content .= '<changefreq>weekly</changefreq>';
        $content .= '<priority>0.8</priority>';
        $content .= '</url>';
    }

    $content .= '</urlset>';

    return response($content, 200)->header('Content-Type', 'text/xml');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return view('auth.login');
    })->name('login');

    Route::get('/auth/google', [SocialiteController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', Dashboard::class)->name('dashboard');
    Route::get('/projects/{project}', ProjectEditor::class)->name('projects.show');
});

require __DIR__.'/auth.php';
