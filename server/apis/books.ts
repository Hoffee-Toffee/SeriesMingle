
import fetch from 'node-fetch';
import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

// Helper to determine density
function getDensity(categories: string[] = []): number {
  const cats = categories.map(c => c.toLowerCase());
  if (cats.includes('medical')) return 300;
  if (cats.includes('graphic novel')) return 150;
  if (cats.includes('comic')) return 100;
  return 250;
}

// Helper to extract book info
function extractBookInfo(item: any) {
  const volume = item.volumeInfo || {};
  const categories = volume.categories || [];
  const density = getDensity(categories);
  console.log(item);
  return {
    id: item.id,
    title: volume.title,
    authors: volume.authors || [],
    description: volume.description || '',
    publishedYear: volume.publishedDate ? String(volume.publishedDate).slice(0, 4) : '',
    pageCount: volume.pageCount || null,
    categories,
    density,
    media_type: 'book',
    selfLink: item.selfLink,
    thumbnail: volume.imageLinks && volume.imageLinks.thumbnail ? volume.imageLinks.thumbnail : '',
  };
}

// Search books
router.get('/search/books', async (req, res) => {
  const q = req.query.q;
  if (!q || typeof q !== 'string') return res.status(400).json({ error: 'Missing query' });
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}${apiKey ? `&key=${apiKey}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.items) return res.json([]);
    const results = data.items.map(extractBookInfo);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books', details: err });
  }
});

// Get book by selfLink
router.get('/book', async (req, res) => {
  const selfLink = req.query.selfLink;
  if (!selfLink || typeof selfLink !== 'string') return res.status(400).json({ error: 'Missing selfLink' });
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = apiKey ? `${selfLink}?key=${apiKey}` : selfLink;
    const response = await fetch(url);
    const item = await response.json();
    const book = extractBookInfo(item);
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book', details: err });
  }
});

export default router;
