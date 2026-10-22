<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\File;

class FirebaseTransferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exportPath = database_path('seeders/firebase_export.json');

        if (!File::exists($exportPath)) {
            // Seed default mock/transfer records if export file is not present
            $user = User::create([
                'firebase_uid' => '5feNQ3XPKZRnpaMydanS8C1OZcs2',
                'name' => 'Test Firebase User',
                'email' => 'user@example.com',
                'avatar' => 'https://via.placeholder.com/150',
            ]);

            Project::create([
                'id' => 'iasIFGOcdOlRZvYNNB4a', // Preserved Firebase string doc ID
                'user_id' => $user->firebase_uid,
                'title' => 'Breaking Bad & House Mingle',
                'description' => 'A custom schedule mingling Breaking Bad and House episodes.',
                'layers' => [],
                'data' => [],
                'space_multi_parters' => 'normal',
                'streak_duration' => 60,
                'show_streaks' => true,
                'group_streaks' => false,
                'last_modified' => now(),
            ]);

            return;
        }

        $data = json_decode(File::get($exportPath), true);

        if (isset($data['users']) && is_array($data['users'])) {
            foreach ($data['users'] as $u) {
                User::updateOrCreate(
                    ['email' => $u['email']],
                    [
                        'firebase_uid' => $u['uid'] ?? $u['firebase_uid'] ?? null,
                        'name' => $u['name'] ?? $u['displayName'] ?? 'User',
                        'avatar' => $u['avatar'] ?? $u['photoURL'] ?? null,
                    ]
                );
            }
        }

        if (isset($data['projects']) && is_array($data['projects'])) {
            foreach ($data['projects'] as $p) {
                Project::updateOrCreate(
                    ['id' => $p['id']], // Keep original string document ID
                    [
                        'user_id' => $p['user_id'] ?? $p['user'] ?? '',
                        'title' => $p['title'] ?? '',
                        'description' => $p['description'] ?? '',
                        'layers' => $p['layers'] ?? [],
                        'data' => $p['data'] ?? [],
                        'space_multi_parters' => $p['space_multi_parters'] ?? $p['mpSpacing'] ?? 'normal',
                        'streak_duration' => $p['streak_duration'] ?? $p['streak'] ?? null,
                        'streaks_per_session' => $p['streaks_per_session'] ?? null,
                        'session_duration' => $p['session_duration'] ?? null,
                        'show_streaks' => $p['show_streaks'] ?? true,
                        'group_streaks' => $p['group_streaks'] ?? false,
                        'last_modified' => now(),
                    ]
                );
            }
        }
    }
}
