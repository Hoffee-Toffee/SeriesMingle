<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Database\Seeders\FirebaseTransferSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;
use Tests\TestCase;

class FirebaseTransferSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_firebase_export_links_projects_to_an_existing_user_by_email(): void
    {
        $user = User::factory()->create([
            'email' => 'existing@example.test',
            'name' => 'Existing User',
            'firebase_uid' => 'temporary-local-uid',
            'google_id' => 'existing-google-account-id',
            'avatar' => 'https://example.test/avatar.png',
        ]);

        $exportPath = storage_path('framework/testing/firebase-transfer.json');
        File::ensureDirectoryExists(dirname($exportPath));
        File::put($exportPath, json_encode([
            'users' => [
                [
                    'email' => 'existing@example.test',
                    'firebase_uid' => 'legacy-firebase-uid',
                    'name' => 'Existing User',
                ],
            ],
            'projects' => [
                'legacy-project-id' => [
                    'user' => 'legacy-firebase-uid',
                    'title' => 'Imported project',
                    'titles' => ['Films'],
                ],
            ],
        ], JSON_THROW_ON_ERROR));

        $originalServerValue = $_SERVER['FIREBASE_EXPORT_PATH'] ?? null;
        $_SERVER['FIREBASE_EXPORT_PATH'] = $exportPath;

        try {
            $this->seed(FirebaseTransferSeeder::class);
        } finally {
            if ($originalServerValue === null) {
                unset($_SERVER['FIREBASE_EXPORT_PATH']);
            } else {
                $_SERVER['FIREBASE_EXPORT_PATH'] = $originalServerValue;
            }

            File::delete($exportPath);
        }

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Existing User',
            'firebase_uid' => 'legacy-firebase-uid',
            'google_id' => 'existing-google-account-id',
            'avatar' => 'https://example.test/avatar.png',
        ]);
        $this->assertDatabaseHas('projects', [
            'id' => 'legacy-project-id',
            'user_id' => 'legacy-firebase-uid',
            'title' => 'Imported project',
        ]);
        $this->assertSame(['Films'], Project::find('legacy-project-id')->titles);
        $this->assertSame('legacy-project-id', $user->fresh()->projects->first()->id);
    }

    public function test_firebase_export_maps_project_permission_levels_to_memberships(): void
    {
        $owner = User::factory()->create(['email' => 'owner@example.test', 'firebase_uid' => 'old-owner-uid']);
        $editor = User::factory()->create(['email' => 'editor@example.test', 'firebase_uid' => 'old-editor-uid']);
        $viewer = User::factory()->create(['email' => 'viewer@example.test', 'firebase_uid' => 'old-viewer-uid']);
        $unshared = User::factory()->create(['email' => 'unshared@example.test', 'firebase_uid' => 'old-unshared-uid']);

        $exportPath = storage_path('framework/testing/firebase-permissions-'.uniqid().'.json');
        File::ensureDirectoryExists(dirname($exportPath));
        File::put($exportPath, json_encode([
            'users' => [
                ['email' => 'owner@example.test', 'firebase_uid' => 'owner-firebase-uid'],
                ['email' => 'editor@example.test', 'firebase_uid' => 'editor-firebase-uid'],
                ['email' => 'viewer@example.test', 'firebase_uid' => 'viewer-firebase-uid'],
                ['email' => 'unshared@example.test', 'firebase_uid' => 'unshared-firebase-uid'],
            ],
            'projects' => [
                'shared-project-id' => [
                    'user' => 'owner-firebase-uid',
                    'permissions' => [
                        'owner-firebase-uid' => 1,
                        'editor-firebase-uid' => 1,
                        'viewer-firebase-uid' => 0,
                        'unshared-firebase-uid' => 2,
                        'missing-user-firebase-uid' => 1,
                    ],
                ],
            ],
        ], JSON_THROW_ON_ERROR));

        $originalServerValue = $_SERVER['FIREBASE_EXPORT_PATH'] ?? null;
        $_SERVER['FIREBASE_EXPORT_PATH'] = $exportPath;

        try {
            $this->seed(FirebaseTransferSeeder::class);
        } finally {
            if ($originalServerValue === null) {
                unset($_SERVER['FIREBASE_EXPORT_PATH']);
            } else {
                $_SERVER['FIREBASE_EXPORT_PATH'] = $originalServerValue;
            }

            File::delete($exportPath);
        }

        $this->assertSame('owner-firebase-uid', $owner->fresh()->firebase_uid);
        $this->assertSame('editor-firebase-uid', $editor->fresh()->firebase_uid);
        $this->assertSame('viewer-firebase-uid', $viewer->fresh()->firebase_uid);
        $this->assertSame('unshared-firebase-uid', $unshared->fresh()->firebase_uid);
        $this->assertSame(
            ['editor-firebase-uid', 'unshared-firebase-uid'],
            Project::findOrFail('shared-project-id')->members()->orderBy('users.firebase_uid')->pluck('users.firebase_uid')->all(),
        );
    }
}
