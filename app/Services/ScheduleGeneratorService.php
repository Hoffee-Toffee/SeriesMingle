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