@push('styles')
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/project.css') }}">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/SearchModal.css') }}">
@endpush
<div id="project">
    @include('components.react-mapped.nav-project')
    <main class="fadein">
<div class="project-content">
    <!-- Title & Description -->
    <div id="project-details">
        <input type="text" wire:model.blur="title" wire:change="save" size="{{ max(mb_strlen($title), 1) }}" class="setTitle showTitle" aria-label="Schedule title">
        <textarea wire:model.blur="description" wire:change="save" class="setDescription" rows="1" aria-label="Schedule description"></textarea>
    </div>
    @if($mediaRefreshError)
        <p class="error" role="alert">{{ $mediaRefreshError }}</p>
    @endif

    <!-- Layer Management -->
    <fieldset id="layerContainer"><details open><summary><legend>Layers</legend></summary>
        <div class="layers">
            @forelse($layers as $index => $layer)
                <fieldset class="layer" id="layer-{{ $index }}" wire:key="layer-{{ $index }}">
                    <details open>
                        <summary><legend><input type="text" class="layer-title" aria-label="Layer title"
                            size="{{ max(mb_strlen($titles[$index] ?? 'Layer '.($index + 1)), 1) }}"
                            wire:model.blur="titles.{{ $index }}" wire:change="save"
                            placeholder="Layer {{ $index + 1 }}"></legend></summary>
                        <div class="options" wire:sort="moveEntry($item, $position, $id)"
                            wire:sort:group="project-entries" wire:sort:group-id="{{ $index }}"
                            wire:sort:config="{ forceFallback: true, fallbackTolerance: 10 }">
                            @foreach($layer as $entryIndex => $item)
                                @php
                                    $itemData = is_array($item) && isset($item['ref']) && is_array($item['ref'])
                                            ? data_get($mediaData, implode('.', $item['ref']))
                                            : (is_array($item) && isset($item['id']) ? ($mediaData[$item['id']] ?? null) : null);
                                    $itemTitle = data_get($itemData, 'userTitle')
                                            ?: data_get($itemData, 'title')
                                            ?: data_get($itemData, 'show_title')
                                            ?: data_get($itemData, 'name')
                                            ?: (is_array($item) ? ($item['title'] ?? null) : null);
                                @endphp
                                @if(is_array($item) && array_key_exists('barrier', $item))
                                    <div class="barrier" aria-label="Schedule barrier"
                                        wire:key="entry-{{ $index }}-{{ $entryIndex }}"
                                        wire:sort:item="'{{ $index }}-{{ $entryIndex }}'">
                                        <span class="left-icons"><i class="handle fa-solid fa-grip-vertical" wire:sort:handle></i></span>
                                            <label for="barrier-{{ $index }}-{{ $entryIndex }}">Position (Percentage):</label>
                                            <input id="barrier-{{ $index }}-{{ $entryIndex }}" type="number" min="0" max="100"
                                                wire:model.blur="layers.{{ $index }}.{{ $entryIndex }}.barrier"
                                                wire:change="save" aria-label="Barrier position">
                                            <span>Barrier</span>
                                            <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                                aria-label="Remove barrier">&times;</button>
                                    </div>
                                @elseif(is_string($item))
                                    <div class="new" wire:key="entry-{{ $index }}-{{ $entryIndex }}"
                                        wire:sort:item="'{{ $index }}-{{ $entryIndex }}'">
                                        <span class="left-icons"><i class="handle fa-solid fa-grip-vertical" wire:sort:handle></i></span>
                                            <input type="text" value="{{ $item }}" readonly aria-label="Unresolved entry">
                                            <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                                aria-label="Remove entry">&times;</button>
                                    </div>
                                @elseif($itemTitle)
                                    <div class="entry" wire:key="entry-{{ $index }}-{{ $entryIndex }}"
                                        wire:sort:item="'{{ $index }}-{{ $entryIndex }}'">
                                        @php
                                            $entryType = data_get($itemData, 'type');
                                        @endphp
                                        <span class="left-icons">
                                            @if(in_array($entryType, ['tv', 'movie'], true))
                                                <i class="refetch-icon fa-solid fa-rotate"
                                                    wire:click="refreshMedia({{ $index }}, {{ $entryIndex }})"
                                                    title="Refetch Media" role="button" tabindex="0"
                                                    aria-label="Refetch media"
                                                    wire:keydown.enter="refreshMedia({{ $index }}, {{ $entryIndex }})"
                                                    wire:keydown.space.prevent="refreshMedia({{ $index }}, {{ $entryIndex }})"
                                                    wire:loading.class="fa-spin"
                                                    wire:target="refreshMedia({{ $index }}, {{ $entryIndex }})"></i>
                                            @endif
                                            <i class="handle fa-solid fa-grip-vertical" wire:sort:handle></i>
                                        </span>
                                        @if(in_array($entryType, ['custom', 'tv'], true))
                                            @php
                                                $settingFields = $entryType === 'custom'
                                                    ? ['repeat', 'offset', 'term', 'runtime']
                                                    : ['start', 'end'];
                                                $settingLabels = $entryType === 'custom'
                                                    ? ['Repeat', 'Offset', 'Term', 'Duration (mins)']
                                                    : ['Start', 'End'];
                                                $settingKey = $entryType.'-'.data_get($item, 'ref.1');
                                                $settingIndex = $entrySettings[$settingKey] ?? 0;
                                                $settingField = $settingFields[$settingIndex] ?? $settingFields[0];
                                                $settingLabel = $settingLabels[$settingIndex] ?? $settingLabels[0];
                                                $showSeasons = is_array(data_get($itemData, 'seasons'))
                                                    ? data_get($itemData, 'seasons')
                                                    : [];
                                                $startParts = explode(':', (string) data_get($item, 'start', ''));
                                                $endParts = explode(':', (string) data_get($item, 'end', ''));
                                                $seasonsForSetting = $showSeasons;
                                                if ($entryType === 'tv' && $settingField === 'start' && array_key_exists('end', $item)) {
                                                    $seasonsForSetting = array_slice($showSeasons, 0, (int) ($endParts[0] ?? ''));
                                                } elseif ($entryType === 'tv' && $settingField === 'end' && data_get($item, 'start')) {
                                                    $startSeasonIndex = collect($showSeasons)->search(
                                                        fn (array $season) => (int) ($season['season'] ?? 0) >= (int) ($startParts[0] ?? 0) - 1,
                                                    );
                                                    $seasonsForSetting = array_slice(
                                                        $showSeasons,
                                                        $startSeasonIndex === false ? -1 : $startSeasonIndex,
                                                    );
                                                }
                                            @endphp
                                            <span class="setting">
                                                <button type="button" class="setting-label"
                                                    wire:click="cycleEntrySetting({{ $index }}, {{ $entryIndex }})">
                                                    <i class="fa-solid fa-sort"></i>{{ $settingLabel }}:
                                                </button>
                                                @if($entryType === 'tv')
                                                    <select class="value"
                                                        wire:change="updateTvRange({{ $index }}, {{ $entryIndex }}, '{{ $settingField }}', $event.target.value)">
                                                        @foreach($seasonsForSetting as $season)
                                                            @php
                                                                $episodesForSetting = is_array($season['episodes'] ?? null)
                                                                    ? $season['episodes']
                                                                    : [];
                                                                if ($settingField === 'start' && !empty($item['end'])) {
                                                                    $episodesForSetting = array_slice($episodesForSetting, 0, (int) ($endParts[1] ?? ''));
                                                                }
                                                            @endphp
                                                            <optgroup label="Season {{ $season['season'] }}">
                                                                @foreach($episodesForSetting as $episode)
                                                                    <option value="{{ $season['season'].':'.$episode['episode'] }}"
                                                                        @selected((string) data_get($item, $settingField, '') === (string) $season['season'].':'.(string) $episode['episode'])>{{ 'S'.$season['season'].'E'.$episode['episode'].': '.$episode['title'] }}</option>
                                                                @endforeach
                                                            </optgroup>
                                                        @endforeach
                                                    </select>
                                                @else
                                                    @php
                                                        $settingDefault = ['repeat' => 1, 'offset' => 0, 'term' => 'Part', 'runtime' => 30][$settingField];
                                                        $settingValue = data_get($itemData, $settingField, $settingDefault);
                                                        if (in_array($settingField, ['repeat', 'runtime'], true)) {
                                                            $settingValue = max((int) $settingValue, 1);
                                                        } elseif ($settingField === 'offset') {
                                                            $settingValue = max((int) $settingValue, 0);
                                                        }
                                                    @endphp
                                                    <input class="value" type="{{ $settingField === 'term' ? 'text' : 'number' }}"
                                                        @if($settingField !== 'term') min="{{ $settingField === 'offset' ? 0 : 1 }}" @endif
                                                        value="{{ $settingValue }}"
                                                        wire:change="updateCustomSetting({{ $index }}, {{ $entryIndex }}, '{{ $settingField }}', $event.target.value)">
                                                @endif
                                            </span>
                                        @endif
                                        <div class="option"><div>
                                        <input type="text" class="entry-title" value="{{ $itemTitle }}"
                                            size="{{ max((int) (mb_strlen($itemTitle) * 0.8), 1) }}"
                                            aria-label="Entry title"
                                            wire:change="updateEntryTitle({{ $index }}, {{ $entryIndex }}, $event.target.value)">
                                        </div></div>
                                        <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                            aria-label="Remove entry">&times;</button>
                                    </div>
                                @endif
                            @endforeach
                            <button type="button" wire:click="openAddEntryModal({{ $index }})" class="add-entry-btn">
                                <span>＋</span> Add Entry
                            </button>
                        </div>
                        <button type="button" wire:click="removeLayer({{ $index }})" aria-label="Remove layer">&times;</button>
                    </details>
                </fieldset>
            @empty
            @endforelse
        </div>
        <button type="button" wire:click="addLayer" class="sm-button">New Layer</button>
    </details>
</fieldset>

    <!-- Search Modal / Overlay -->
    @if($activeTargetLayer !== null)
            <div class="layer">
                <div class="search-modal-overlay" role="dialog" aria-modal="true">
                    <div class="search-modal">
                        <div class="search-modal-header">
                            <input class="search-input" type="text" wire:model.live.debounce.750ms="searchQuery"
                                wire:keydown.enter="searchNow"
                                placeholder="Search {{ ['tv-movies' => 'TV / Movies', 'books' => 'Books', 'other' => 'Other'][$searchTab] ?? 'TV / Movies' }}..."
                                aria-label="Search {{ ['tv-movies' => 'TV / Movies', 'books' => 'Books', 'other' => 'Other'][$searchTab] ?? 'TV / Movies' }}"
                                @disabled($searchTab === 'other') autofocus>
                            <button type="button" class="close-btn" wire:click="closeAddEntryModal" aria-label="Close">&times;</button>
                        </div>
                        <div class="tabs">
                            <button type="button" class="{{ $searchTab === 'tv-movies' ? 'active' : '' }}"
                                wire:click="setSearchTab('tv-movies')">TV / Movies</button>
                            <button type="button" class="{{ $searchTab === 'books' ? 'active' : '' }}"
                                wire:click="setSearchTab('books')">Books</button>
                            <button type="button" class="{{ $searchTab === 'other' ? 'active' : '' }}"
                                wire:click="setSearchTab('other')">Other</button>
                        </div>
                        @if($searchError)
                            <div class="error">{{ $searchError }}</div>
                        @endif
                        <div class="results">
                            @if($searchTab !== 'other' && empty($searchResults))
                                <div class="no-search-message">
                                    <span wire:loading wire:target="searchQuery, setSearchTab, searchNow">Fetching results...</span>
                                    <span wire:loading.remove wire:target="searchQuery, setSearchTab, searchNow">Type to search.</span>
                                </div>
                            @endif
                            @if($searchTab === 'other')
                                <div class="result-item" wire:click="addBarrier({{ $activeTargetLayer }})">
                                    <img src="https://placehold.co/200x300?text=No+Image+Available" alt="Add Barrier" style="background: #eee">
                                    <div style="flex: 1">
                                        <span style="font-weight: bold">Add Barrier</span>
                                        <div class="result-description" style="font-size: 0.95em; color: #666; margin-top: 0.2em">Insert a barrier to split your schedule into sections.</div>
                                    </div>
                                </div>
                                <div class="result-item" wire:click="addCustomEntry({{ $activeTargetLayer }})">
                                    <img src="https://placehold.co/200x300?text=No+Image+Available" alt="Add Custom Entry" style="background: #eee">
                                    <div style="flex: 1">
                                        <span style="font-weight: bold">Add Custom Entry</span>
                                        <div class="result-description" style="font-size: 0.95em; color: #666; margin-top: 0.2em">Create a custom entry for activities, events, or anything else.</div>
                                    </div>
                                </div>
                            @else
                                @foreach($searchResults as $resultIndex => $result)
                                    @php
                                        $date = (string) ($result['release_date'] ?? $result['first_air_date'] ?? '');
                                        $year = (string) ($result['year'] ?? $result['publishedYear'] ?? substr($date, 0, 4));
                                        $displayTitle = (string) ($result['title'] ?? '');
                                        if ($searchTab === 'tv-movies') {
                                            $typeLabel = ($result['media_type'] ?? null) === 'tv' ? 'TV' : (($result['media_type'] ?? null) === 'movie' ? 'Movie' : '');
                                            $displayTitle .= $typeLabel !== ''
                                                ? ' ('.$typeLabel.($year !== '' ? ', '.$year : '').')'
                                                : ($year !== '' ? ' ('.$year.')' : '');
                                        } else {
                                            $displayTitle .= $year !== '' ? ' ('.$year.')' : '';
                                        }
                                        $descriptionText = $result['overview'] ?? $result['description'] ?? '';
                                        $imageUrl = $result['image'] ?? 'https://placehold.co/200x300?text=No+Image+Available';
                                    @endphp
                                        <div class="result-item" wire:key="search-result-{{ $searchTab }}-{{ $resultIndex }}"
                                            wire:click="selectSearchResult({{ $activeTargetLayer }}, {{ $resultIndex }})"
                                            wire:loading.class="search-result-loading" wire:target="selectSearchResult">
                                        <img src="{{ $imageUrl }}" alt="{{ $result['title'] ?? '' }}" style="background: #eee">
                                        <div style="flex: 1">
                                            <span style="font-weight: bold">{{ $displayTitle }}</span>
                                            @if($descriptionText !== '')
                                                <div class="result-description" style="font-size: 0.95em; color: #666; margin-top: 0.2em">{{ $descriptionText }}</div>
                                            @endif
                                        </div>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>
    </main>
</div>
