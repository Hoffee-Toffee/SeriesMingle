<?php

namespace App\Livewire;

use App\Models\Project;
use App\Services\ScheduleGeneratorService;
use App\Services\TmdbService;
use Livewire\Component;

class ProjectEditor extends Component
{
    public Project $project;
    public string $title = '';
    public string $description = '';
    public array $layers = [];
    public array $mediaData = [];
    public string $spaceMultiParters = 'normally';
    public ?int $streakDuration = null;
    public ?int $streaksPerSession = null;
    public ?int $sessionDuration = null;
    public bool $showStreaks = true;
    public bool $groupStreaks = false;

    public string $searchQuery = '';
    public array $searchResults = [];
    public ?int $activeTargetLayer = null;

    public function mount(Project $project)
    {
        $this->project = $project;
        $this->title = $project->title ?? '';
        $this->description = $project->description ?? '';
        $this->layers = $project->layers ?? [];
        $this->mediaData = $project->data ?? [];
        $this->spaceMultiParters = $project->space_multi_parters ?? 'normally';
        $this->streakDuration = $project->streak_duration;
        $this->streaksPerSession = $project->streaks_per_session;
        $this->sessionDuration = $project->session_duration;
        $this->showStreaks = $project->show_streaks ?? true;
        $this->groupStreaks = $project->group_streaks ?? false;
    }

    public function updatedSearchQuery()
    {
        if (strlen($this->searchQuery) > 2) {
            $tmdb = app(TmdbService::class);
            $this->searchResults = $tmdb->search($this->searchQuery);
        } else {
            $this->searchResults = [];
        }
    }

    public function addLayer()
    {
        $this->layers[] = [];
        $this->save();
    }

    public function removeLayer(int $index)
    {
        array_splice($this->layers, $index, 1);
        $this->save();
    }

    public function selectMediaForLayer(int $layerIndex, string $type, int $id)
    {
        $tmdb = app(TmdbService::class);
        $details = $tmdb->fetchMedia($type, (string)$id);

        $mediaKey = "{$type}_{$id}";
        $this->mediaData[$mediaKey] = $details;

        if (!isset($this->layers[$layerIndex])) {
            $this->layers[$layerIndex] = [];
        }

        $this->layers[$layerIndex][] = [
            'id' => $mediaKey,
            'type' => $type,
            'tmdb_id' => $id,
            'title' => $details['name'] ?? $details['title'] ?? 'Media Item',
        ];

        $this->searchQuery = '';
        $this->searchResults = [];
        $this->activeTargetLayer = null;

        $this->save();
    }

    public function save()
    {
        $this->project->update([
            'title' => $this->title,
            'description' => $this->description,
            'layers' => $this->layers,
            'data' => $this->mediaData,
            'space_multi_parters' => $this->spaceMultiParters,
            'streak_duration' => $this->streakDuration,
            'streaks_per_session' => $this->streaksPerSession,
            'session_duration' => $this->sessionDuration,
            'show_streaks' => $this->showStreaks,
            'group_streaks' => $this->groupStreaks,
            'last_modified' => time() * 1000,
        ]);
    }

    public function render()
    {
        $generator = app(ScheduleGeneratorService::class);
        $schedule = $generator->generate([
            'layers' => $this->layers,
            'data' => $this->mediaData,
            'space_multi_parters' => $this->spaceMultiParters,
        ]);

        return view('livewire.project-editor', [
            'schedule' => $schedule,
        ])->layout('layouts.app');
    }
}
