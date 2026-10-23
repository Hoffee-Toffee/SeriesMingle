<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Pool;

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

        $response = Http::acceptJson()->timeout(10)->get("{$this->baseUrl}/search/multi", [
            'api_key' => $this->apiKey,
            'query' => $query,
        ])->throw();

        return $response->json('results', []);
    }

    public function fetchMedia(string $type, string $id): array
    {
        if (empty($this->apiKey)) {
            return [];
        }

        abort_unless(in_array($type, ['tv', 'movie'], true), 404);

        if ($type === 'tv') {
            return $this->fetchTvShow($id);
        }

        $movie = Http::acceptJson()
            ->connectTimeout(3)
            ->timeout(10)
            ->get("{$this->baseUrl}/movie/{$id}", [
                'api_key' => $this->apiKey,
                'append_to_response' => 'external_ids',
                'language' => 'en-US',
            ])
            ->throw()
            ->json();

        abort_unless(is_array($movie), 502, 'Movie details could not be loaded.');

        return [
            'id' => $movie['id'] ?? (int) $id,
            'type' => 'movie',
            'title' => (string) ($movie['title'] ?? ''),
            'year' => substr((string) ($movie['release_date'] ?? ''), 0, 4),
            'runtime' => $movie['runtime'] ?? null,
            'overview' => (string) ($movie['overview'] ?? ''),
            'imdb_id' => $movie['external_ids']['imdb_id'] ?? null,
        ];
    }

    private function fetchTvShow(string $id): array
    {
        $show = Http::acceptJson()
            ->connectTimeout(3)
            ->timeout(10)
            ->get("{$this->baseUrl}/tv/{$id}", [
                'api_key' => $this->apiKey,
                'language' => 'en-US',
            ])
            ->throw()
            ->json();

        abort_unless(is_array($show), 502, 'TV details could not be loaded.');

        $numberOfSeasons = max((int) ($show['number_of_seasons'] ?? 0), 0);
        $seasonNumbers = $numberOfSeasons > 0 ? range(1, $numberOfSeasons) : [];
        $seasonResponses = Http::pool(function (Pool $pool) use ($id, $seasonNumbers): array {
            $requests = [];

            foreach ($seasonNumbers as $seasonNumber) {
                $requests[$seasonNumber] = $pool
                    ->as((string) $seasonNumber)
                    ->acceptJson()
                    ->connectTimeout(3)
                    ->timeout(10)
                    ->get("{$this->baseUrl}/tv/{$id}/season/{$seasonNumber}", [
                        'api_key' => $this->apiKey,
                        'language' => 'en-US',
                    ]);
            }

            return $requests;
        });

        $totalRuntime = 0;
        $episodesWithRuntime = 0;
        $seasons = [];

        foreach ($seasonResponses as $seasonNumber => $response) {
            $seasonData = $response->throw()->json();
            abort_unless(is_array($seasonData) && is_array($seasonData['episodes'] ?? null), 502, 'TV season details could not be loaded.');

            $episodes = array_map(function (array $episode) use (&$totalRuntime, &$episodesWithRuntime): array {
                $runtime = $episode['runtime'] ?? null;

                if (is_numeric($runtime) && (float) $runtime > 0) {
                    $totalRuntime += (float) $runtime;
                    $episodesWithRuntime++;
                }

                return [
                    'id' => $episode['id'] ?? null,
                    'type' => 'episode',
                    'title' => (string) ($episode['name'] ?? ''),
                    'runtime' => $runtime,
                    'episode' => (int) ($episode['episode_number'] ?? 0),
                    'overview' => (string) ($episode['overview'] ?? ''),
                    'imdb_id' => null,
                    'still_path' => $episode['still_path'] ?? null,
                ];
            }, $seasonData['episodes']);

            $seasons[] = [
                'season' => (int) ($seasonData['season_number'] ?? $seasonNumber),
                'episodes' => $episodes,
            ];
        }

        return [
            'id' => $show['id'] ?? (int) $id,
            'type' => 'tv',
            'title' => (string) ($show['name'] ?? ''),
            'year' => substr((string) ($show['first_air_date'] ?? ''), 0, 4),
            'episode_run_time' => (int) round($totalRuntime / max($episodesWithRuntime, 1)),
            'seasons' => $seasons,
            'imdb_pending' => true,
        ];
    }
}
