<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SeriesMingle - Seamlessly Watch Multi-Series Timelines</title>

    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#4f46e5">

    <!-- SEO Meta Tags -->
    <meta name="description" content="Seamlessly interleave TV shows & movies, create unified schedules, track watch progression, and share custom viewing timelines with SeriesMingle.">
    <meta property="og:title" content="SeriesMingle - Seamlessly Watch Multi-Series Timelines">
    <meta property="og:description" content="Interleave your favorite TV shows & movies seamlessly with custom timeline schedules.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta name="twitter:card" content="summary_large_image">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-900 text-white font-sans antialiased">
    <nav class="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div class="flex items-center space-x-3">
            <span class="text-2xl font-black text-indigo-500 tracking-wider">SeriesMingle</span>
        </div>
        <div class="flex items-center space-x-6">
            @auth
                <a href="{{ route('dashboard') }}" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition">
                    Dashboard
                </a>
            @else
                <a href="{{ route('auth.google') }}" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition flex items-center space-x-2">
                    <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1H12v3.8h5.35c-.23 1.25-.94 2.31-2 3.03v2.52h3.24c1.89-1.74 2.98-4.3 2.98-7.35 0-.7-.06-1.38-.22-2z"/><path fill="currentColor" d="M12 21c2.7 0 4.96-.9 6.62-2.45l-3.24-2.52c-.9.6-2.05.97-3.38.97-2.6 0-4.81-1.76-5.59-4.12H3.06v2.6C4.7 18.73 8.08 21 12 21z"/><path fill="currentColor" d="M6.41 12.88c-.2-.6-.31-1.25-.31-1.88s.11-1.28.31-1.88V6.52H3.06C2.39 7.85 2 9.38 2 11s.39 3.15 1.06 4.48l3.35-2.6z"/><path fill="currentColor" d="M12 5.38c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.96 2.34 14.7 1.5 12 1.5 8.08 1.5 4.7 3.77 3.06 7.12l3.35 2.6c.78-2.36 2.99-4.34 5.59-4.34z"/></svg>
                    <span>Sign in with Google</span>
                </a>
            @endauth
        </div>
    </nav>

    <div class="max-w-4xl mx-auto text-center py-20 px-6">
        <h1 class="text-5xl font-extrabold text-white leading-tight mb-6">
            Interleave your favorite TV shows & movies seamlessly
        </h1>
        <p class="text-xl text-gray-400 mb-10">
            Create unified schedules, track watch progression across multiple franchises, and share custom viewing timelines.
        </p>
        <div>
            @auth
                <a href="{{ route('dashboard') }}" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg transition">
                    Go to Dashboard
                </a>
            @else
                <a href="{{ route('auth.google') }}" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg transition">
                    Get Started with Google
                </a>
            @endauth
        </div>
    </div>

    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js');
            });
        }
    </script>
</body>
</html>
