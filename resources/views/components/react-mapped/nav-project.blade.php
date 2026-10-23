<header id="nav-bar"><a href="{{ route('home') }}" id="home-link" aria-label="Home Page"><img src="{{ asset('react-mapped/assets/icons/icon.png') }}" alt="SeriesMingle Logo" id="logo" /></a><input type="checkbox" id="nav-toggle" /><label for="nav-toggle" id="nav-toggle-label" aria-label="Toggle Navigation"><span></span><span></span><span></span></label><nav>
@auth
<a href="{{ route('dashboard') }}">Dashboard</a>
@else
<a href="{{ route('login') }}">Login or Register</a>
@endauth

@auth
<form method="POST" action="{{ route('logout') }}" class="react-mapped-logout">@csrf<button type="submit" class="react-mapped-logout-button">Logout</button></form>
@endauth
</nav></header>
