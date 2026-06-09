// ============================================================================
// APP - ORCHESTRATION & INITIALIZATION
// ============================================================================

import { getState, setTranslationsData, setBookData, setAuthorData } from './state.js';
import { applyTranslations } from './translations.js';
import { renderAuthor } from './author.js';
import { renderBooks } from './books.js';

const DOM = {
  langButtons: '.lang-btn',
};

// ============================================================================
// LANGUAGE ORCHESTRATION
// ============================================================================

/**
 * Change application language and update all content
 * @param {string} lang - Language code (en, be)
 */
export function setLanguage(lang) {
  const state = getState();
  if (!state.translations || !state.translations[lang]) {
    console.error(`Language ${lang} not found in translations`);
    return;
  }

  document.documentElement.lang = lang;
  document.querySelectorAll(DOM.langButtons).forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  applyTranslations(lang);
  renderAuthor(lang);
  renderBooks(lang);
  localStorage.setItem('preferredLanguage', lang);
}

// ============================================================================
// RE-EXPORTS FROM MODULES
// ============================================================================

// State management
export { getState, setTranslationsData, setBookData, setAuthorData } from './state.js';

// Translations
export { getDefaultLanguage, getTranslation, getCurrentLang, getKeyedTranslations, applyTranslations } from './translations.js';

// Author
export { renderAuthor, getAuthorData } from './author.js';

// Books
export { renderBooks, getBookData } from './books.js';

// Data Loading
export { loadBookData, loadAuthorData, loadTranslationsData } from './data-loader.js';
