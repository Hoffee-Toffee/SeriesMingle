<?php

namespace App\Services;

class ScheduleGeneratorService
{
    /**
     * Re-implement generateSchedule logic from client/functions/generateSchedule.ts
     */
    public function generate(array $projectData): array
    {
        $layers = $projectData['layers'] ?? [];
        $mediaData = $projectData['data'] ?? [];
        $spaceMultiParters = $projectData['space_multi_parters'] ?? 'normally';

        $timeline = [];
        $layerIndices = array_keys($layers);

        foreach ($layers as $layerIndex => $entries) {
            foreach ($entries as $entry) {
                $mediaKey = $entry['id'] ?? '';
                $details = $mediaData[$mediaKey] ?? [];

                $timeline[] = [
                    'layerIndex' => $layerIndex,
                    'entryId' => $entry['id'] ?? '',
                    'title' => $details['name'] ?? $details['title'] ?? ($entry['title'] ?? 'Item'),
                    'type' => $entry['type'] ?? 'tv',
                    'overview' => $details['overview'] ?? '',
                    'episodes' => $details['number_of_episodes'] ?? 1,
                ];
            }
        }

        return [
            'timeline' => $timeline,
            'totalItems' => count($timeline),
            'layerCount' => count($layers),
        ];
    }
}
