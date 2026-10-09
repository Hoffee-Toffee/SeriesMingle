<div class="sm-container my-6">
    <div class="flex items-center justify-between border-b border-[#0095fa] pb-2 mb-4">
        <h3 class="sm-font-fredoka text-lg text-[#bfbf30]">Schedule Timeline View</h3>
        <span class="text-xs text-[#30bfb3] font-bold">{{ count($schedule['timeline'] ?? []) }} Total Interleaved Items</span>
    </div>

    @if(empty($schedule['timeline']))
        <p class="text-center text-sm text-gray-400 py-6">Add show or movie layers above to generate your interleaved viewing schedule timeline.</p>
    @else
        <div id="timelineContainer" class="p-4 bg-[#0a2553] border-2 border-[#0095fa] rounded overflow-x-auto min-h-[300px]">
            <div class="flex space-x-3">
                @foreach($schedule['timeline'] as $item)
                    <div class="p-3 bg-[#0d1626] border border-[#ff4500] rounded text-xs min-w-[160px] flex flex-col justify-between">
                        <div>
                            <span class="text-[10px] uppercase font-bold text-[#30bfb3]">Layer {{ $item['layerIndex'] + 1 }}</span>
                            <h4 class="font-bold text-[#d7e300] mt-1">{{ $item['title'] }}</h4>
                            <p class="text-[11px] text-gray-300 mt-1 line-clamp-2">{{ $item['overview'] }}</p>
                        </div>
                        <div class="mt-3 text-[10px] text-gray-400 border-t border-gray-700 pt-1">
                            {{ $item['episodes'] }} episode(s)
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif
</div>
