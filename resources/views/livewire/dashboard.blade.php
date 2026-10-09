<div class="max-w-7xl mx-auto px-6 py-8">
    <div class="flex justify-between items-center mb-8 border-b border-[#0095fa]/30 pb-4">
        <div>
            <h1 class="text-3xl font-extrabold text-[#bfbf30]">Dashboard</h1>
            <p class="text-xs text-gray-400 mt-1">Manage and organize your custom viewing timelines</p>
        </div>
        <button wire:click="createProject" class="px-4 py-2 bg-[#8b0000] border border-[#ff4500] text-[#d7e300] hover:bg-[#ff4500] hover:text-white font-bold rounded shadow transition text-sm">
            + New Schedule
        </button>
    </div>

    <!-- Owned Projects -->
    <div class="mb-12">
        <h2 class="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <span class="w-2.5 h-2.5 bg-[#30bfb3] rounded-full inline-block"></span>
            <span>Your Schedules</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @forelse($ownedProjects as $project)
                <div class="bg-[#0a2553] border border-[#0095fa]/40 rounded-lg p-5 flex flex-col justify-between hover:border-[#0095fa] transition shadow-lg">
                    <div>
                        <a href="{{ route('projects.show', $project->id) }}" class="block group">
                            <h3 class="text-lg font-bold text-[#bfbf30] group-hover:text-[#30bfb3] transition truncate">
                                {{ $project->title ?: 'Untitled Schedule' }}
                            </h3>
                            <p class="text-xs text-gray-300 mt-2 line-clamp-3">
                                {{ $project->description ?: 'No description provided.' }}
                            </p>
                        </a>
                    </div>
                    <div class="mt-6 pt-4 border-t border-[#0095fa]/20 flex justify-between items-center text-xs text-gray-400">
                        <span>Updated {{ $project->updated_at->diffForHumans() }}</span>
                        <div class="flex space-x-3">
                            <button wire:click="cloneProject('{{ $project->id }}')" class="text-[#30bfb3] hover:underline font-semibold">Clone</button>
                            <button wire:click="deleteProject('{{ $project->id }}')" onclick="return confirm('Delete this schedule?')" class="text-red-400 hover:underline font-semibold">Delete</button>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-full py-12 text-center bg-[#0a2553]/50 border border-dashed border-[#0095fa]/30 rounded-lg">
                    <p class="text-gray-400 text-sm mb-4">No viewing schedules found.</p>
                    <button wire:click="createProject" class="px-4 py-2 bg-[#8b0000] border border-[#ff4500] text-[#d7e300] hover:bg-[#ff4500] hover:text-white font-bold rounded text-xs">
                        Create Your First Schedule
                    </button>
                </div>
            @endforelse
        </div>
    </div>
</div>
