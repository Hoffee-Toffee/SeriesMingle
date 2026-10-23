<?php

use App\Livewire\Dashboard;
use App\Livewire\ProjectEditor;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/sitemap.xml', function () {
    $projects = Project::select('id', 'updated_at')->get();

    $content = '<?xml version="1.0" encoding="UTF-8"?>';
    $content .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    $content .= '<url><loc>'.url('/').'</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>';
    $content .= '<url><loc>'.url('/login').'</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>';

    foreach ($projects as $p) {
        $content .= '<url>';
        $content .= '<loc>'.url('/project/'.$p->id).'</loc>';
        $content .= '<lastmod>'.$p->updated_at->toAtomString().'</lastmod>';
        $content .= '<changefreq>weekly</changefreq>';
        $content .= '<priority>0.8</priority>';
        $content .= '</url>';
    }

    $content .= '</urlset>';

    return response($content, 200)->header('Content-Type', 'text/xml');
});

Route::get('/__dev/auth', function () {
    abort_unless(config('app.env') === 'local', 404);

    $email = config('app.local_auth_email');

    abort_unless(is_string($email) && filter_var($email, FILTER_VALIDATE_EMAIL), 404);

    $user = User::query()->where('email', $email)->firstOrFail();

    Auth::login($user);
    request()->session()->regenerate();

    return redirect()->route('dashboard');
})->middleware('guest')->name('dev.auth');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', Dashboard::class)->name('dashboard');
    Route::get('/project/{project}', ProjectEditor::class)->name('project.show');
    Route::get('/projects/{project}', function (Project $project) {
        $parameters = ['project' => $project->id] + request()->query();

        return redirect()->route('project.show', $parameters, 301);
    })->name('projects.show');
});

require __DIR__.'/auth.php';
