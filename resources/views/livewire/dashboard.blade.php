<div class="max-w-7xl mx-auto px-4 py-6">
    <div class="text-center mb-8">
        <h1 class="text-3xl sm-font-fredoka text-white">Dashboard</h1>
    </div>

    <!-- Projects Section -->
    <div class="projects-list mb-12">
        <div class="flex items-center justify-between mb-6 border-b border-[#0095fa]/40 pb-2">
            <h2 class="text-xl sm-font-fredoka text-[#bfbf30] flex items-center space-x-2">
                <span>Owned Projects</span>
            </h2>
            <button wire:click="createProject" class="sm-button">
                + Create New Project
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @forelse($ownedProjects as $project)
                <div class="sm-container flex flex-col justify-between hover:border-[#0095fa] transition">
                    <div>
                        <a href="{{ route('projects.show', $project->id) }}" class="block">
                            <h3 class="text-lg sm-font-fredoka text-[#bfbf30] hover:text-[#30bfb3] transition truncate">
                                {{ $project->title ?: 'Untitled Schedule' }}
                            </h3>
                            <p class="text-xs text-gray-300 mt-2 line-clamp-3">
                                {{ $project->description ?: 'No Description' }}
                            </p>
                        </a>
                    </div>
                    <div class="mt-6 pt-3 border-t border-[#0095fa]/20 flex justify-between items-center text-xs text-gray-400">
                        <span>Updated {{ $project->updated_at->diffForHumans() }}</span>
                        <div class="flex space-x-2">
                            <button wire:click="cloneProject('{{ $project->id }}')" class="sm-button !py-0.5 !px-2">Clone</button>
                            <button wire:click="deleteProject('{{ $project->id }}')" onclick="return confirm('Delete this project?')" class="sm-button !py-0.5 !px-2 !bg-red-900 !border-red-600">Delete</button>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-full py-12 text-center sm-container">
                    <p class="text-gray-300 text-sm mb-4">No projects found.</p>
                    <button wire:click="createProject" class="sm-button">Create Project</button>
                </div>
            @endforelse
        </div>
    </div>
</div>
