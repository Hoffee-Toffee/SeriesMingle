<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;
use Tests\TestCase;

class ConvertReactToBladeCommandTest extends TestCase
{
    public function test_static_content_and_color_tokens_are_mapped_from_source(): void
    {
        $outputPath = storage_path('framework/testing/react-to-blade-'.Str::uuid());

        try {
            $this->artisan('convert:react-to-blade', [
                '--source' => base_path('tests/Fixtures/ReactToBlade/client'),
                '--output' => $outputPath,
            ])->assertSuccessful();

            $this->assertSame(
                "@verbatim\n<main class=\"page\"><a href=\"/about\" class=\"link\">About</a><input disabled aria-hidden=\"false\" data-value=\"true\" /><span class=\"bg-[#0a2553]\">Original text</span><p>&#64;endverbatim {{ example }}</p></main>\n@endverbatim\n",
                File::get($outputPath.'/templates/static-example.blade.php'),
            );
            $this->assertSame(
                ['bgMain' => '#0a2553'],
                json_decode(File::get($outputPath.'/tailwind-colors.json'), true),
            );
            $this->assertSame(
                "@theme {\n  --color-bg-main: #0a2553;\n}\n",
                File::get($outputPath.'/tailwind-colors.css'),
            );

            $compiledStyles = File::get($outputPath.'/styles/app.css');
            $this->assertStringContainsString(
                ":root {\n  --bgMain: #0a2553;\n  --font-size: 1rem;\n}",
                $compiledStyles,
            );
            $this->assertStringContainsString(
                ".example {\n  color: var(--bgMain);\n}",
                $compiledStyles,
            );

            $report = json_decode(File::get($outputPath.'/report.json'), true);
            $this->assertSame(5, $report['mapperVersion']);
            $this->assertSame('tailwind-colors.css', $report['tailwindThemeCss']);
            $staticComponent = collect($report['components'])
                ->firstWhere('name', 'StaticExample');
            $this->assertSame('mapped', $staticComponent['status']);
            $this->assertSame(
                ['source' => 'styles/app.scss', 'line' => 2, 'value' => '#0a2553'],
                $report['colorTokenSources']['bgMain'][0],
            );
            $this->assertSame(
                "@verbatim\n<section class=\"arrow\">Arrow component</section>\n@endverbatim\n",
                File::get($outputPath.'/templates/arrow-example.blade.php'),
            );
            $this->assertSame('compiled_reference', $report['styles'][0]['status']);
            $this->assertSame('styles/app.css', $report['styles'][0]['compiled']);
            $this->assertSame('functions/generateSchedule.ts', $report['deferred'][0]['source']);
        } finally {
            File::deleteDirectory($outputPath);
        }
    }

    public function test_unsupported_react_behavior_is_reported_without_being_emitted(): void
    {
        $outputPath = storage_path('framework/testing/react-to-blade-'.Str::uuid());

        try {
            $this->artisan('convert:react-to-blade', [
                '--source' => base_path('tests/Fixtures/ReactToBlade/client'),
                '--output' => $outputPath,
            ])->assertSuccessful();

            $template = File::get($outputPath.'/templates/interactive-example.blade.php');
            $report = json_decode(File::get($outputPath.'/report.json'), true);
            $interactiveComponent = collect($report['components'])
                ->firstWhere('name', 'InteractiveExample');
            $issueTypes = collect($interactiveComponent['issues'])
                ->pluck('type')
                ->all();

            $this->assertSame("@verbatim\n<button></button>\n@endverbatim\n", $template);
            $this->assertContains('event_handler', $issueTypes);
            $this->assertContains('dynamic_expression', $issueTypes);
            $this->assertSame('partial', $interactiveComponent['status']);
        } finally {
            File::deleteDirectory($outputPath);
        }
    }

    public function test_missing_component_source_returns_a_failure(): void
    {
        $outputPath = storage_path('framework/testing/react-to-blade-'.Str::uuid());

        $this->artisan('convert:react-to-blade', [
            '--source' => 'tests/Fixtures/ReactToBlade/missing',
            '--output' => $outputPath,
        ])
            ->expectsOutputToContain('Components directory not found')
            ->assertFailed();

        $this->assertDirectoryDoesNotExist($outputPath);
    }

    public function test_apply_maps_the_source_homepage_and_installs_its_styles_and_assets(): void
    {
        $projectRoot = storage_path('framework/testing/react-to-blade-apply-'.Str::uuid());

        File::makeDirectory($projectRoot, 0755, true);
        File::copyDirectory(base_path('client'), $projectRoot.'/client');
        File::copyDirectory(base_path('icons'), $projectRoot.'/icons');
        File::copy(base_path('index.html'), $projectRoot.'/index.html');
        File::makeDirectory($projectRoot.'/resources/views/livewire', 0755, true);
        File::makeDirectory($projectRoot.'/resources/views/layouts', 0755, true);
        File::put($projectRoot.'/resources/views/home.blade.php', 'Original live view');
        File::copy(
            base_path('resources/views/livewire/project-editor.blade.php'),
            $projectRoot.'/resources/views/livewire/project-editor.blade.php',
        );
        File::copy(
            base_path('resources/views/layouts/app.blade.php'),
            $projectRoot.'/resources/views/layouts/app.blade.php',
        );

        try {
            $process = new Process([
                'node',
                base_path('scripts/react-to-blade-mapper.mjs'),
                '--root',
                $projectRoot,
                '--source',
                'client',
                '--output',
                'storage/app/react-to-blade',
                '--apply',
            ], base_path());
            $process->run();

            $this->assertTrue($process->isSuccessful(), $process->getErrorOutput());

            $view = File::get($projectRoot.'/resources/views/home.blade.php');
            $report = json_decode(File::get($projectRoot.'/storage/app/react-to-blade/report.json'), true);
            $summary = json_decode($process->getOutput(), true);

            $this->assertStringContainsString('<header id="nav-bar">', $view);
            $this->assertStringContainsString('<main>', $view);
            $this->assertStringContainsString('Create your own TV and movie schedules.', $view);
            $this->assertStringContainsString('@auth', $view);
            $this->assertStringContainsString("route('login')", $view);
            $this->assertStringContainsString(
                'href="{{ auth()->check() ? route(\'dashboard\') : route(\'login\') }}"',
                $view,
            );
            $this->assertStringContainsString("{{ auth()->check() ? 'Go to Dashboard' : 'Get Started' }}", $view);
            $this->assertStringContainsString('Breaking Bad Universe', $view);
            $this->assertStringContainsString('</i>', $view);
            $this->assertStringNotContainsString('@authGo', $view);
            $this->assertStringNotContainsString('Original live view', $view);
            $this->assertStringNotContainsString('@vite', $view);

            $this->assertFileExists($projectRoot.'/public/react-mapped/styles/app.css');
            $this->assertFileExists($projectRoot.'/public/react-mapped/styles/theme.css');
            $this->assertFileExists($projectRoot.'/public/react-mapped/styles/home.css');
            $this->assertFileExists($projectRoot.'/public/react-mapped/styles/dash.css');
            $this->assertFileExists($projectRoot.'/public/react-mapped/styles/project.css');
            $this->assertFileExists($projectRoot.'/public/react-mapped/styles/SearchModal.css');
            $this->assertFileExists($projectRoot.'/public/react-mapped/styles/login.css');
            $this->assertFileExists($projectRoot.'/resources/views/livewire/dashboard.blade.php');
            $this->assertFileExists($projectRoot.'/resources/views/livewire/project-editor.blade.php');
            $this->assertFileExists($projectRoot.'/resources/views/auth/login.blade.php');
            $this->assertFileExists($projectRoot.'/resources/views/auth/register.blade.php');
            $dashboard = File::get($projectRoot.'/resources/views/livewire/dashboard.blade.php');
            $projectView = File::get($projectRoot.'/resources/views/livewire/project-editor.blade.php');
            $loginView = File::get($projectRoot.'/resources/views/auth/login.blade.php');
            $registerView = File::get($projectRoot.'/resources/views/auth/register.blade.php');
            $dashboardNavigation = File::get($projectRoot.'/resources/views/components/react-mapped/nav-dashboard.blade.php');
            $projectNavigation = File::get($projectRoot.'/resources/views/components/react-mapped/nav-project.blade.php');
            $layout = File::get($projectRoot.'/resources/views/layouts/app.blade.php');
            $dashboardStyles = File::get($projectRoot.'/public/react-mapped/styles/dash.css');
            $projectStyles = File::get($projectRoot.'/public/react-mapped/styles/project.css');
            $this->assertStringContainsString('Your Projects', $dashboard);
            $this->assertStringContainsString('Shared Projects', $dashboard);
            $this->assertStringContainsString('No Projects', $dashboard);
            $this->assertStringContainsString('No Shared Projects', $dashboard);
            $this->assertStringContainsString('@forelse($ownedProjects as $project)', $dashboard);
            $this->assertStringContainsString('@forelse($joinedProjects as $project)', $dashboard);
            $this->assertStringContainsString('wire:click="leaveProject', $dashboard);
            $this->assertStringContainsString('<div class="dashboard-project-menu"><button type="button" aria-label="Project actions">', $dashboard);
            $this->assertStringContainsString('aria-label="Project actions"', $dashboard);
            $this->assertStringContainsString("route('project.show'", $dashboard);
            $this->assertStringNotContainsString("route('projects.show'", $dashboard);
            $this->assertStringContainsString('id="project"', $projectView);
            $this->assertStringContainsString("asset('react-mapped/styles/project.css')", $projectView);
            $this->assertStringContainsString("asset('react-mapped/styles/SearchModal.css')", $projectView);
            $this->assertStringContainsString('class="setTitle showTitle"', $projectView);
            $this->assertStringContainsString('class="setDescription"', $projectView);
            $this->assertStringContainsString('class="layer-title"', $projectView);
            $this->assertStringContainsString('wire:click="addCustomEntry(', $projectView);
            $this->assertStringContainsString('wire:click="addBarrier(', $projectView);
            $this->assertStringContainsString('wire:click="removeEntry(', $projectView);
            $this->assertStringContainsString('updateEntryTitle(', $projectView);
            $this->assertStringContainsString('wire:click="cycleEntrySetting(', $projectView);
            $this->assertStringContainsString('updateCustomSetting(', $projectView);
            $this->assertStringContainsString('class="search-modal"', $projectView);
            $this->assertStringContainsString('class="search-input"', $projectView);
            $this->assertStringContainsString('wire:keydown.enter="searchNow"', $projectView);
            $this->assertStringContainsString('TV / Movies', $projectView);
            $this->assertStringContainsString('Books', $projectView);
            $this->assertStringContainsString('Other', $projectView);
            $this->assertStringContainsString('Insert a barrier to split your schedule into sections.', $projectView);
            $this->assertStringContainsString('Create a custom entry for activities, events, or anything else.', $projectView);
            $this->assertStringContainsString('wire:click="selectSearchResult(', $projectView);
            $this->assertStringContainsString('wire:loading.class="search-result-loading"', $projectView);
            $this->assertStringContainsString('wire:change="updateTvRange(', $projectView);
            $this->assertStringContainsString('wire:sort="moveEntry($item, $position, $id)"', $projectView);
            $this->assertStringContainsString('wire:sort:group="project-entries"', $projectView);
            $this->assertStringContainsString('wire:sort:handle', $projectView);
            $this->assertStringContainsString('fallbackTolerance: 10', $projectView);
            $this->assertStringContainsString('class="refetch-icon fa-solid fa-rotate"', $projectView);
            $this->assertStringContainsString('wire:click="refreshMedia(', $projectView);
            $this->assertStringContainsString('wire:keydown.enter="refreshMedia(', $projectView);
            $this->assertStringContainsString('class="error" role="alert"', $projectView);
            $this->assertStringContainsString('{{ $mediaRefreshError }}', $projectView);
            $this->assertStringContainsString('{{ $searchError }}', $projectView);
            $this->assertStringNotContainsString('Search TMDb for show or movie', $projectView);
            $this->assertStringContainsString('data_get($mediaData, implode', $projectView);
            $this->assertStringContainsString('class="add-entry-btn"', $projectView);
            $this->assertStringNotContainsString('Save Schedule', $projectView);
            $this->assertStringNotContainsString('Back to Dashboard', $projectView);
            $this->assertStringNotContainsString('Drag or configure layers', $projectView);
            $this->assertStringNotContainsString('Schedule Timeline View', $projectView);
            $this->assertStringNotContainsString('<x-schedule-viewer', $projectView);
            $this->assertStringContainsString('id="nav-bar"', $dashboardNavigation);
            $this->assertStringContainsString('id="nav-bar"', $projectNavigation);
            $this->assertStringNotContainsString('route(\'dashboard\')', $dashboardNavigation);
            $this->assertStringContainsString('route(\'dashboard\')', $projectNavigation);
            $this->assertStringContainsString('nav-dashboard', $dashboard);
            $this->assertStringContainsString('nav-project', $projectView);
            $this->assertStringContainsString('#app #dashboard > header', File::get($projectRoot.'/public/react-mapped/styles/app.css'));
            $this->assertStringContainsString('box-sizing: content-box;', File::get($projectRoot.'/public/react-mapped/styles/app.css'));
            $this->assertStringNotContainsString('>Home</a>', $layout);
            $this->assertStringNotContainsString('<main>{{ $slot }}</main>', $layout);
            $this->assertStringNotContainsString('pt-16', $layout);
            $this->assertStringContainsString('#dashboard > main h1 {', $dashboardStyles);
            $this->assertStringContainsString('font-size: 2em;', $dashboardStyles);
            $this->assertStringContainsString('resize: none;', $projectStyles);
            $this->assertStringContainsString('#project .error {', $projectStyles);
            $this->assertStringContainsString('.search-modal {', File::get($projectRoot.'/public/react-mapped/styles/SearchModal.css'));
            $this->assertStringContainsString('.dashboard-project-card > a {', $dashboardStyles);
            $this->assertStringContainsString('.projects-list::before {', $dashboardStyles);
            $this->assertStringContainsString('.projects-list > h2::after {'."\n".'  content: none;', $dashboardStyles);
            $this->assertStringContainsString('.dashboard-project-menu:hover .dashboard-project-menu-items', $dashboardStyles);
            $this->assertStringContainsString("route('login')", $loginView);
            $this->assertStringContainsString("route('register')", $loginView);
            $this->assertStringContainsString("route('auth.google')", $loginView);
            $this->assertStringContainsString('name="password_confirmation"', $registerView);
            $this->assertStringContainsString("route('register')", $registerView);
            $this->assertStringContainsString('styles/login.css', $loginView);
            $this->assertSame(
                File::get(base_path('icons/icon.png')),
                File::get($projectRoot.'/public/react-mapped/assets/icons/icon.png'),
            );
            $this->assertSame(
                File::get(base_path('icons/tmdb.svg')),
                File::get($projectRoot.'/public/react-mapped/assets/icons/tmdb.svg'),
            );
            $this->assertSame('resources/views/home.blade.php', $report['applied']['view']);
            $this->assertSame(
                ['app' => 'applied', 'home' => 'applied'],
                collect($report['styles'])
                    ->filter(fn (array $style): bool => in_array($style['source'], ['styles/app.scss', 'styles/home.scss'], true))
                    ->mapWithKeys(fn (array $style): array => [pathinfo($style['source'], PATHINFO_FILENAME) => $style['status']])
                    ->all(),
            );
            $this->assertContains(
                'public/react-mapped/styles/home.css',
                $report['applied']['styles'],
            );
            $this->assertSame('themes/classic.json', $report['applied']['themeSource']);
            $this->assertCount(2, $report['applied']['navigation']['views']);
            $this->assertCount(2, $report['applied']['auth']['views']);
            $this->assertSame('resources/views/livewire/dashboard.blade.php', $report['applied']['dashboard']['view']);
            $this->assertSame('resources/views/livewire/project-editor.blade.php', $report['applied']['projectPage']['view']);
            $this->assertSame('functions/generateSchedule.ts', $report['deferred'][0]['source']);
            $this->assertSame(
                $summary['appliedFileCount'],
                1
                + count($report['applied']['styles'])
                + count($report['applied']['assets'])
                + count($report['applied']['navigation']['views'])
                + 1
                + 1
                + count($report['applied']['dashboard']['styles'])
                + 1
                + count($report['applied']['projectPage']['styles'])
                + count($report['applied']['auth']['views'])
                + count($report['applied']['auth']['styles']),
            );
        } finally {
            File::deleteDirectory($projectRoot);
        }
    }
}
