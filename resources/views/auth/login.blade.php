@extends('layouts.app')

@section('title', 'Login - SeriesMingle')

@section('content')
<main class="min-h-screen bg-[#0a2553] flex items-center justify-center p-6">
    <div class="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h1 class="text-4xl font-extrabold text-[#ffff00] mb-2">SeriesMingle</h1>
        <p class="text-gray-300 mb-8">Sign in with Google to create and manage your custom schedule mingle timelines.</p>
        <a href="{{ url('/auth/google') }}" class="w-full py-3 px-6 bg-[#ffff00] text-[#0a2553] font-bold rounded-lg shadow hover:bg-yellow-400 transition flex items-center justify-center space-x-3">
            <span>Sign in with Google</span>
        </a>
    </div>
</main>
@endsection
