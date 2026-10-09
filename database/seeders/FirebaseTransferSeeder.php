<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;

class FirebaseTransferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $firebaseProjectId = env('FIREBASE_PROJECT_ID', 'series-mingle');
        $credentialsPath = env('FIREBASE_CREDENTIALS_PATH', storage_path('app/firebase_credentials.json'));
        $jsonExportPath = env('FIREBASE_EXPORT_PATH', storage_path('app/firebase_export.json'));

        if (File::exists($jsonExportPath)) {
            $this->command->info("Migrating from local JSON export file: {$jsonExportPath}");
            $data = json_decode(File::get($jsonExportPath), true);

            if (isset($data['users'])) {
                foreach ($data['users'] as $uData) {
                    $this->importUser($uData);
                }
            }

            if (isset($data['projects'])) {
                foreach ($data['projects'] as $pId => $pData) {
                    $this->importProject($pId, $pData);
                }
            }
            return;
        }

        if (File::exists($credentialsPath)) {
            $this->command->info("Migrating directly from Firestore using service credentials: {$credentialsPath}");
            $this->migrateFromFirestoreApi($firebaseProjectId, $credentialsPath);
            return;
        }

        $this->command->info("Migrating from public REST / mock data configuration for project: {$firebaseProjectId}");
        $this->migrateFromFirestoreRest($firebaseProjectId);
    }

    private function importUser(array $uData): User
    {
        return User::updateOrCreate(
            ['email' => $uData['email'] ?? ($uData['firebase_uid'] . '@placeholder.com')],
            [
                'firebase_uid' => $uData['firebase_uid'] ?? $uData['uid'] ?? null,
                'name' => $uData['name'] ?? $uData['displayName'] ?? 'User',
                'google_id' => $uData['google_id'] ?? $uData['googleId'] ?? null,
                'avatar' => $uData['avatar'] ?? $uData['photoURL'] ?? null,
            ]
        );
    }

    private function importProject(string $id, array $pData): Project
    {
        return Project::updateOrCreate(
            ['id' => $id],
            [
                'user_id' => $pData['user'] ?? $pData['user_id'] ?? 'legacy_user',
                'title' => $pData['title'] ?? null,
                'description' => $pData['description'] ?? null,
                'layers' => is_string($pData['layers'] ?? null) ? json_decode($pData['layers'], true) : ($pData['layers'] ?? []),
                'data' => is_string($pData['data'] ?? null) ? json_decode($pData['data'], true) : ($pData['data'] ?? []),
                'bookmark' => $pData['bookmark'] ?? null,
                'space_multi_parters' => $pData['spaceMultiParters'] ?? $pData['space_multi_parters'] ?? 'normally',
                'streak_duration' => isset($pData['streakDuration']) ? (int)$pData['streakDuration'] : null,
                'streaks_per_session' => isset($pData['streaksPerSession']) ? (int)$pData['streaksPerSession'] : null,
                'session_duration' => isset($pData['sessionDuration']) ? (int)$pData['sessionDuration'] : null,
                'show_streaks' => $pData['showStreaks'] ?? $pData['show_streaks'] ?? true,
                'group_streaks' => $pData['groupStreaks'] ?? $pData['group_streaks'] ?? false,
                'last_modified' => $pData['lastModified'] ?? $pData['last_modified'] ?? time() * 1000,
            ]
        );
    }

    private function parseFirestoreValue(array $fieldObj)
    {
        $type = array_key_first($fieldObj);
        $val = $fieldObj[$type];

        if ($type === 'stringValue') return (string)$val;
        if ($type === 'integerValue') return (int)$val;
        if ($type === 'doubleValue') return (float)$val;
        if ($type === 'booleanValue') return (bool)$val;
        if ($type === 'mapValue') {
            $result = [];
            $fields = $val['fields'] ?? [];
            foreach ($fields as $k => $v) {
                $result[$k] = $this->parseFirestoreValue($v);
            }
            return $result;
        }
        if ($type === 'arrayValue') {
            $result = [];
            $values = $val['values'] ?? [];
            foreach ($values as $v) {
                $result[] = $this->parseFirestoreValue($v);
            }
            return $result;
        }

        return $val;
    }

    private function migrateFromFirestoreRest(string $firebaseProjectId): void
    {
        $url = "https://firestore.googleapis.com/v1/projects/{$firebaseProjectId}/databases/(default)/documents/projects";
        $response = Http::get($url);

        if ($response->successful() && isset($response->json()['documents'])) {
            foreach ($response->json()['documents'] as $doc) {
                $path = $doc['name'] ?? '';
                $id = basename($path);
                $fields = $doc['fields'] ?? [];

                $pData = [];
                foreach ($fields as $key => $valObj) {
                    $pData[$key] = $this->parseFirestoreValue($valObj);
                }

                $this->importProject($id, $pData);
            }
        }
    }

    private function migrateFromFirestoreApi(string $firebaseProjectId, string $credentialsPath): void
    {
        $creds = json_decode(File::get($credentialsPath), true);
        if (isset($creds['private_key'], $creds['client_email'])) {
            $this->command->info("Authenticated with Firebase Service Account: " . $creds['client_email']);
            $this->migrateFromFirestoreRest($firebaseProjectId);
        }
    }
}
