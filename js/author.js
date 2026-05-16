// ============================================================================
// AUTHOR RENDERING
// ============================================================================

import { getState } from './state.js';

const DOM = {
  siteAuthorName: 'site-author-name',
  authorName: 'author-name',
  authorBio: 'author-bio',
};

/**
 * Update text content of an element by ID
 * @param {string} elementId - DOM element ID
 * @param {string} value - Text content to set
 */
function updateElementText(elementId, value) {
  const element = document.getElementById(elementId);
  if (element && value) {
    element.textContent = value;
  }
}

/**
 * Render author information for specified language
 * @param {string} lang - Language code
 */
export function renderAuthor(lang) {
  const state = getState();
  if (!state.author) {
    return;
  }

  const getLocalizedText = (obj) => obj?.[lang] || obj?.en || '';

  updateElementText(DOM.siteAuthorName, getLocalizedText(state.author.name));
  updateElementText(DOM.authorName, getLocalizedText(state.author.name));
  updateElementText(DOM.authorBio, getLocalizedText(state.author.bio));
}

/**
 * Get author data from state
 * @returns {object} Author data object
 */
export function getAuthorData() {
  const state = getState();
  return state.author;
}
