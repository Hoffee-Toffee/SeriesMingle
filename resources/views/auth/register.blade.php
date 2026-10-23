<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Create Account | SeriesMingle</title>
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/app.css') }}">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/login.css') }}">
    @vite(['resources/js/app.js'])
</head>
<body>
    <div id="app">
        <div id="login">
            <main>
                <img src="{{ asset('react-mapped/assets/icons/icon.png') }}" alt="Series Mingle logo" id="logo">
                <h1><span>Series</span><span>Mingle</span></h1>
                <form method="POST" action="{{ route('register') }}">
                    @csrf
                    <fieldset id="login-form">
                        <legend><h2>Create Account</h2></legend>
                        <input type="email" id="email" name="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                <input type="password" id="password" name="password" placeholder="Password" maxlength="30" required autocomplete="new-password">
                <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm password" maxlength="30" required autocomplete="new-password">
                        @if(session('error') || $errors->any())
                <p class="error-message">{{ session('error') ?? $errors->first() }}</p>
            @endif
                        <button id="submit" type="submit" value="Submit"><h3>Create Account</h3></button>
                        <div class="separator">
                            <hr class="line">
                            <span class="text">or</span>
                            <hr class="line">
                        </div>
                        <a href="{{ route('auth.google') }}" class="google-sign-in">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0//images/auth/google.svg" alt="Google logo">
                <span>Continue with Google</span>
            </a>
                    </fieldset>
                </form>
                <span>Already have an account? <a href="{{ route('login') }}">Sign In</a></span>
            </main>
        </div>
    </div>
</body>
</html>
