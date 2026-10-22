@extends('layouts.app')

@section('title', 'SeriesMingle')

@section('content')
<main>
      <span id="overlay">
        @auth
<a href="{{ url('/dashboard') }}" class="button">
          <h3>
            Go to Dashboard
          </h3>
        </a>
@else
<a href="{{ url('/auth/google') }}" class="button">
          <h3>
            Get Started
          </h3>
        </a>
@endauth
        <span class="scroll-indicator">
          <i class="fa fa-chevron-down" aria-hidden="true" />
        </span>
      </span>
      <div id="about">
        <div class="content">
          <h1>
            <span>Series</span>
            <span>Mingle</span>
          </h1>
          <h2>
            Create your own TV and movie schedules.
          </h2>
          <div id="project" class="bg my-8"><div id="timelineContainer" data-id="main" class="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left shadow-2xl"><div id="layerTitles" class="space-y-3 font-mono text-base"><span class="block p-3 bg-[#0a2553] rounded border border-blue-900 shadow">Breaking Bad Universe</span><span class="block p-3 bg-[#0a2553] rounded border border-blue-900 shadow">James Bond Films</span><span class="block p-3 bg-[#0a2553] rounded border border-blue-900 shadow">'House'</span></div></div></div>
        </div>
      </div>
      <div>
        <div class="content">
          <h2>
            Bookmark your progress.
          </h2>
          <div id="project" class="bg my-6"><div id="timelineContainer" data-id="bookmark" class="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left shadow-lg"><div id="layerTitles" class="space-y-2 font-mono text-sm text-gray-300"><div class="p-2 bg-[#0a2553] rounded">Sample Schedule Timeline - bookmark</div></div></div></div>
        </div>
      </div>
      <div>
        <div class="content">
          <h2>
            Use layers to watch sets of shows and movies in order.
          </h2>
          <div id="project" class="bg my-6"><div id="timelineContainer" data-id="layers" class="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left shadow-lg"><div id="layerTitles" class="space-y-2 font-mono text-sm text-gray-300"><div class="p-2 bg-[#0a2553] rounded">Sample Schedule Timeline - layers</div></div></div></div>
        </div>
      </div>
      <div>
        <div class="content">
          <h2>Choose starting points for shows to start where you left off.</h2>
          <div id="project" class="bg my-6"><div id="timelineContainer" data-id="start-points" class="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left shadow-lg"><div id="layerTitles" class="space-y-2 font-mono text-sm text-gray-300"><div class="p-2 bg-[#0a2553] rounded">Sample Schedule Timeline - start-points</div></div></div></div>
        </div>
      </div>
      <div>
        <div class="content">
          <h2>Share and edit your schedule with friends.</h2>
          <div id="project" class="bg my-6"><div id="timelineContainer" data-id="share" class="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left shadow-lg"><div id="layerTitles" class="space-y-2 font-mono text-sm text-gray-300"><div class="p-2 bg-[#0a2553] rounded">Sample Schedule Timeline - share</div></div></div></div>
        </div>
      </div>
      <div>
        <div class="content">
          <h2>Customize your schedule with advanced settings.</h2>
          <div id="project" class="bg my-6"><div id="timelineContainer" data-id="custom" class="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left shadow-lg"><div id="layerTitles" class="space-y-2 font-mono text-sm text-gray-300"><div class="p-2 bg-[#0a2553] rounded">Sample Schedule Timeline - custom</div></div></div></div>
        </div>
      </div>
      <div id="contact">
        <div class="content">
          <h2>Contact</h2>
          <div class="bg">
            <p>
              Send feedback and personal inquiries to <a href="mailto:contact@seriesmingle.com">contact@seriesmingle.com</a>.
            </p>
            <p>
              Send bug reports, issues, and help requests to <a href="mailto:support@seriesmingle.com">support@seriesmingle.com</a>.
            </p>
          </div>
        </div>
      </div >
      <div>
        <div class="content">
          <h2>Get started with SeriesMingle today!</h2>
          <span id="overlay">
            @auth
<a href="{{ url('/dashboard') }}" class="button">
              <h3>
                Go to Dashboard
              </h3>
            </a>
@else
<a href="{{ url('/auth/google') }}" class="button">
              <h3>
                Get Started
              </h3>
            </a>
@endauth
          </span>
          <footer>
            <p>
              <img src="/icons/tmdb.svg" alt="TMDB logo" class="inline-block h-6 mr-2" />
              This website uses <a href="https://www.themoviedb.org/about" target="_blank" rel="noreferrer">TMDB</a> and the <a href="https://www.themoviedb.org/documentation/api" target="_blank" rel="noreferrer">TMDB APIs</a> but is not endorsed, certified, or otherwise approved by TMDB.
            </p>
            <p>
              &copy; <a href="https://github.com/Hoffee-Toffee"
                target="_blank" rel="noreferrer">Tristan Bulmer</a>, 2025.
            </p>
          </footer>
        </div>
      </div >
    </main>
@endsection