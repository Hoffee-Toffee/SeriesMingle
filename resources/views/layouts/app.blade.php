<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'SeriesMingle') }}</title>

        <link rel="manifest" href="/manifest.json">
        <meta name="theme-color" content="#0a2553">

        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @livewireStyles
    </head>
    <body class="font-sans antialiased bg-[#0d1626] text-white">
        <!-- Exact Header from SeriesMingle -->
        <header class="fixed top-0 left-0 right-0 h-12 bg-[#0a0f1a] border-b-2 border-[#0095fa] px-4 flex items-center justify-between z-50">
            <a href="{{ route('home') }}" id="home-link" class="flex items-center space-x-2">
                <span class="text-xl sm-font-fredoka text-[#bfbf30]">Series<span class="text-[#30bfb3]">Mingle</span></span>
            </a>
            <nav class="flex items-center space-x-6 text-sm">
                <a href="{{ route('home') }}" class="text-[#bfbf30] hover:text-[#30bfb3] transition">Home</a>
                @auth
                    <a href="{{ route('dashboard') }}" class="text-[#bfbf30] hover:text-[#30bfb3] transition font-semibold">Dashboard</a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="text-red-400 hover:text-red-300 text-xs uppercase font-bold tracking-wider">Sign Out</button>
                    </form>
                @else
                    <a href="{{ route('auth.google') }}" class="sm-button">
                        Login or Register
                    </a>
                @endauth
            </nav>
        </header>

        <div class="pt-16 min-h-screen">
            <main>
                {{ $slot }}
            </main>
        </div>

        @livewireScripts
    </body>
</html>
