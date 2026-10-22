<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Project;
use App\Services\TmdbService;

class ProjectEditor extends Component
{
    public Project $project;
    public array $layers = [];
    public string $searchQuery = '';
    public array $searchResults = [];
    public bool $showSearchModal = false;
    public ?int $targetLayerIndex = null;

    public function mount($project)
    {
        $this->project = Project::findOrFail($project);
        $this->layers = $this->project->layers ?? [];
    }

    public function reorderLayers(array $orderedIndices)
    {
        $newLayers = [];
        foreach ($orderedIndices as $index) {
            if (isset($this->layers[$index])) {
                $newLayers[] = $this->layers[$index];
            }
        }
        $this->layers = $newLayers;
        $this->save();
    }

    public function addLayer()
    {
        $this->layers[] = [];
        $this->save();
    }

    public function removeLayer(int $index)
    {
        if (isset($this->layers[$index])) {
            array_splice($this->layers, $index, 1);
            $this->save();
        }
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

    public function selectMediaForLayer(array $media, int $layerIndex)
    {
        if (isset($this->layers[$layerIndex])) {
            $this->layers[$layerIndex][] = [
                'ref' => [$media['media_type'] ?? 'movie', (string) $media['id']],
            ];
            $this->save();
        }
        $this->showSearchModal = false;
        $this->searchQuery = '';
        $this->searchResults = [];
    }

    public function save()
    {
        $this->project->layers = $this->layers;
        $this->project->last_modified = now();
        $this->project->save();
    }

    public function render()
    {
        return view('livewire.project-editor')->layout('layouts.app');
    }
}
