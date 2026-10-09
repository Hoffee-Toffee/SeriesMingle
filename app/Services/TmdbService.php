<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TmdbService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://api.themoviedb.org/3';

    public function __construct()
    {
        $this->apiKey = config('services.tmdb.key', '');
    }

    public function search(string $query): array
    {
        if (empty(trim($query)) || empty($this->apiKey)) {
            return [];
        }

        $response = Http::get("{$this->baseUrl}/search/multi", [
            'api_key' => $this->apiKey,
            'query' => $query,
        ]);

        if ($response->successful()) {
            return $response->json()['results'] ?? [];
        }

        return [];
    }

    public function fetchMedia(string $type, string $id): array
    {
        if (empty($this->apiKey)) {
            return [];
        }

        $response = Http::get("{$this->baseUrl}/{$type}/{$id}", [
            'api_key' => $this->apiKey,
            'append_to_response' => 'credits',
        ]);

        return $response->successful() ? $response->json() : [];
    }
}
