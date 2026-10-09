<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SeriesMingle - Seamlessly Interleave Multi-Series Timelines</title>

    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#0a2553">

    <meta name="description" content="Seamlessly interleave TV shows & movies, create unified schedules, track watch progression, and share custom viewing timelines.">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#0d1626] text-white font-sans antialiased min-h-screen flex flex-col justify-between">

    <header class="fixed top-0 left-0 right-0 h-14 bg-[#0a0f1a] border-b-2 border-[#0095fa] px-6 flex items-center justify-between z-50">
        <a href="{{ route('home') }}" class="flex items-center space-x-2">
            <span class="text-2xl font-black text-[#bfbf30] tracking-wider">Series<span class="text-[#30bfb3]">Mingle</span></span>
        </a>
        <nav class="flex items-center space-x-6 text-sm">
            @auth
                <a href="{{ route('dashboard') }}" class="text-[#bfbf30] hover:text-[#30bfb3] transition font-semibold">Dashboard</a>
            @else
                <a href="{{ route('auth.google') }}" class="px-3 py-1 bg-[#8b0000] border border-[#ff4500] text-[#d7e300] hover:bg-[#ff4500] hover:text-white rounded transition text-xs font-bold">
                    Login or Register
                </a>
            @endauth
        </nav>
    </header>

    <main class="pt-24 pb-16 max-w-4xl mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-black text-[#bfbf30] mb-6">
            Series<span class="text-[#30bfb3]">Mingle</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Interleave your favorite TV shows & movies seamlessly into unified chronological viewing timelines.
        </p>

        <div class="mb-12">
            @auth
                <a href="{{ route('dashboard') }}" class="inline-block px-8 py-4 bg-[#8b0000] border-2 border-[#ff4500] text-[#d7e300] hover:bg-[#ff4500] hover:text-white rounded-lg font-bold text-lg shadow-xl transition">
                    Go to Dashboard
                </a>
            @else
                <a href="{{ route('auth.google') }}" class="inline-block px-8 py-4 bg-[#8b0000] border-2 border-[#ff4500] text-[#d7e300] hover:bg-[#ff4500] hover:text-white rounded-lg font-bold text-lg shadow-xl transition">
                    Get Started with Google
                </a>
            @endauth
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="bg-[#0a2553] border border-[#0095fa]/40 p-6 rounded-lg">
                <h3 class="text-base font-bold text-[#bfbf30] mb-2">Interleaved Schedules</h3>
                <p class="text-xs text-gray-300">Mix multiple series together in order, spacing out multi-parters and balancing show lengths.</p>
            </div>
            <div class="bg-[#0a2553] border border-[#0095fa]/40 p-6 rounded-lg">
                <h3 class="text-base font-bold text-[#bfbf30] mb-2">TMDb Metadata Integration</h3>
                <p class="text-xs text-gray-300">Instantly search and add shows, seasons, and movies with accurate runtime details.</p>
            </div>
            <div class="bg-[#0a2553] border border-[#0095fa]/40 p-6 rounded-lg">
                <h3 class="text-base font-bold text-[#bfbf30] mb-2">Share & Track</h3>
                <p class="text-xs text-gray-300">Bookmark your progress and share custom timelines with friends and community.</p>
            </div>
        </div>
    </main>

    <footer class="bg-[#0a0f1a] border-t border-[#0095fa]/30 py-4 text-center text-xs text-gray-400">
        <p>&copy; {{ date('Y') }} SeriesMingle. Built with Laravel, Tailwind CSS, & Livewire.</p>
    </footer>

</body>
</html>
