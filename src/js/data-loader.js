// ============================================================================
// DATA LOADING
// ============================================================================

import { setTranslationsData, setBookData, setAuthorData } from './state.js';

/**
 * Generic fetch and parse JSON utility
 * @param {string} path - File path to fetch
 * @returns {object} Parsed JSON data
 * @throws {Error} If fetch fails or JSON is invalid
 */
async function fetchJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load data from ${path}`);
  }
  return response.json();
}

/**
 * Load book data from JSON file and update state
 * @param {string} path - Path to books JSON file
 * @throws {Error} If file cannot be loaded or structure is invalid
 */
export async function loadBookData(path = 'data/books.json') {
  try {
    const data = await fetchJSON(path);
    if (!data || !Array.isArray(data.books)) {
      throw new Error('Book data file is missing expected structure.');
    }
    setBookData(data.books);
  } catch (error) {
    if (error.message.includes('expected structure')) {
      throw error;
    }
    throw new Error(`Failed to load book data from ${path}`);
  }
}

/**
 * Load author data from JSON file and update state
 * @param {string} path - Path to author JSON file
 * @throws {Error} If file cannot be loaded or structure is invalid
 */
export async function loadAuthorData(path = 'data/author.json') {
  try {
    const data = await fetchJSON(path);
    if (!data || !data.author) {
      throw new Error('Author data file is missing expected structure.');
    }
    setAuthorData(data.author);
  } catch (error) {
    if (error.message.includes('expected structure')) {
      throw error;
    }
    throw new Error(`Failed to load author data from ${path}`);
  }
}

/**
 * Load translations data from JSON file and update state
 * @param {string} path - Path to translations JSON file
 * @throws {Error} If file cannot be loaded or structure is invalid
 */
export async function loadTranslationsData(path = 'data/translations.json') {
  try {
    const data = await fetchJSON(path);
    if (!data || typeof data !== 'object') {
      throw new Error('Translations data file is missing expected structure.');
    }
    setTranslationsData(data);
  } catch (error) {
    if (error.message.includes('expected structure')) {
      throw error;
    }
    throw new Error(`Failed to load translations data from ${path}`);
  }
}
