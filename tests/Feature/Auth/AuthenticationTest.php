<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response
            ->assertOk()
            ->assertSee('Sign In')
            ->assertSee('Continue with Google')
            ->assertSee('Create Account')
            ->assertSee('id="login"', false)
            ->assertDontSee('Sign in with Google to manage your viewing timelines');
    }

    public function test_google_login_shows_configuration_error_when_client_id_is_missing(): void
    {
        config([
            'services.google.client_id' => null,
            'services.google.client_secret' => 'configured-secret',
        ]);

        $response = $this->get(route('auth.google'));

        $response->assertRedirect(route('login'));
        $response->assertSessionHas(
            'error',
            'Google sign-in is not configured. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env file.'
        );
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }

    public function test_local_authentication_shortcut_logs_in_only_the_configured_local_account(): void
    {
        $user = User::factory()->create(['email' => 'tb59391@gmail.com']);

        config([
            'app.env' => 'local',
            'app.local_auth_email' => $user->email,
        ]);

        $response = $this->get('/__dev/auth');

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard'));
    }

    public function test_local_authentication_shortcut_is_unavailable_outside_local_environment(): void
    {
        User::factory()->create(['email' => 'tb59391@gmail.com']);

        config([
            'app.env' => 'production',
            'app.local_auth_email' => 'tb59391@gmail.com',
        ]);

        $this->get('/__dev/auth')->assertNotFound();
        $this->assertGuest();
    }
}
