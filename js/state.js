// ============================================================================
// APPLICATION STATE
// ============================================================================

export const state = {
  books: [],
  author: null,
  translations: null
};

/**
 * Get reference to application state
 * @returns {object} Application state object
 */
export function getState() {
  return state;
}

/**
 * Set translations data in state
 * @param {object} data - Translations data
 */
export function setTranslationsData(data) {
  state.translations = data;
}

/**
 * Set book data in state
 * @param {array} data - Books array
 */
export function setBookData(data) {
  state.books = Array.isArray(data) ? data : [];
}

/**
 * Set author data in state
 * @param {object} data - Author data
 */
export function setAuthorData(data) {
  state.author = data;
}
