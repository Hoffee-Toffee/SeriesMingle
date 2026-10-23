<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class ConvertReactToBladeCommand extends Command
{
    protected $signature = 'convert:react-to-blade
        {--source=client : Path to the source directory containing components/ and styles/}
        {--output= : Output directory for generated templates and the migration report}
        {--apply : Apply source-derived pages and styles to the live Laravel app}';

    protected $description = 'Map React content and styles, optionally applying source-derived pages';

    public function handle(): int
    {
        $scriptPath = base_path('scripts/react-to-blade-mapper.mjs');

        if (! is_file($scriptPath)) {
            $this->error("Mapper script not found at {$scriptPath}.");

            return self::FAILURE;
        }

        $outputPath = $this->option('output') ?: storage_path('app/react-to-blade');

        $arguments = [
            'node',
            $scriptPath,
            '--root',
            base_path(),
            '--source',
            (string) $this->option('source'),
            '--output',
            (string) $outputPath,
        ];

        if ($this->option('apply')) {
            $arguments[] = '--apply';
        }

        $process = new Process($arguments, base_path());
        $process->setTimeout(120);
        $process->run();

        if (! $process->isSuccessful()) {
            $this->error(trim($process->getErrorOutput() ?: $process->getOutput()));

            return self::FAILURE;
        }

        $result = json_decode($process->getOutput(), true);

        if (! is_array($result)) {
            $this->error('The mapper completed without returning a valid migration summary.');

            return self::FAILURE;
        }

        $this->info(sprintf(
            'Mapped %d TSX components and extracted %d Tailwind color tokens.',
            $result['componentCount'] ?? 0,
            $result['colorTokenCount'] ?? 0,
        ));
        $this->line(sprintf(
            '%d components and %d SCSS files have items flagged for manual migration.',
            $result['componentsRequiringManualMigration'] ?? 0,
            $result['styleFilesRequiringManualMigration'] ?? 0,
        ));
        $this->line('Generated files and report: '.($result['outputDirectory'] ?? $outputPath));

        if (($result['appliedFileCount'] ?? 0) > 0) {
            $this->info(sprintf(
                'Applied source-mapped home, auth, dashboard and project views/styles (%d generated files).',
                $result['appliedFileCount'],
            ));
        }

        return self::SUCCESS;
    }
}
