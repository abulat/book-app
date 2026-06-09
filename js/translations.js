// ============================================================================
// TRANSLATIONS & LANGUAGE MANAGEMENT
// ============================================================================

import { getState } from './state.js';

const DOM = {
  langButtons: '.lang-btn',
};

/**
 * Detect default language based on saved preference or browser locale
 * @param {string} savedLang - Previously saved language preference
 * @param {string} userLang - Browser language/locale
 * @returns {string} Language code (en or be)
 */
export function getDefaultLanguage(savedLang, userLang = '') {
  if (savedLang) {
    return savedLang;
  }

  if (/^(be)/.test((userLang || '').toLowerCase())) {
    return 'be';
  }

  return 'en';
}

/**
 * Get translated string for a key in specified language
 * @param {string} key - Translation key (dot notation supported)
 * @param {string} lang - Language code
 * @returns {string} Translated text or empty string
 */
export function getTranslation(key, lang) {
  const state = getState();
  if (!state.translations) {
    return '';
  }
  return state.translations?.[lang]?.[key] || state.translations?.en?.[key] || '';
}

/**
 * Apply all translations to DOM elements with data-i18n attribute
 * @param {string} lang - Language code
 */
export function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const text = getTranslation(key, lang);
    if (text) {
      element.textContent = text;
    }
  });

  const title = getTranslation('site.title', lang);
  if (title) {
    document.title = title;
  }
}

/**
 * Get current language from localStorage
 * @returns {string} Current language code
 */
export function getCurrentLang() {
  return localStorage.getItem('preferredLanguage') || 'en';
}

/**
 * Get all translations for a language
 * @param {string} lang - Language code
 * @returns {object} Translation object for language
 */
export function getKeyedTranslations(lang) {
  const state = getState();
  return state.translations?.[lang] || {};
}
