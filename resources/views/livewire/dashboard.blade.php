<div class="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition">
                Sign Out
            </button>
        </form>
    </div>

    <!-- Owned Projects Section -->
    <div class="mb-10">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Your Projects</h2>
            <button wire:click="createProject" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                <span>New Project</span>
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @forelse($ownedProjects as $project)
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-5 hover:shadow-md transition relative flex flex-col justify-between">
                    <div>
                        <a href="{{ route('projects.show', $project->id) }}" class="block">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white truncate">
                                {{ $project->title ?: 'Untitled Schedule' }}
                            </h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                                {{ $project->description ?: 'No Description' }}
                            </p>
                        </a>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-400">
                        <span>Updated {{ $project->updated_at->diffForHumans() }}</span>
                        <div class="flex space-x-2">
                            <button wire:click="cloneProject('{{ $project->id }}')" title="Clone Project" class="p-1 hover:text-indigo-600 transition">
                                Clone
                            </button>
                            <button wire:click="deleteProject('{{ $project->id }}')" onclick="return confirm('Are you sure you want to delete this project?')" title="Delete Project" class="p-1 hover:text-red-600 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                    <p class="text-gray-500 dark:text-gray-400 mb-4">No projects found. Create your first timeline schedule!</p>
                    <button wire:click="createProject" class="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium">Create Project</button>
                </div>
            @endforelse
        </div>
    </div>

    <!-- Joined Projects Section -->
    @if(count($joinedProjects) > 0)
    <div>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Joined Projects</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($joinedProjects as $project)
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-5">
                    <a href="{{ route('projects.show', $project->id) }}" class="block">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white truncate">
                            {{ $project->title ?: 'Untitled Schedule' }}
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                            {{ $project->description ?: 'No Description' }}
                        </p>
                    </a>
                </div>
            @endforeach
        </div>
    </div>
    @endif
</div>
