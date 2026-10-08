<div class="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-6">
        <a href="{{ route('dashboard') }}" class="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            &larr; Back to Dashboard
        </a>
        <button wire:click="save" class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium shadow hover:bg-indigo-700 transition">
            Save Schedule
        </button>
    </div>

    <!-- Title & Description -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <input type="text" wire:model.blur="title" wire:change="save" placeholder="Schedule Title"
               class="w-full text-2xl font-bold bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:ring-0 focus:border-indigo-500 dark:text-white mb-3">
        <textarea wire:model.blur="description" wire:change="save" placeholder="Description or notes..."
                  class="w-full bg-transparent border-0 text-sm text-gray-600 dark:text-gray-300 focus:ring-0 resize-none h-16"></textarea>
    </div>

    <!-- Layer Management -->
    <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Layers</h2>
            <button wire:click="addLayer" class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium rounded-md transition">
                + Add Layer
            </button>
        </div>

        <div class="space-y-4">
            @forelse($layers as $index => $layer)
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="flex items-center space-x-3">
                        <span class="font-bold text-gray-400">Layer {{ $index + 1 }}</span>
                        <div class="flex flex-wrap gap-2">
                            @foreach($layer as $item)
                                <span class="inline-flex items-center px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                                    {{ $item['title'] ?? 'Item' }}
                                </span>
                            @endforeach
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button wire:click="$set('activeTargetLayer', {{ $index }})" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-md">
                            + Add Show/Movie
                        </button>
                        <button wire:click="removeLayer({{ $index }})" class="text-red-500 hover:text-red-700 text-xs font-medium">
                            Remove
                        </button>
                    </div>
                </div>
            @empty
                <div class="text-center py-6 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-sm text-gray-500">
                    No layers added yet. Click "+ Add Layer" to build your timeline schedule.
                </div>
            @endforelse
        </div>
    </div>

    <!-- Search Modal / Overlay -->
    @if($activeTargetLayer !== null)
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">Add Media to Layer {{ $activeTargetLayer + 1 }}</h3>
                    <button wire:click="$set('activeTargetLayer', null)" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <input type="text" wire:model.live.debounce.300ms="searchQuery" placeholder="Search TMDb for show or movie..."
                       class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm mb-4">

                <div class="max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                    @foreach($searchResults as $result)
                        @if(isset($result['media_type']) && in_array($result['media_type'], ['movie', 'tv']))
                            <div wire:click="selectMediaForLayer({{ $activeTargetLayer }}, '{{ $result['media_type'] }}', {{ $result['id'] }})"
                                 class="p-3 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded cursor-pointer flex justify-between items-center">
                                <div>
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white">
                                        {{ $result['title'] ?? $result['name'] ?? '' }}
                                    </p>
                                    <span class="text-xs text-gray-400 uppercase">{{ $result['media_type'] }}</span>
                                </div>
                                <span class="text-xs text-indigo-600 font-bold">+ Select</span>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
    @endif
</div>
