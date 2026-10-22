<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Project;
use Illuminate\Support\Str;

class Dashboard extends Component
{
    public function createProject()
    {
        $user = auth()->user();

        $project = Project::create([
            'id' => Str::random(20),
            'user_id' => $user->firebase_uid ?? (string)$user->id,
            'title' => 'New Schedule',
            'description' => 'Custom schedule timeline',
            'layers' => [],
            'data' => [],
            'space_multi_parters' => 'normal',
            'show_streaks' => true,
            'group_streaks' => false,
            'last_modified' => now(),
        ]);

        return redirect()->to('/projects/' . $project->id);
    }

    public function cloneProject($id)
    {
        $original = Project::findOrFail($id);
        $user = auth()->user();

        $clone = Project::create([
            'id' => Str::random(20),
            'user_id' => $user->firebase_uid ?? (string)$user->id,
            'title' => 'Clone of ' . ($original->title ?: 'Untitled'),
            'description' => $original->description,
            'layers' => $original->layers,
            'data' => $original->data,
            'space_multi_parters' => $original->space_multi_parters,
            'streak_duration' => $original->streak_duration,
            'streaks_per_session' => $original->streaks_per_session,
            'session_duration' => $original->session_duration,
            'show_streaks' => $original->show_streaks,
            'group_streaks' => $original->group_streaks,
            'last_modified' => now(),
        ]);

        return redirect()->to('/projects/' . $clone->id);
    }

    public function deleteProject($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
    }

    public function render()
    {
        $user = auth()->user();
        $userId = $user->firebase_uid ?? (string)$user->id;

        $ownedProjects = Project::where('user_id', $userId)->get();

        return view('livewire.dashboard', [
            'ownedProjects' => $ownedProjects,
        ])->layout('layouts.app');
    }
}
