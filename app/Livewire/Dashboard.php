<?php

namespace App\Livewire;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Livewire\Component;

class Dashboard extends Component
{
    public function createProject()
    {
        $user = Auth::user();

        $project = Project::create([
            'user_id' => $user->firebase_uid ?? (string) $user->id,
            'title' => 'Untitled Schedule',
            'description' => '',
            'layers' => [],
            'data' => [],
            'last_modified' => time() * 1000,
        ]);

        return redirect()->route('project.show', $project->id);
    }

    public function cloneProject(string $id)
    {
        $project = Project::findOrFail($id);
        $user = Auth::user();
        $userUid = $user->firebase_uid ?? (string) $user->id;
        $ownsProject = $project->user_id === $userUid;
        $isMember = $project->members()
            ->where('users.firebase_uid', $userUid)
            ->exists();

        abort_unless($ownsProject || $isMember, 404);

        $cloned = Project::create([
            'user_id' => $userUid,
            'title' => "Clone of '".($project->title ?: 'Untitled Schedule')."'",
            'description' => $project->description,
            'layers' => $project->layers,
            'data' => $project->data,
            'space_multi_parters' => $project->space_multi_parters,
            'streak_duration' => $project->streak_duration,
            'streaks_per_session' => $project->streaks_per_session,
            'session_duration' => $project->session_duration,
            'show_streaks' => $project->show_streaks,
            'group_streaks' => $project->group_streaks,
            'last_modified' => time() * 1000,
        ]);

        return redirect()->route('project.show', $cloned->id);
    }

    public function deleteProject(string $id)
    {
        $user = Auth::user();
        $userUid = $user->firebase_uid ?? (string) $user->id;

        $project = Project::where('id', $id)->where('user_id', $userUid)->first();
        if ($project) {
            $project->delete();
        }
    }

    public function leaveProject(string $id): void
    {
        $user = Auth::user();
        $userUid = $user->firebase_uid ?? (string) $user->id;

        DB::table('project_members')
            ->where('project_id', $id)
            ->where('user_id', $userUid)
            ->delete();
    }

    public function render()
    {
        $user = Auth::user();
        $userUid = $user->firebase_uid ?? (string) $user->id;

        $ownedProjects = Project::where('user_id', $userUid)
            ->orderByDesc('last_modified')
            ->orderByDesc('updated_at')
            ->get();

        $joinedProjectIds = DB::table('project_members')
            ->where('user_id', $userUid)
            ->pluck('project_id');

        $joinedProjects = Project::whereIn('id', $joinedProjectIds)
            ->orderByDesc('last_modified')
            ->orderByDesc('updated_at')
            ->get();

        return view('livewire.dashboard', [
            'ownedProjects' => $ownedProjects,
            'joinedProjects' => $joinedProjects,
        ])->layout('layouts.app', ['page' => 'dashboard']);
    }
}
