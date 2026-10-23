<?php

namespace Tests\Feature;

use App\Livewire\Dashboard;
use App\Livewire\ProjectEditor;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Livewire\Livewire;
use Tests\TestCase;

class ProjectAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_from_the_project_editor(): void
    {
        $project = $this->createProject('owner-firebase-uid');

        $this->get(route('project.show', $project))
            ->assertRedirect(route('login'));

        $this->get(route('projects.show', $project))
            ->assertRedirect(route('login'));
    }

    public function test_plural_project_url_redirects_to_the_singular_canonical_url(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'canonical-project-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);

        $this->assertSame('/project/'.$project->id, route('project.show', $project, false));

        $this->actingAs($owner)
            ->get('/projects/'.$project->id.'?bookmark=entry-1')
            ->assertStatus(301)
            ->assertRedirect(route('project.show', $project).'?bookmark=entry-1');

        $this->get('/sitemap.xml')
            ->assertOk()
            ->assertSee(url('/project/'.$project->id))
            ->assertDontSee(url('/projects/'.$project->id));
    }

    public function test_project_owner_can_open_their_project(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'owner-firebase-uid']);
        $project = $this->createProject($owner->firebase_uid);

        $this->actingAs($owner)
            ->get(route('project.show', $project))
            ->assertOk()
            ->assertSee('Private schedule')
            ->assertSee('id="nav-bar"', false)
            ->assertSee('Dashboard</a>', false)
            ->assertSee('react-mapped/assets/icons/icon.png')
            ->assertSee('react-mapped/styles/project.css')
            ->assertDontSee('>Home</a>', false);
    }

    public function test_project_member_can_open_a_shared_project(): void
    {
        $member = User::factory()->create(['firebase_uid' => 'member-firebase-uid']);
        $project = $this->createProject('owner-firebase-uid');

        DB::table('project_members')->insert([
            'project_id' => $project->id,
            'user_id' => $member->firebase_uid,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($member)
            ->get(route('project.show', $project))
            ->assertOk()
            ->assertSee('Private schedule');
    }

    public function test_project_editor_displays_media_from_firebase_stored_layers(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'media-owner-firebase-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [
                0 => [
                    0 => [
                        ['ref' => ['tv', 42]],
                    ],
                ],
            ],
            'data' => [
                'tv' => [
                    42 => ['title' => 'Example Series'],
                ],
            ],
        ]);

        $this->actingAs($owner)
            ->get(route('project.show', $project))
            ->assertOk()
            ->assertSee('Example Series')
            ->assertDontSee('>Item<', false);
    }

    public function test_project_editor_saves_layers_in_firebase_storage_shape(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'storage-owner-firebase-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [
                0 => [
                    0 => [
                        ['ref' => ['tv', 42]],
                    ],
                ],
            ],
            'data' => [
                'tv' => [
                    42 => ['title' => 'Example Series'],
                ],
            ],
        ]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('save');

        $this->assertSame([
            0 => [
                0 => [
                    ['ref' => ['tv', 42]],
                ],
            ],
        ], $project->fresh()->layers);
    }

    public function test_project_editor_saves_layer_titles_and_reindexes_them_when_removing_a_layer(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'layer-title-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [
                0 => [0 => []],
                1 => [1 => []],
            ],
            'titles' => ['Films', 'Shows'],
        ]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->set('titles.1', 'Shows to watch')
            ->call('removeLayer', 0);

        $this->assertSame(['Shows to watch'], $project->fresh()->titles);
        $this->assertSame([0 => [0 => []]], $project->fresh()->layers);
    }

    public function test_project_editor_adds_custom_entries_and_barriers_in_firebase_storage_shape(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'custom-entry-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update(['layers' => [0 => [0 => []]]]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('addCustomEntry', 0)
            ->call('addBarrier', 0);

        $project = $project->fresh();

        $this->assertSame([
            0 => [
                0 => [
                    ['ref' => ['custom', 1]],
                    ['barrier' => 0],
                ],
            ],
        ], $project->layers);
        $this->assertSame('Custom Entry', $project->data['custom'][1]['title']);
        $this->assertSame(5, $project->data['custom'][1]['repeat']);
    }

    public function test_project_editor_updates_custom_entry_settings_with_source_defaults_and_minimums(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'custom-settings-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [0 => [0 => [['ref' => ['custom', 1]]]]],
            'data' => [
                'custom' => [
                    1 => [
                        'id' => 1,
                        'type' => 'custom',
                        'title' => 'Custom Entry',
                        'repeat' => 5,
                        'offset' => 0,
                        'term' => 'Part',
                    ],
                ],
            ],
        ]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('cycleEntrySetting', 0, 0)
            ->assertSet('entrySettings.custom-1', 1)
            ->call('updateCustomSetting', 0, 0, 'repeat', '0')
            ->call('updateCustomSetting', 0, 0, 'offset', '4')
            ->call('updateCustomSetting', 0, 0, 'term', 'Episode')
            ->call('updateCustomSetting', 0, 0, 'runtime', '');

        $customEntry = $project->fresh()->data['custom'][1];

        $this->assertSame(1, $customEntry['repeat']);
        $this->assertSame(4, $customEntry['offset']);
        $this->assertSame('Episode', $customEntry['term']);
        $this->assertSame(30, $customEntry['runtime']);
    }

    public function test_project_editor_can_rename_and_remove_a_media_entry(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'entry-edit-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [0 => [0 => [['ref' => ['tv', 42]]]]],
            'data' => ['tv' => [42 => ['id' => 42, 'type' => 'tv', 'name' => 'Original Series']]],
        ]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('updateEntryTitle', 0, 0, 'My Series')
            ->call('removeEntry', 0, 0);

        $project = $project->fresh();

        $this->assertSame('My Series', $project->data['tv'][42]['userTitle']);
        $this->assertSame([0 => [0 => []]], $project->layers);
    }

    public function test_project_editor_preserves_existing_title_and_description_when_cleared(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'blank-fields-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'title' => 'Existing title',
            'description' => 'Existing description',
        ]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->set('title', '')
            ->call('save')
            ->set('description', '')
            ->call('save');

        $this->assertSame('Existing title', $project->fresh()->title);
        $this->assertSame('Existing description', $project->fresh()->description);
    }

    public function test_project_editor_refreshes_tv_metadata_without_moving_or_duplicating_the_entry(): void
    {
        Http::preventStrayRequests();
        config(['services.tmdb.key' => 'test-key']);
        Http::fake([
            'api.themoviedb.org/3/tv/42/season/1*' => Http::response([
                'season_number' => 1,
                'episodes' => [
                    [
                        'id' => 101,
                        'name' => 'Updated Episode',
                        'runtime' => 40,
                        'episode_number' => 1,
                    ],
                ],
            ]),
            'api.themoviedb.org/3/tv/42*' => Http::response([
                'id' => 42,
                'name' => 'Updated Series',
                'first_air_date' => '2024-01-01',
                'number_of_seasons' => 1,
            ]),
        ]);

        $owner = User::factory()->create(['firebase_uid' => 'refresh-media-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [0 => [0 => [['ref' => ['tv', 42], 'start' => '1:1', 'end' => '1:1']]]],
            'data' => [
                'tv' => [
                    42 => [
                        'id' => 42,
                        'type' => 'tv',
                        'title' => 'Old Series',
                        'userTitle' => 'My Series',
                        'seasons' => [],
                    ],
                ],
            ],
        ]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('refreshMedia', 0, 0);

        $refreshed = $project->fresh();

        $this->assertSame(
            [0 => [0 => [['ref' => ['tv', 42], 'start' => '1:1', 'end' => '1:1']]]],
            $refreshed->layers,
        );
        $this->assertSame('Updated Series', $refreshed->data['tv'][42]['title']);
        $this->assertSame('My Series', $refreshed->data['tv'][42]['userTitle']);
        $this->assertSame('Updated Episode', $refreshed->data['tv'][42]['seasons'][0]['episodes'][0]['title']);
    }

    public function test_project_editor_surfaces_media_refresh_failures_without_changing_existing_data(): void
    {
        Http::preventStrayRequests();
        config(['services.tmdb.key' => 'test-key']);
        Http::fake([
            'api.themoviedb.org/3/tv/42*' => Http::response(['status_message' => 'Unavailable'], 503),
        ]);

        $owner = User::factory()->create(['firebase_uid' => 'refresh-media-failure-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [0 => [0 => [['ref' => ['tv', 42], 'start' => '1:1', 'end' => '1:1']]]],
            'data' => [
                'tv' => [
                    42 => [
                        'id' => 42,
                        'type' => 'tv',
                        'title' => 'Existing Series',
                        'seasons' => [],
                    ],
                ],
            ],
        ]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('refreshMedia', 0, 0)
            ->assertSet('mediaRefreshError', 'Refresh failed.');

        $this->assertSame('Existing Series', $project->fresh()->data['tv'][42]['title']);
    }

    public function test_project_editor_moves_entries_between_and_within_layers(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'move-entry-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [
                0 => [0 => [['ref' => ['tv', 42]], ['barrier' => 25]]],
                1 => [1 => [['ref' => ['movie', 84]], ['ref' => ['custom', 7]]]],
            ],
            'data' => [
                'tv' => [42 => ['id' => 42, 'type' => 'tv', 'name' => 'Example Series']],
                'movie' => [84 => ['id' => 84, 'type' => 'movie', 'title' => 'Example Film']],
                'custom' => [7 => ['id' => 7, 'type' => 'custom', 'title' => 'Custom Entry']],
            ],
        ]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('moveEntry', '0-0', 1, 1)
            ->call('moveEntry', '1-2', 0, 1);

        $this->assertSame([
            0 => [0 => [['barrier' => 25]]],
            1 => [1 => [['ref' => ['custom', 7]], ['ref' => ['movie', 84]], ['ref' => ['tv', 42]]]],
        ], $project->fresh()->layers);
    }

    public function test_project_editor_rejects_invalid_drag_targets_without_changing_layers(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'invalid-move-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update([
            'layers' => [
                0 => [0 => [['ref' => ['tv', 42]]]],
                1 => [1 => [['ref' => ['movie', 84]]]],
            ],
        ]);
        $originalLayers = $project->layers;

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('moveEntry', '0-9', 0, 1)
            ->assertStatus(404);

        $this->assertSame($originalLayers, $project->fresh()->layers);
    }

    public function test_project_editor_adds_searched_media_using_react_storage_shape(): void
    {
        Http::preventStrayRequests();
        config(['services.tmdb.key' => 'test-key']);
        Http::fake([
            'api.themoviedb.org/3/tv/42/season/1*' => Http::response([
                'season_number' => 1,
                'episodes' => [
                    [
                        'id' => 101,
                        'name' => 'Encounter at Farpoint',
                        'runtime' => 90,
                        'episode_number' => 1,
                        'overview' => 'The crew begins its first mission.',
                        'still_path' => '/episode-101.jpg',
                    ],
                    [
                        'id' => 102,
                        'name' => 'The Naked Now',
                        'runtime' => 46,
                        'episode_number' => 2,
                        'overview' => 'A mysterious illness spreads.',
                        'still_path' => '/episode-102.jpg',
                    ],
                ],
            ]),
            'api.themoviedb.org/3/tv/42*' => Http::response([
                'id' => 42,
                'name' => 'Example Series',
                'first_air_date' => '1987-09-28',
                'number_of_seasons' => 1,
            ]),
        ]);

        $owner = User::factory()->create(['firebase_uid' => 'search-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update(['layers' => [0 => [0 => []]]]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('selectMediaForLayer', 0, 'tv', 42)
            ->assertSee('Start:')
            ->assertSee('S1E1: Encounter at Farpoint')
            ->call('cycleEntrySetting', 0, 0)
            ->assertSee('End:')
            ->assertSee('S1E2: The Naked Now')
            ->call('updateTvRange', 0, 0, 'start', '1:2')
            ->call('updateTvRange', 0, 0, 'end', '1:2');

        $project = $project->fresh();

        $this->assertSame([
            0 => [0 => [['ref' => ['tv', 42], 'start' => '1:2', 'end' => '1:2']]],
        ], $project->layers);
        $this->assertSame('Example Series', $project->data['tv'][42]['title']);
        $this->assertSame('1987', $project->data['tv'][42]['year']);
        $this->assertSame(68, $project->data['tv'][42]['episode_run_time']);
        $this->assertSame([
            'season' => 1,
            'episodes' => [
                [
                    'id' => 101,
                    'type' => 'episode',
                    'title' => 'Encounter at Farpoint',
                    'runtime' => 90,
                    'episode' => 1,
                    'overview' => 'The crew begins its first mission.',
                    'imdb_id' => null,
                    'still_path' => '/episode-101.jpg',
                ],
                [
                    'id' => 102,
                    'type' => 'episode',
                    'title' => 'The Naked Now',
                    'runtime' => 46,
                    'episode' => 2,
                    'overview' => 'A mysterious illness spreads.',
                    'imdb_id' => null,
                    'still_path' => '/episode-102.jpg',
                ],
            ],
        ], $project->data['tv'][42]['seasons'][0]);
    }

    public function test_project_editor_adds_searched_movies_with_react_storage_shape(): void
    {
        Http::preventStrayRequests();
        config(['services.tmdb.key' => 'test-key']);
        Http::fake([
            'api.themoviedb.org/3/movie/84*' => Http::response([
                'id' => 84,
                'title' => 'Mapped Film',
                'release_date' => '2023-06-10',
                'runtime' => 119,
                'overview' => 'A source-backed movie description.',
                'external_ids' => ['imdb_id' => 'tt0000084'],
            ]),
        ]);

        $owner = User::factory()->create(['firebase_uid' => 'movie-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update(['layers' => [0 => [0 => []]]]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('selectMediaForLayer', 0, 'movie', 84);

        $movie = $project->fresh()->data['movie'][84];

        $this->assertSame([
            'id' => 84,
            'type' => 'movie',
            'title' => 'Mapped Film',
            'year' => '2023',
            'runtime' => 119,
            'overview' => 'A source-backed movie description.',
            'imdb_id' => 'tt0000084',
        ], $movie);
    }

    public function test_project_editor_searches_and_adds_books_using_react_storage_shape(): void
    {
        Http::preventStrayRequests();
        Http::fake([
            'www.googleapis.com/books/v1/volumes*' => Http::response([
                'items' => [
                    [
                        'id' => 'book_123',
                        'selfLink' => 'https://www.googleapis.com/books/v1/volumes/book_123',
                        'volumeInfo' => [
                            'title' => 'Mapped Book',
                            'authors' => ['Author Example'],
                            'description' => 'A source-backed description.',
                            'publishedDate' => '2024-05-01',
                            'pageCount' => 320,
                            'categories' => ['Medical'],
                            'imageLinks' => ['thumbnail' => 'https://books.example/cover.jpg'],
                        ],
                    ],
                ],
            ]),
        ]);

        $owner = User::factory()->create(['firebase_uid' => 'books-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update(['layers' => [0 => [0 => []]]]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('openAddEntryModal', 0)
            ->call('setSearchTab', 'books')
            ->set('searchQuery', 'Mapped Book')
            ->assertSet('searchResults.0.title', 'Mapped Book')
            ->assertSet('searchResults.0.year', '2024')
            ->call('selectSearchResult', 0, 0);

        $project = $project->fresh();
        $book = $project->data['book']['book_123'];

        $this->assertSame([0 => [0 => [['ref' => ['book', 'book_123']]]]], $project->layers);
        $this->assertSame('book', $book['type']);
        $this->assertSame('Mapped Book', $book['title']);
        $this->assertSame(['Author Example'], $book['authors']);
        $this->assertSame(320, $book['pageCount']);
        $this->assertSame(['Medical'], $book['categories']);
        $this->assertSame(300, $book['density']);
        $this->assertSame('2024', $book['year']);
        $this->assertSame('https://books.example/cover.jpg', $book['thumbnail']);

        Http::assertSent(fn (Request $request): bool => str_starts_with($request->url(), 'https://www.googleapis.com/books/v1/volumes')
            && str_contains($request->url(), 'q=Mapped%20Book')
        );
    }

    public function test_project_editor_reports_search_failures_in_the_search_dialog(): void
    {
        Http::preventStrayRequests();
        config(['services.tmdb.key' => 'test-key']);
        Http::fake([
            'api.themoviedb.org/3/search/multi*' => Http::response(['status_message' => 'Unavailable'], 503),
            'www.googleapis.com/books/v1/volumes*' => Http::response(['error' => 'Unavailable'], 503),
        ]);

        $owner = User::factory()->create(['firebase_uid' => 'search-failure-owner-uid']);
        $project = $this->createProject($owner->firebase_uid);
        $project->update(['layers' => [0 => [0 => []]]]);

        Livewire::actingAs($owner)
            ->test(ProjectEditor::class, ['project' => $project])
            ->call('openAddEntryModal', 0)
            ->set('searchQuery', 'Example Series')
            ->assertSet('searchError', 'Search failed.')
            ->assertSee('Search failed.')
            ->call('setSearchTab', 'books')
            ->assertSet('searchError', 'Search failed.')
            ->assertSee('Search failed.');
    }

    public function test_users_without_project_access_cannot_open_the_project(): void
    {
        $stranger = User::factory()->create(['firebase_uid' => 'stranger-firebase-uid']);
        $project = $this->createProject('owner-firebase-uid');

        $this->actingAs($stranger)
            ->get(route('project.show', $project))
            ->assertNotFound();
    }

    public function test_member_can_leave_only_their_own_shared_project_membership(): void
    {
        $member = User::factory()->create(['firebase_uid' => 'member-firebase-uid']);
        $otherMember = User::factory()->create(['firebase_uid' => 'other-member-firebase-uid']);
        $project = $this->createProject('owner-firebase-uid');

        foreach ([$member, $otherMember] as $projectMember) {
            DB::table('project_members')->insert([
                'project_id' => $project->id,
                'user_id' => $projectMember->firebase_uid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->actingAs($member);

        Livewire::test(Dashboard::class)
            ->call('leaveProject', $project->id);

        $this->assertDatabaseMissing('project_members', [
            'project_id' => $project->id,
            'user_id' => $member->firebase_uid,
        ]);
        $this->assertDatabaseHas('project_members', [
            'project_id' => $project->id,
            'user_id' => $otherMember->firebase_uid,
        ]);
    }

    public function test_dashboard_renders_source_sections_card_actions_and_header(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'dashboard-owner-uid']);
        $ownedProject = $this->createProject($owner->firebase_uid);
        $ownedProject->update(['title' => 'Owned schedule']);
        $sharedProject = $this->createProject('another-owner-uid');
        $sharedProject->update(['title' => 'Shared schedule']);

        DB::table('project_members')->insert([
            'project_id' => $sharedProject->id,
            'user_id' => $owner->firebase_uid,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($owner)
            ->get(route('dashboard'))
            ->assertOk()
            ->assertSee('Your Projects')
            ->assertSee('Shared Projects')
            ->assertSee('Owned schedule')
            ->assertSee('Shared schedule')
            ->assertSee('Delete Project')
            ->assertSee('Leave Project')
            ->assertSee('Project actions')
            ->assertSee('Logout')
            ->assertSee('id="nav-bar"', false)
            ->assertSee('react-mapped/assets/icons/icon.png')
            ->assertDontSee('>Dashboard</a>', false);
    }

    public function test_dashboard_orders_owned_and_shared_projects_by_firebase_last_modified(): void
    {
        $owner = User::factory()->create(['firebase_uid' => 'ordered-dashboard-owner-uid']);
        $olderOwned = $this->createProject($owner->firebase_uid);
        $olderOwned->update(['title' => 'Older owned', 'last_modified' => 100]);
        $newerOwned = $this->createProject($owner->firebase_uid);
        $newerOwned->update(['title' => 'Newer owned', 'last_modified' => 200]);
        $olderShared = $this->createProject('ordered-shared-owner-uid');
        $olderShared->update(['title' => 'Older shared', 'last_modified' => 300]);
        $newerShared = $this->createProject('ordered-shared-owner-uid');
        $newerShared->update(['title' => 'Newer shared', 'last_modified' => 400]);

        foreach ([$olderShared, $newerShared] as $sharedProject) {
            DB::table('project_members')->insert([
                'project_id' => $sharedProject->id,
                'user_id' => $owner->firebase_uid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        Livewire::actingAs($owner)
            ->test(Dashboard::class)
            ->assertSeeInOrder(['Newer owned', 'Older owned'])
            ->assertSeeInOrder(['Newer shared', 'Older shared']);
    }

    private function createProject(string $ownerUid): Project
    {
        return Project::create([
            'user_id' => $ownerUid,
            'title' => 'Private schedule',
            'description' => '',
            'layers' => [],
            'data' => [],
        ]);
    }
}
