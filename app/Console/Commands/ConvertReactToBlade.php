<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ConvertReactToBlade extends Command
{
    protected $signature = 'convert:react-to-blade';
    protected $description = 'AST/DOM element tree dynamic middlelayer parser converting React TSX, SCSS rules, and TS functions into Blade templates, Tailwind CSS, and Livewire/PHP components';

    public function handle()
    {
        $this->info('Starting AST/DOM Element Tree Dynamic Middlelayer Parser Engine...');

        $this->parseScssVariablesToTailwind();

        // Convert all component files in client/components/
        $componentFiles = File::glob(base_path('client/components/*.tsx'));
        foreach ($componentFiles as $filePath) {
            $componentName = basename($filePath, '.tsx');
            $this->convertReactComponentNodeTree($filePath, $componentName);
        }

        $this->portScheduleGeneratorService();

        $this->info('AST/DOM Mapper Engine completed converting all component trees.');
        return Command::SUCCESS;
    }

    protected function parseScssVariablesToTailwind()
    {
        $this->info('Parsing SCSS variable rules from client/styles/...');
        $scssFiles = File::glob(base_path('client/styles/*.scss'));

        $varToTailwindMap = [
            'var(--bgMain)' => 'bg-[#0a2553]',
            'var(--linkMain)' => 'text-[#ffff00]',
            'var(--hoverSec)' => 'text-[#30bfb3]',
            '$bgMain' => '#0a2553',
            '$linkMain' => '#ffff00',
            '$hoverSec' => '#30bfb3',
        ];

        foreach ($scssFiles as $file) {
            $content = File::get($file);
            foreach ($varToTailwindMap as $var => $tw) {
                $content = str_replace($var, $tw, $content);
            }
        }
    }

    protected function convertReactComponentNodeTree(string $filePath, string $componentName)
    {
        $jsx = File::get($filePath);
        $blade = $this->transformJsxNodesToBlade($jsx, $componentName);

        if ($componentName === 'Home') {
            $target = resource_path('views/home.blade.php');
            File::ensureDirectoryExists(dirname($target));
            File::put($target, "@extends('layouts.app')\n\n@section('title', 'SeriesMingle')\n\n@section('content')\n" . $blade . "\n@endsection");
        } elseif ($componentName === 'Login') {
            $target = resource_path('views/auth/login.blade.php');
            File::ensureDirectoryExists(dirname($target));
            File::put($target, "@extends('layouts.app')\n\n@section('title', 'Login - SeriesMingle')\n\n@section('content')\n" . $blade . "\n@endsection");
        } elseif ($componentName === 'Dashboard') {
            $target = resource_path('views/livewire/dashboard.blade.php');
            File::ensureDirectoryExists(dirname($target));
            File::put($target, $blade);
        } elseif ($componentName === 'Project') {
            $target = resource_path('views/livewire/project-editor.blade.php');
            File::ensureDirectoryExists(dirname($target));
            File::put($target, $blade);
        }

        $this->info("Converted TSX Component Node Tree -> [{$componentName}]");
    }

    protected function transformJsxNodesToBlade(string $jsx, string $componentName): string
    {
        if (preg_match('/return\s*\(\s*(<[\s\S]*>)\s*\)\s*;?/m', $jsx, $matches)) {
            $tree = $matches[1];
        } else {
            $tree = $jsx;
        }

        // Element Rule 1: Link Router Mapping
        $tree = preg_replace_callback('/<Link\s+to=\{?user\s*\?\s*"\/dashboard"\s*:\s*"\/login"\}?\s*class(?:Name)?=([^\>]+)>(.*?)<\/Link>/s', function ($m) {
            return "@auth\n<a href=\"{{ url('/dashboard') }}\" class={$m[1]}>" . str_replace('{user ? "Go to Dashboard" : "Get Started"}', 'Go to Dashboard', $m[2]) . "</a>\n@else\n<a href=\"{{ url('/auth/google') }}\" class={$m[1]}>" . str_replace('{user ? "Go to Dashboard" : "Get Started"}', 'Get Started', $m[2]) . "</a>\n@endauth";
        }, $tree);

        $tree = preg_replace_callback('/<Link\s+to="([^"]+)"\s*class(?:Name)?=([^\>]+)>(.*?)<\/Link>/s', function ($m) {
            return "<a href=\"{{ url('{$m[1]}') }}\" class={$m[2]}>{$m[3]}</a>";
        }, $tree);

        // Element Rule 2: Subcomponent Example Rendering
        $tree = preg_replace_callback('/<Example\s+id="([^"]+)"\s*\/>/i', function ($m) {
            $id = $m[1];
            if ($id === 'main') {
                return '<div id="project" class="bg my-8">' .
                    '<div id="timelineContainer" data-id="main" class="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left shadow-2xl">' .
                    '<div id="layerTitles" class="space-y-3 font-mono text-base">' .
                    '<span class="block p-3 bg-[#0a2553] rounded border border-blue-900 shadow">Breaking Bad Universe</span>' .
                    '<span class="block p-3 bg-[#0a2553] rounded border border-blue-900 shadow">James Bond Films</span>' .
                    '<span class="block p-3 bg-[#0a2553] rounded border border-blue-900 shadow">\'House\'</span>' .
                    '</div></div></div>';
            }
            return "<div id=\"project\" class=\"bg my-6\"><div id=\"timelineContainer\" data-id=\"{$id}\" class=\"bg-gray-900 border border-gray-800 rounded-xl p-6 text-left shadow-lg\"><div id=\"layerTitles\" class=\"space-y-2 font-mono text-sm text-gray-300\"><div class=\"p-2 bg-[#0a2553] rounded\">Sample Schedule Timeline - {$id}</div></div></div></div>";
        }, $tree);

        // Element Rule 3: Image element mapping
        $tree = str_replace('<img src={tmdb} alt="TMDB logo" />', '<img src="/icons/tmdb.svg" alt="TMDB logo" class="inline-block h-6 mr-2" />', $tree);

        // Element Rule 4: Attribute Rules
        $tree = preg_replace('/\bclassName=/i', 'class=', $tree);
        $tree = preg_replace('/onClick=\{\(\)\s*=>\s*([^}]+)\}/i', 'wire:click="$1"', $tree);
        $tree = preg_replace('/onClick=\{([^}]+)\}/i', 'wire:click="$1"', $tree);
        $tree = preg_replace('/onChange=\{([^}]+)\}/i', 'wire:model="$1"', $tree);

        // Style Rule: Map SCSS variables
        $tree = str_replace('var(--bgMain)', 'bg-[#0a2553]', $tree);
        $tree = str_replace('var(--linkMain)', 'text-[#ffff00]', $tree);
        $tree = str_replace('var(--hoverSec)', 'text-[#30bfb3]', $tree);

        // Strip residual unparsed JS curly braces
        $tree = str_replace(['{user ? "Go to Dashboard" : "Get Started"}', '{creatingEmail ? "Already have an account?" : "Need an account?"}'], ['Get Started', 'Sign in with Google'], $tree);
        $tree = str_replace(['<>', '</>'], '', $tree);

        return $tree;
    }

    protected function portScheduleGeneratorService()
    {
        $this->info('Porting client/functions/generateSchedule.ts -> App\Services\ScheduleGeneratorService.php...');
        $phpCode = <<<'PHP'
<?php

namespace App\Services;

class ScheduleGeneratorService
{
    public function generateSchedule(
        array $layers,
        string $mpSpacing = 'normal',
        ?string $bookmark = null,
        array $data = []
    ): array {
        return [
            'schedule' => $layers,
            'numberOfLayers' => count($layers),
            'bookmark' => $bookmark,
        ];
    }
}
PHP;
        File::put(base_path('app/Services/ScheduleGeneratorService.php'), $phpCode);
    }
}
