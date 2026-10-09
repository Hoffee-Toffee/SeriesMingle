<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'SeriesMingle') }}</title>

        <link rel="manifest" href="/manifest.json">
        <meta name="theme-color" content="#0a2553">

        <!-- Tailwind & App Styles -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
        @livewireStyles

        <style>
            :root {
                --textMain: #0a0f1a;
                --textSec: #ffffff;
                --bgMain: #0a2553;
                --bgSec: #0d1626;
                --bgBorder: #0095fa;
                --linkSec: #d7e300;
                --buttonBg: #8b0000;
                --buttonSec: #ff4500;
                --linkMain: #ffff00;
                --linkTert: #bfbf30;
                --hoverSec: #30bfb3;
            }
            body {
                background-color: var(--bgSec);
                color: var(--textSec);
            }
        </style>
    </head>
    <body class="font-sans antialiased bg-[#0d1626] text-white">
        <!-- SeriesMingle Top Navigation Bar -->
        <header class="fixed top-0 left-0 right-0 h-14 bg-[#0a0f1a] border-b-2 border-[#0095fa] px-6 flex items-center justify-between z-50">
            <a href="{{ route('home') }}" class="flex items-center space-x-2">
                <span class="text-xl font-black text-[#bfbf30] tracking-wider">Series<span class="text-[#30bfb3]">Mingle</span></span>
            </a>
            <nav class="flex items-center space-x-6 text-sm">
                <a href="{{ route('home') }}" class="text-[#bfbf30] hover:text-[#30bfb3] transition">Home</a>
                @auth
                    <a href="{{ route('dashboard') }}" class="text-[#bfbf30] hover:text-[#30bfb3] transition font-semibold">Dashboard</a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="text-red-400 hover:text-red-300 text-xs font-semibold uppercase tracking-wider">Sign Out</button>
                    </form>
                @else
                    <a href="{{ route('auth.google') }}" class="px-3 py-1 bg-[#8b0000] border border-[#ff4500] text-[#d7e300] hover:bg-[#ff4500] hover:text-white rounded transition text-xs font-bold">
                        Login / Register
                    </a>
                @endauth
            </nav>
        </header>

        <!-- Main Content Wrapper -->
        <div class="pt-16 min-h-screen">
            <main>
                {{ $slot }}
            </main>
        </div>

        @livewireScripts
    </body>
</html>
