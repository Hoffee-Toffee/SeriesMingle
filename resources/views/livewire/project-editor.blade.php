<div class="max-w-7xl mx-auto px-4 py-6">
    <!-- Header Controls -->
    <div class="flex justify-between items-center mb-6 border-b border-[#0095fa] pb-3">
        <a href="{{ route('dashboard') }}" class="sm-button">
            &larr; Back to Dashboard
        </a>
        <button wire:click="save" class="sm-button">
            Save Schedule
        </button>
    </div>

    <!-- Title & Description -->
    <div class="sm-fieldset mb-8">
        <legend class="sm-legend">Schedule Details</legend>
        <input type="text" wire:model.blur="title" wire:change="save" placeholder="Schedule Title"
               class="w-full text-xl font-bold bg-[#0d1626] border border-[#0095fa] text-[#bfbf30] p-2 rounded mb-3">
        <textarea wire:model.blur="description" wire:change="save" placeholder="Description or notes..."
                  class="w-full bg-[#0d1626] border border-[#0095fa] text-xs text-white p-2 rounded h-16 resize-none"></textarea>
    </div>

    <!-- Layer Management -->
    <div class="sm-fieldset mb-8">
        <legend class="sm-legend">Layers</legend>
        <div class="flex justify-between items-center mb-4">
            <span class="text-xs text-gray-300">Drag or configure layers to interleave shows</span>
            <button wire:click="addLayer" class="sm-button !py-1 !px-2 text-xs">
                + Add Layer
            </button>
        </div>

        <div class="space-y-4">
            @forelse($layers as $index => $layer)
                <div class="p-3 bg-[#0d1626] border border-[#0095fa] rounded flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span class="sm-font-fredoka text-xs text-[#30bfb3]">Layer {{ $index + 1 }}</span>
                        <div class="flex flex-wrap gap-2">
                            @foreach($layer as $item)
                                <span class="px-2 py-0.5 bg-[#8b0000] border border-[#ff4500] text-[#d7e300] text-xs rounded">
                                    {{ $item['title'] ?? 'Item' }}
                                </span>
                            @endforeach
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button wire:click="$set('activeTargetLayer', {{ $index }})" class="sm-button !py-0.5 !px-2 !text-xs">
                            + Add Show/Movie
                        </button>
                        <button wire:click="removeLayer({{ $index }})" class="text-red-400 hover:text-red-300 text-xs font-bold">
                            Remove
                        </button>
                    </div>
                </div>
            @empty
                <p class="text-center text-xs text-gray-400 py-4">No layers added yet. Click "+ Add Layer" to start building.</p>
            @endforelse
        </div>
    </div>

    <!-- Schedule Viewer Component -->
    <x-schedule-viewer :schedule="$schedule" />

    <!-- Search Modal / Overlay -->
    @if($activeTargetLayer !== null)
        <div class="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
            <div class="sm-container max-w-lg w-full p-6 shadow-2xl">
                <div class="flex justify-between items-center mb-4 border-b border-[#0095fa] pb-2">
                    <h3 class="sm-font-fredoka text-base text-[#bfbf30]">Add Media to Layer {{ $activeTargetLayer + 1 }}</h3>
                    <button wire:click="$set('activeTargetLayer', null)" class="text-gray-400 hover:text-white font-bold">&times;</button>
                </div>
                <input type="text" wire:model.live.debounce.300ms="searchQuery" placeholder="Search TMDb for show or movie..."
                       class="w-full bg-[#0d1626] border border-[#0095fa] text-white p-2 rounded text-xs mb-4">

                <div class="max-h-60 overflow-y-auto space-y-2">
                    @foreach($searchResults as $result)
                        @if(isset($result['media_type']) && in_array($result['media_type'], ['movie', 'tv']))
                            <div wire:click="selectMediaForLayer({{ $activeTargetLayer }}, '{{ $result['media_type'] }}', {{ $result['id'] }})"
                                 class="p-2 bg-[#0d1626] hover:bg-[#8b0000] border border-[#0095fa] rounded cursor-pointer flex justify-between items-center transition">
                                <div>
                                    <p class="text-xs font-bold text-[#d7e300]">
                                        {{ $result['title'] ?? $result['name'] ?? '' }}
                                    </p>
                                    <span class="text-[10px] text-gray-400 uppercase">{{ $result['media_type'] }}</span>
                                </div>
                                <span class="sm-button !py-0.5 !px-2 !text-[10px]">+ Select</span>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
    @endif
</div>
