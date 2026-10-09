<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ConvertReactToBladeCommand extends Command
{
    protected $signature = 'convert:react-to-blade';
    protected $description = 'Automated two-step mapping converter from React JSX & SCSS into Blade components & Tailwind CSS';

    private array $classMappings = [
        'bgMain' => 'bg-[#0a2553]',
        'bgSec' => 'bg-[#0d1626]',
        'textMain' => 'text-[#0a0f1a]',
        'textSec' => 'text-white',
        'bgBorder' => 'border-[#0095fa]',
        'buttonBg' => 'bg-[#8b0000]',
        'buttonSec' => 'border-[#ff4500]',
        'linkSec' => 'text-[#d7e300]',
        'linkTert' => 'text-[#bfbf30]',
        'hoverSec' => 'hover:text-[#30bfb3]',
    ];

    public function handle()
    {
        $clientComponentsDir = base_path('client/components');
        if (!File::exists($clientComponentsDir)) {
            $this->error("Directory {$clientComponentsDir} not found.");
            return 1;
        }

        $files = File::files($clientComponentsDir);
        foreach ($files as $file) {
            if ($file->getExtension() === 'tsx') {
                $componentName = $file->getFilenameWithoutExtension();
                $this->info("Mapping React component: {$componentName}");
                $this->convertComponent($file->getPathname(), $componentName);
            }
        }

        $this->info("React to Blade mapping complete.");
        return 0;
    }

    private function convertComponent(string $filePath, string $name)
    {
        $content = File::get($filePath);

        // Step 1: Parse JSX and convert React expressions to Blade directives
        $blade = $content;

        // Strip TS imports and exports
        $blade = preg_replace('/import\s+.*?;/s', '', $blade);
        $blade = preg_replace('/export\s+default\s+.*?;/s', '', $blade);

        // Map React props / state JSX tags
        $blade = preg_replace('/className=/i', 'class=', $blade);
        $blade = preg_replace('/\{/\*', '{{--', $blade);
        $blade = preg_replace('/\*\}/', '--}}', $blade);

        // Convert {condition && <JSX>}
        $blade = preg_replace_callback('/\{([a-zA-Z0-9_\$\.\!\s]+)\s*&&\s*\((.*?)\)\}/s', function ($matches) {
            return "@if(" . trim($matches[1]) . ")\n" . trim($matches[2]) . "\n@endif";
        }, $blade);

        // Map CSS variable references to Tailwind classes
        foreach ($this->classMappings as $var => $tailwindClass) {
            $blade = str_replace("var(--{$var})", $tailwindClass, $blade);
        }

        // Output converted template
        $targetBlade = resource_path("views/components/mapped-{$name}.blade.php");
        File::put($targetBlade, $blade);
        $this->info("Created mapped Blade component: mapped-{$name}.blade.php");
    }
}
