<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GoogleBooksService
{
    private const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

    public function search(string $query): array
    {
        $response = Http::acceptJson()
            ->timeout(10)
            ->get(self::BASE_URL, array_filter([
                'q' => $query,
                'key' => config('services.google_books.key'),
            ]))
            ->throw();

        $items = $response->json('items', []);

        return collect(is_array($items) ? $items : [])
            ->map(fn (array $item) => $this->mapVolume($item))
            ->filter(fn (array $book) => $book['id'] !== '' && $book['title'] !== '')
            ->values()
            ->all();
    }

    private function mapVolume(array $item): array
    {
        $volume = $item['volumeInfo'] ?? [];
        $categories = is_array($volume['categories'] ?? null) ? $volume['categories'] : [];
        $normalizedCategories = array_map('mb_strtolower', $categories);
        $publishedDate = (string) ($volume['publishedDate'] ?? '');

        return [
            'id' => (string) ($item['id'] ?? ''),
            'type' => 'book',
            'media_type' => 'book',
            'title' => (string) ($volume['title'] ?? ''),
            'authors' => is_array($volume['authors'] ?? null) ? $volume['authors'] : [],
            'description' => (string) ($volume['description'] ?? ''),
            'year' => substr($publishedDate, 0, 4),
            'publishedYear' => substr($publishedDate, 0, 4),
            'pageCount' => isset($volume['pageCount']) ? (int) $volume['pageCount'] : null,
            'categories' => $categories,
            'density' => $this->density($normalizedCategories),
            'selfLink' => $item['selfLink'] ?? null,
            'thumbnail' => $volume['imageLinks']['thumbnail'] ?? '',
        ];
    }

    private function density(array $categories): int
    {
        if (in_array('medical', $categories, true)) {
            return 300;
        }

        if (in_array('graphic novel', $categories, true)) {
            return 150;
        }

        if (in_array('comic', $categories, true)) {
            return 100;
        }

        return 250;
    }
}
