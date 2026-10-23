<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FirebaseTransferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $firebaseProjectId = env('FIREBASE_PROJECT_ID', 'series-mingle');
        $jsonExportPath = env('FIREBASE_EXPORT_PATH', storage_path('app/firebase_export.json'));

        if (File::exists($jsonExportPath)) {
            $this->command->info("Migrating from local JSON export file: {$jsonExportPath}");
            $data = json_decode(File::get($jsonExportPath), true, flags: JSON_THROW_ON_ERROR);

            if (isset($data['users']) && is_array($data['users'])) {
                foreach ($data['users'] as $uData) {
                    $this->importUser($uData);
                }
            }

            $projectCount = 0;
            if (isset($data['projects']) && is_array($data['projects'])) {
                foreach ($data['projects'] as $pId => $pData) {
                    $this->importProject($pId, $pData);
                    $projectCount++;
                }
            }

            $this->command->info("Imported {$projectCount} Firebase projects from the local export.");

            return;
        }

        $this->command->info("Checking public Firestore project data: {$firebaseProjectId}");
        $userCount = $this->migrateFirestoreUsers($firebaseProjectId);
        $projectCount = $this->migrateFirestoreProjects($firebaseProjectId);

        if ($projectCount === null) {
            $this->command->warn(
                'Firebase project data could not be read. Export users and projects to storage/app/firebase_export.json to import private data and link it to your signed-in account.'
            );
        } elseif ($projectCount === 0) {
            $this->command->info('No public Firebase projects were found.');
        } else {
            $this->command->info("Imported {$projectCount} public Firebase projects.");
        }

        if ($userCount === null || $userCount === 0) {
            $this->command->warn(
                'No public Firebase user records were imported. Provide users in storage/app/firebase_export.json to associate legacy projects with signed-in accounts.'
            );
        } else {
            $this->command->info("Imported {$userCount} public Firebase users.");
        }
    }

    private function importUser(array $uData): User
    {
        $email = $uData['email'] ?? (($uData['firebase_uid'] ?? $uData['uid'] ?? null).'@placeholder.com');
        $user = User::firstOrNew(['email' => $email]);
        $user->firebase_uid = $uData['firebase_uid'] ?? $uData['uid'] ?? null;

        if (array_key_exists('name', $uData) || array_key_exists('displayName', $uData)) {
            $user->name = $uData['name'] ?? $uData['displayName'];
        } elseif (! $user->exists) {
            $user->name = 'User';
        }

        if (array_key_exists('google_id', $uData) || array_key_exists('googleId', $uData)) {
            $user->google_id = $uData['google_id'] ?? $uData['googleId'];
        }

        if (array_key_exists('avatar', $uData) || array_key_exists('photoURL', $uData)) {
            $user->avatar = $uData['avatar'] ?? $uData['photoURL'];
        }

        $user->save();

        return $user;
    }

    private function importProject(string $id, array $pData): Project
    {
        $project = Project::firstOrCreate(
            ['id' => $id],
            [
                'user_id' => $pData['user'] ?? $pData['user_id'] ?? 'legacy_user',
                'title' => $pData['title'] ?? null,
                'description' => $pData['description'] ?? null,
                'layers' => is_string($pData['layers'] ?? null) ? json_decode($pData['layers'], true) : ($pData['layers'] ?? []),
                'titles' => is_string($pData['titles'] ?? null) ? json_decode($pData['titles'], true) : ($pData['titles'] ?? []),
                'data' => is_string($pData['data'] ?? null) ? json_decode($pData['data'], true) : ($pData['data'] ?? []),
                'bookmark' => $pData['bookmark'] ?? null,
                'space_multi_parters' => $pData['spaceMultiParters'] ?? $pData['space_multi_parters'] ?? 'normally',
                'streak_duration' => isset($pData['streakDuration']) ? (int) $pData['streakDuration'] : null,
                'streaks_per_session' => isset($pData['streaksPerSession']) ? (int) $pData['streaksPerSession'] : null,
                'session_duration' => isset($pData['sessionDuration']) ? (int) $pData['sessionDuration'] : null,
                'show_streaks' => $pData['showStreaks'] ?? $pData['show_streaks'] ?? true,
                'group_streaks' => $pData['groupStreaks'] ?? $pData['group_streaks'] ?? false,
                'last_modified' => $pData['lastModified'] ?? $pData['last_modified'] ?? time() * 1000,
            ]
        );

        if (! array_key_exists('permissions', $pData) || ! is_array($pData['permissions'])) {
            return $project;
        }

        $permittedUserIds = collect($pData['permissions'])
            ->filter(fn ($level, $userId): bool => (
                (is_numeric($level) || is_bool($level))
                && (float) $level >= 1
                && (string) $userId !== $project->user_id
            ))
            ->keys()
            ->map(fn ($userId): string => (string) $userId)
            ->all();
        $knownUserIds = User::query()
            ->whereIn('firebase_uid', $permittedUserIds)
            ->pluck('firebase_uid')
            ->all();

        $project->members()->sync($knownUserIds);

        return $project;
    }

    private function migrateFirestoreUsers(string $firebaseProjectId): ?int
    {
        $documents = $this->fetchFirestoreDocuments($firebaseProjectId, 'users');
        if ($documents === null) {
            return null;
        }

        $userCount = 0;
        foreach ($documents as $document) {
            $uid = basename($document['name'] ?? '');
            $userData = [];
            foreach ($document['fields'] ?? [] as $key => $value) {
                $userData[$key] = $this->decodeFirestoreValue($value);
            }

            if (blank($userData['email'] ?? null)) {
                continue;
            }

            $userData['firebase_uid'] ??= $userData['uid'] ?? $uid;
            $this->importUser($userData);
            $userCount++;
        }

        return $userCount;
    }

    private function migrateFirestoreProjects(string $firebaseProjectId): ?int
    {
        $documents = $this->fetchFirestoreDocuments($firebaseProjectId, 'projects');
        if ($documents === null) {
            return null;
        }

        $projectCount = 0;
        foreach ($documents as $document) {
            $id = basename($document['name'] ?? '');
            if ($id === '') {
                continue;
            }

            $projectData = [];
            foreach ($document['fields'] ?? [] as $key => $value) {
                $projectData[$key] = $this->decodeFirestoreValue($value);
            }

            $this->importProject($id, $projectData);
            $projectCount++;
        }

        return $projectCount;
    }

    private function fetchFirestoreDocuments(string $firebaseProjectId, string $collection): ?array
    {
        $url = "https://firestore.googleapis.com/v1/projects/{$firebaseProjectId}/databases/(default)/documents/{$collection}";
        $documents = [];
        $pageToken = null;

        do {
            $query = ['pageSize' => 100];
            if ($pageToken !== null) {
                $query['pageToken'] = $pageToken;
            }

            try {
                $response = Http::timeout(15)->get($url, $query);
            } catch (ConnectionException $exception) {
                Log::warning('Firebase collection import request failed.', [
                    'collection' => $collection,
                    'message' => $exception->getMessage(),
                ]);

                return null;
            }

            if (! $response->successful()) {
                Log::warning('Firebase collection import was denied or failed.', [
                    'collection' => $collection,
                    'status' => $response->status(),
                    'project_id' => $firebaseProjectId,
                ]);

                return null;
            }

            $documents = [...$documents, ...$response->json('documents', [])];
            $pageToken = $response->json('nextPageToken');
        } while (is_string($pageToken) && $pageToken !== '');

        return $documents;
    }

    private function decodeFirestoreValue(array $value): mixed
    {
        $type = array_key_first($value);
        $data = $type === null ? null : $value[$type];

        return match ($type) {
            'integerValue' => (int) $data,
            'doubleValue' => (float) $data,
            'booleanValue' => (bool) $data,
            'nullValue' => null,
            'arrayValue' => array_map(
                fn (array $item): mixed => $this->decodeFirestoreValue($item),
                $data['values'] ?? []
            ),
            'mapValue' => array_map(
                fn (array $item): mixed => $this->decodeFirestoreValue($item),
                $data['fields'] ?? []
            ),
            default => $data,
        };
    }
}
