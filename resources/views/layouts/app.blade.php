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
        <link rel="stylesheet" href="{{ asset('react-mapped/styles/app.css') }}">
        <link rel="stylesheet" href="{{ asset('react-mapped/styles/theme.css') }}">
        @stack('styles')
        @livewireStyles
            <script
      src="https://kit.fontawesome.com/251912c541.js"
      crossorigin="anonymous"
    ></script>
        <script
      src="https://kit.fontawesome.com/251912c541.js"
      crossorigin="anonymous"
    ></script>
</head>
    <body class="font-sans antialiased bg-[#0d1626] text-white">
        <div id="app">
            {{ $slot }}
        </div>
        @livewireScripts
    </body>
</html>
