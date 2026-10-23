<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response
            ->assertOk()
            ->assertSee('Create Account')
            ->assertSee('Confirm password')
            ->assertSee('Already have an account?')
            ->assertDontSee('Name');
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_users_can_register_without_a_name_field_like_the_react_form(): void
    {
        $response = $this->post('/register', [
            'email' => 'new.user@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'new.user@example.com',
            'name' => 'new.user',
        ]);
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
