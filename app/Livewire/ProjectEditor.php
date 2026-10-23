<?php

namespace App\Livewire;

use App\Models\Project;
use App\Services\GoogleBooksService;
use App\Services\TmdbService;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class ProjectEditor extends Component
{
    public Project $project;

    public string $title = '';

    public string $description = '';

    public array $layers = [];

    public array $titles = [];

    public array $mediaData = [];

    public string $spaceMultiParters = 'normally';

    public ?int $streakDuration = null;

    public ?int $streaksPerSession = null;

    public ?int $sessionDuration = null;

    public bool $showStreaks = true;

    public bool $groupStreaks = false;

    public string $searchQuery = '';

    public string $searchTab = 'tv-movies';

    public array $searchResults = [];

    public ?string $searchError = null;

    public ?string $mediaRefreshError = null;

    public ?int $activeTargetLayer = null;

    public array $entrySettings = [];

    public function mount(Project $project)
    {
        $this->project = $project;
        $this->authorizeProjectAccess();
        $this->title = $project->title ?: 'Untitled Schedule';
        $this->description = $project->description ?: 'No Description';
        $this->layers = $this->mapStoredLayers($project->layers ?? []) ?: [[]];
        $this->titles = $project->titles ?? [];
        $this->mediaData = $project->data ?? [];
        $this->spaceMultiParters = $project->space_multi_parters ?? 'normally';
        $this->streakDuration = $project->streak_duration;
        $this->streaksPerSession = $project->streaks_per_session;
        $this->sessionDuration = $project->session_duration;
        $this->showStreaks = $project->show_streaks ?? true;
        $this->groupStreaks = $project->group_streaks ?? false;
    }

    public function updatedSearchQuery(): void
    {
        $this->authorizeProjectAccess();

        $this->searchForCurrentTab();
    }

    public function openAddEntryModal(int $layerIndex): void
    {
        $this->authorizeProjectAccess();
        abort_unless(is_array($this->layers[$layerIndex] ?? null), 404);

        $this->activeTargetLayer = $layerIndex;
        $this->searchQuery = '';
        $this->searchTab = 'tv-movies';
        $this->searchResults = [];
        $this->searchError = null;
    }

    public function closeAddEntryModal(): void
    {
        $this->authorizeProjectAccess();
        $this->activeTargetLayer = null;
        $this->searchQuery = '';
        $this->searchTab = 'tv-movies';
        $this->searchResults = [];
        $this->searchError = null;
    }

    public function setSearchTab(string $tab): void
    {
        $this->authorizeProjectAccess();
        abort_unless(in_array($tab, ['tv-movies', 'books', 'other'], true), 404);

        $this->searchTab = $tab;
        $this->searchError = null;
        $this->searchResults = [];

        if ($tab !== 'other' && mb_strlen($this->searchQuery) >= 3) {
            $this->searchForCurrentTab();
        }
    }

    public function searchNow(): void
    {
        $this->authorizeProjectAccess();

        if ($this->searchResults !== [] && $this->searchError === null) {
            return;
        }

        $this->searchForCurrentTab();
    }

    private function searchForCurrentTab(): void
    {
        $this->searchError = null;
        $this->searchResults = [];
        abort_unless(in_array($this->searchTab, ['tv-movies', 'books', 'other'], true), 404);

        if ($this->searchTab === 'other' || mb_strlen($this->searchQuery) < 3) {
            return;
        }

        try {
            if ($this->searchTab === 'books') {
                $this->searchResults = app(GoogleBooksService::class)->search($this->searchQuery);

                foreach ($this->searchResults as &$book) {
                    $book['image'] = $book['thumbnail'] ?: 'https://via.placeholder.com/80';
                }
                unset($book);

                return;
            }

            $this->searchResults = collect(app(TmdbService::class)->search($this->searchQuery))
                ->filter(fn (array $result) => in_array($result['media_type'] ?? null, ['tv', 'movie'], true))
                ->map(function (array $result): array {
                    $result['title'] = $result['title'] ?? $result['name'] ?? '';
                    $result['image'] = isset($result['poster_path'])
                        ? 'https://image.tmdb.org/t/p/w200'.$result['poster_path']
                        : 'https://placehold.co/200x300?text=No+Image+Available';

                    return $result;
                })
                ->values()
                ->all();
        } catch (ConnectionException|RequestException $exception) {
            report($exception);
            $this->searchError = 'Search failed.';
        }
    }

    public function addLayer()
    {
        $this->authorizeProjectAccess();
        $this->layers[] = [];
        $this->titles[] = null;
        $this->save();
    }

    public function removeLayer(int $index)
    {
        $this->authorizeProjectAccess();
        abort_unless(array_key_exists($index, $this->layers), 404);

        array_splice($this->layers, $index, 1);
        array_splice($this->titles, $index, 1);
        $this->save();
    }

    public function removeEntry(int $layerIndex, int $entryIndex): void
    {
        $this->authorizeProjectAccess();
        abort_unless(
            is_array($this->layers[$layerIndex] ?? null)
                && array_key_exists($entryIndex, $this->layers[$layerIndex]),
            404,
        );

        array_splice($this->layers[$layerIndex], $entryIndex, 1);
        $this->save();
    }

    public function moveEntry(string $entryKey, int $position, int $targetLayer): void
    {
        $this->authorizeProjectAccess();

        if (! preg_match('/^(0|[1-9]\d*)-(0|[1-9]\d*)$/D', $entryKey, $matches)) {
            abort(404);
        }

        $sourceLayer = (int) $matches[1];
        $sourceIndex = (int) $matches[2];

        abort_unless(
            is_array($this->layers[$sourceLayer] ?? null)
                && array_key_exists($sourceIndex, $this->layers[$sourceLayer])
                && is_array($this->layers[$targetLayer] ?? null)
                && ($sourceLayer === $targetLayer || $this->layers[$targetLayer] !== [])
                && $position >= 0
                && $position <= ($sourceLayer === $targetLayer
                    ? count($this->layers[$targetLayer]) - 1
                    : count($this->layers[$targetLayer])),
            404,
        );

        $entry = $this->layers[$sourceLayer][$sourceIndex];
        array_splice($this->layers[$sourceLayer], $sourceIndex, 1);
        array_splice($this->layers[$targetLayer], $position, 0, [$entry]);

        $this->save();
    }

    public function addCustomEntry(int $layerIndex): void
    {
        $this->authorizeProjectAccess();
        abort_unless(is_array($this->layers[$layerIndex] ?? null), 404);

        $customEntries = $this->mediaData['custom'] ?? [];
        abort_unless(is_array($customEntries), 422, 'Custom media data is invalid.');

        $customId = collect(array_keys($customEntries))
            ->filter(fn ($id) => is_numeric($id))
            ->map(fn ($id) => (int) $id)
            ->max() + 1;

        $this->mediaData['custom'][$customId] = [
            'id' => $customId,
            'type' => 'custom',
            'title' => 'Custom Entry',
            'repeat' => 5,
            'offset' => 0,
            'term' => 'Part',
        ];
        $this->layers[$layerIndex][] = ['ref' => ['custom', $customId]];

        $this->closeAddEntryModal();
        $this->save();
    }

    public function addBarrier(int $layerIndex): void
    {
        $this->authorizeProjectAccess();
        abort_unless(is_array($this->layers[$layerIndex] ?? null), 404);

        $this->layers[$layerIndex][] = ['barrier' => 0];
        $this->closeAddEntryModal();
        $this->save();
    }

    public function cycleEntrySetting(int $layerIndex, int $entryIndex): void
    {
        $this->authorizeProjectAccess();
        $entry = $this->layers[$layerIndex][$entryIndex] ?? null;
        abort_unless(is_array($entry) && isset($entry['ref'][0], $entry['ref'][1]), 404);
        $type = $entry['ref'][0];
        abort_unless(in_array($type, ['custom', 'tv'], true), 404);

        $key = $type.'-'.$entry['ref'][1];
        $settingCount = $type === 'custom' ? 4 : 2;
        $this->entrySettings[$key] = (($this->entrySettings[$key] ?? 0) + 1) % $settingCount;
    }

    public function updateTvRange(int $layerIndex, int $entryIndex, string $endpoint, string $value): void
    {
        $this->authorizeProjectAccess();
        abort_unless(in_array($endpoint, ['start', 'end'], true), 404);

        $entry = $this->layers[$layerIndex][$entryIndex] ?? null;
        abort_unless(
            is_array($entry)
                && is_array($entry['ref'] ?? null)
                && ($entry['ref'][0] ?? null) === 'tv'
                && isset($entry['ref'][1]),
            404,
        );
        abort_unless(preg_match('/^(\d+):(\d+)$/', $value, $matches) === 1, 422, 'Select a valid episode.');

        $show = $this->mediaData['tv'][$entry['ref'][1]] ?? null;
        abort_unless(is_array($show) && is_array($show['seasons'] ?? null), 404);

        $seasonNumber = (int) $matches[1];
        $episodeNumber = (int) $matches[2];
        $episodeExists = collect($show['seasons'])->contains(
            fn (array $season) => (int) ($season['season'] ?? 0) === $seasonNumber
                && collect($season['episodes'] ?? [])->contains(
                    fn (array $episode) => (int) ($episode['episode'] ?? 0) === $episodeNumber,
                ),
        );
        abort_unless($episodeExists, 422, 'Select an episode from this show.');

        $this->layers[$layerIndex][$entryIndex][$endpoint] = $value;
        $this->save();
    }

    public function updateCustomSetting(int $layerIndex, int $entryIndex, string $setting, string $value): void
    {
        $this->authorizeProjectAccess();
        $entry = $this->layers[$layerIndex][$entryIndex] ?? null;
        abort_unless(is_array($entry) && isset($entry['ref'][0], $entry['ref'][1]), 404);
        abort_unless($entry['ref'][0] === 'custom', 404);

        $customId = $entry['ref'][1];
        abort_unless(is_array($this->mediaData['custom'][$customId] ?? null), 404);

        if ($setting === 'term') {
            $this->mediaData['custom'][$customId]['term'] = trim($value)
                ?: ($this->mediaData['custom'][$customId]['term'] ?? 'Part');
        } else {
            abort_unless(in_array($setting, ['repeat', 'offset', 'runtime'], true), 404);
            $defaults = ['repeat' => 1, 'offset' => 0, 'runtime' => 30];
            $value = $value === '' ? (string) $defaults[$setting] : $value;
            abort_unless(filter_var($value, FILTER_VALIDATE_INT) !== false, 422, 'Enter a whole number.');

            $minimum = $setting === 'offset' ? 0 : 1;
            $this->mediaData['custom'][$customId][$setting] = max(
                (int) $value,
                $minimum,
            );
        }

        $this->save();
    }

    public function updateEntryTitle(int $layerIndex, int $entryIndex, string $title): void
    {
        $this->authorizeProjectAccess();
        abort_unless(is_array($this->layers[$layerIndex] ?? null), 404);

        $entry = $this->layers[$layerIndex][$entryIndex] ?? null;
        abort_unless(is_array($entry) && isset($entry['ref']) && is_array($entry['ref']), 404);
        abort_unless(count($entry['ref']) === 2, 404);

        [$type, $id] = $entry['ref'];
        abort_unless(
            is_string($type)
                && in_array($type, ['tv', 'movie', 'book', 'custom'], true)
                && (is_int($id) || is_string($id)),
            404,
        );

        abort_unless(is_array($this->mediaData[$type] ?? null), 404);
        abort_unless(is_array($this->mediaData[$type][$id] ?? null), 404);

        if ($type === 'custom') {
            $this->mediaData[$type][$id]['title'] = trim($title) ?: 'Custom Set';
        } else {
            $this->mediaData[$type][$id]['userTitle'] = trim($title) ?: null;
        }

        $this->save();
    }

    public function refreshMedia(int $layerIndex, int $entryIndex): void
    {
        $this->authorizeProjectAccess();

        $entry = $this->layers[$layerIndex][$entryIndex] ?? null;
        abort_unless(
            is_array($entry)
                && is_array($entry['ref'] ?? null)
                && count($entry['ref']) === 2
                && in_array($entry['ref'][0], ['tv', 'movie'], true),
            404,
        );

        [$type, $id] = $entry['ref'];
        $mediaId = filter_var($id, FILTER_VALIDATE_INT);
        abort_unless($mediaId !== false && $mediaId > 0, 404);
        abort_unless(is_array($this->mediaData[$type][$mediaId] ?? null), 404);

        $this->mediaRefreshError = null;

        try {
            $details = app(TmdbService::class)->fetchMedia($type, (string) $mediaId);
        } catch (ConnectionException|RequestException $exception) {
            report($exception);
            $this->mediaRefreshError = 'Refresh failed.';

            return;
        }

        abort_if($details === [], 502, 'Media details could not be loaded.');

        $details['type'] = $type;
        $details['id'] = $mediaId;
        if (array_key_exists('userTitle', $this->mediaData[$type][$mediaId])) {
            $details['userTitle'] = $this->mediaData[$type][$mediaId]['userTitle'];
        }

        $this->mediaData[$type][$mediaId] = $details;
        $this->save();
    }

    public function selectMediaForLayer(int $layerIndex, string $type, int $id)
    {
        $this->authorizeProjectAccess();
        abort_unless(array_key_exists($layerIndex, $this->layers), 404);
        abort_unless(in_array($type, ['tv', 'movie'], true) && $id > 0, 404);

        $tmdb = app(TmdbService::class);
        $details = $tmdb->fetchMedia($type, (string) $id);

        abort_if($details === [], 502, 'Media details could not be loaded.');
        abort_unless(
            ! array_key_exists($type, $this->mediaData) || is_array($this->mediaData[$type]),
            422,
            'Media data is invalid.',
        );

        $details['type'] = $type;
        $details['id'] = $id;
        $this->mediaData[$type][$id] = $details;
        $this->layers[$layerIndex][] = ['ref' => [$type, $id]];

        $this->searchQuery = '';
        $this->searchResults = [];
        $this->closeAddEntryModal();

        $this->save();
    }

    public function selectSearchResult(int $layerIndex, int $resultIndex): void
    {
        $this->authorizeProjectAccess();
        abort_unless(is_array($this->layers[$layerIndex] ?? null), 404);

        $result = $this->searchResults[$resultIndex] ?? null;
        abort_unless(is_array($result), 404);

        if ($this->searchTab === 'books') {
            $bookId = $result['id'] ?? null;
            abort_unless(is_string($bookId), 404);

            $this->selectBookForLayer($layerIndex, $bookId);

            return;
        }

        abort_unless($this->searchTab === 'tv-movies', 404);
        $type = $result['media_type'] ?? null;
        $id = filter_var($result['id'] ?? null, FILTER_VALIDATE_INT);
        abort_unless(in_array($type, ['tv', 'movie'], true) && $id !== false, 404);

        $this->selectMediaForLayer($layerIndex, $type, (int) $id);
    }

    public function selectBookForLayer(int $layerIndex, string $bookId): void
    {
        $this->authorizeProjectAccess();
        abort_unless(is_array($this->layers[$layerIndex] ?? null), 404);
        abort_unless(preg_match('/^[A-Za-z0-9_-]{1,128}$/', $bookId) === 1, 404);

        $result = collect($this->searchResults)
            ->first(fn (array $item) => ($item['id'] ?? null) === $bookId && ($item['media_type'] ?? null) === 'book');
        abort_unless(is_array($result), 404);
        abort_unless($this->searchTab === 'books', 404);
        abort_unless(is_string($result['title'] ?? null) && trim($result['title']) !== '', 404);
        abort_unless(
            ! array_key_exists('book', $this->mediaData) || is_array($this->mediaData['book']),
            422,
            'Book data is invalid.',
        );

        $book = [
            'ref' => ['book', $bookId],
            'id' => $bookId,
            'type' => 'book',
            'title' => $result['title'],
            'description' => $result['description'] ?? '',
            'authors' => $result['authors'] ?? [],
            'thumbnail' => $result['thumbnail'] ?: ($result['image'] ?? ''),
            'pageCount' => $result['pageCount'] ?? null,
            'categories' => $result['categories'] ?? [],
            'density' => $result['density'] ?? 250,
            'selfLink' => $result['selfLink'] ?? null,
            'year' => $result['year'] ?: ($result['publishedYear'] ?? ''),
        ];
        $this->mediaData['book'][$bookId] = $book;
        $this->layers[$layerIndex][] = ['ref' => ['book', $bookId]];
        $this->closeAddEntryModal();

        $this->save();
    }

    public function save()
    {
        $this->authorizeProjectAccess();

        $this->title = trim($this->title) !== ''
            ? $this->title
            : ($this->project->title ?: 'Untitled Schedule');
        $this->description = trim($this->description) !== ''
            ? $this->description
            : ($this->project->description ?: 'No Description');

        $this->project->update([
            'title' => $this->title,
            'description' => $this->description,
            'layers' => $this->mapEditorLayersToStorage($this->layers),
            'titles' => array_values($this->titles),
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

    private function authorizeProjectAccess(): void
    {
        $userIdentifier = Auth::user()->firebase_uid ?? (string) Auth::id();
        $ownsProject = $this->project->user_id === $userIdentifier;
        $isMember = $this->project->members()
            ->where('users.firebase_uid', $userIdentifier)
            ->exists();

        abort_unless($ownsProject || $isMember, 404);
    }

    private function mapStoredLayers(array $storedLayers): array
    {
        $layers = [];

        foreach (array_values($storedLayers) as $index => $layer) {
            if (! is_array($layer)) {
                $layers[] = [];

                continue;
            }

            $indexedEntries = $layer[$index] ?? null;
            $isStoredLayerWrapper = is_array($indexedEntries)
                && array_is_list($indexedEntries)
                && ! array_key_exists('ref', $indexedEntries)
                && ! array_key_exists('barrier', $indexedEntries);

            $layers[] = $isStoredLayerWrapper
                ? $indexedEntries
                : array_values($layer);
        }

        return $layers;
    }

    private function mapEditorLayersToStorage(array $layers): array
    {
        $storedLayers = [];

        foreach (array_values($layers) as $index => $layer) {
            $storedLayers[$index] = [
                $index => is_array($layer) ? array_values($layer) : [],
            ];
        }

        return $storedLayers;
    }

    public function render()
    {
        return view('livewire.project-editor')
            ->layout('layouts.app', ['page' => 'project']);
    }
}
