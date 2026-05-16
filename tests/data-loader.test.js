import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  loadBookData,
  loadAuthorData,
  loadTranslationsData,
  getBookData,
  getAuthorData,
  getKeyedTranslations,
  setBookData,
  setAuthorData,
  setTranslationsData
} from '../src/js/app.js';

describe('Data loading functions', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    // Reset state
    setBookData([]);
    setAuthorData(null);
    setTranslationsData(null);
  });

  it('should load book data from JSON file', async () => {
    const mockData = { books: [{ id: 'book1', title: { en: 'Test' } }] };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    await loadBookData('data/books.json');
    expect(getBookData()).toEqual(mockData.books);
  });

  it('should load author data from JSON file', async () => {
    const mockData = { author: { name: { en: 'Test Author' } } };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    await loadAuthorData('data/author.json');
    expect(getAuthorData()).toEqual(mockData.author);
  });

  it('should load translations data from JSON file', async () => {
    const mockData = { en: { 'site.title': 'Test' } };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    await loadTranslationsData('data/translations.json');
    expect(getKeyedTranslations('en')).toEqual({ 'site.title': 'Test' });
  });

  it('should throw error if book data fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });
    
    await expect(loadBookData()).rejects.toThrow('Failed to load book data');
  });

  it('should throw error if author data fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });
    
    await expect(loadAuthorData()).rejects.toThrow('Failed to load author data');
  });

  it('should throw error if translations data fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });
    
    await expect(loadTranslationsData()).rejects.toThrow('Failed to load translations data');
  });

  it('should throw error if book data structure is invalid', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: 'structure' })
    });

    await expect(loadBookData()).rejects.toThrow('Book data file is missing expected structure');
  });

  it('should throw error if author data structure is invalid', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: 'structure' })
    });

    await expect(loadAuthorData()).rejects.toThrow('Author data file is missing expected structure');
  });

  it('should throw error if translations data structure is invalid', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => null
    });

    await expect(loadTranslationsData()).rejects.toThrow('Translations data file is missing expected structure');
  });
});
