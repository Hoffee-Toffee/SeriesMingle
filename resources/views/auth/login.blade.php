<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sign In - SeriesMingle</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-900 text-white font-sans antialiased flex items-center justify-center min-h-screen">
    <div class="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-gray-700">
        <h1 class="text-3xl font-extrabold text-indigo-500 mb-2">SeriesMingle</h1>
        <p class="text-gray-400 text-sm mb-8">Sign in with Google to manage your viewing timelines</p>

        @if(session('error'))
            <div class="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg mb-6">
                {{ session('error') }}
            </div>
        @endif

        <a href="{{ route('auth.google') }}" class="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center justify-center space-x-3 transition shadow-md">
            <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1H12v3.8h5.35c-.23 1.25-.94 2.31-2 3.03v2.52h3.24c1.89-1.74 2.98-4.3 2.98-7.35 0-.7-.06-1.38-.22-2z"/><path fill="currentColor" d="M12 21c2.7 0 4.96-.9 6.62-2.45l-3.24-2.52c-.9.6-2.05.97-3.38.97-2.6 0-4.81-1.76-5.59-4.12H3.06v2.6C4.7 18.73 8.08 21 12 21z"/><path fill="currentColor" d="M6.41 12.88c-.2-.6-.31-1.25-.31-1.88s.11-1.28.31-1.88V6.52H3.06C2.39 7.85 2 9.38 2 11s.39 3.15 1.06 4.48l3.35-2.6z"/><path fill="currentColor" d="M12 5.38c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.96 2.34 14.7 1.5 12 1.5 8.08 1.5 4.7 3.77 3.06 7.12l3.35 2.6c.78-2.36 2.99-4.34 5.59-4.34z"/></svg>
            <span>Continue with Google</span>
        </a>
    </div>
</body>
</html>
