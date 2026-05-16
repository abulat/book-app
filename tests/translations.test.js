import { beforeEach, describe, expect, it } from 'vitest';
import {
  getDefaultLanguage,
  getTranslation,
  applyTranslations,
  getCurrentLang,
  getKeyedTranslations,
  setTranslationsData
} from '../src/js/app.js';

describe('Language utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="language-switcher">
        <button class="lang-btn active" data-lang="en">EN</button>
        <button class="lang-btn" data-lang="by">BY</button>
      </div>
      <h1 data-i18n="hero.subtitle">Writer & Storyteller</h1>
      <h2 data-i18n="books.title">Published Works</h2>
    `;
    localStorage.clear();
  });

  it('should return saved language preference', () => {
    expect(getDefaultLanguage('en', 'be-BY')).toBe('en');
  });

  it('should use Belarusian for ru/be locale when no saved preference exists', () => {
    expect(getDefaultLanguage(null, 'ru-RU')).toBe('by');
    expect(getDefaultLanguage(null, 'be-BY')).toBe('by');
  });

  it('should default to English when no preference and non-CIS locale', () => {
    expect(getDefaultLanguage(null, 'en-US')).toBe('en');
    expect(getDefaultLanguage(null, 'de-DE')).toBe('en');
  });

  it('should get translation for valid key and language', () => {
    const translations = {
      en: { 'test.key': 'Hello' },
      by: { 'test.key': 'Привет' }
    };
    setTranslationsData(translations);
    expect(getTranslation('test.key', 'en')).toBe('Hello');
    expect(getTranslation('test.key', 'by')).toBe('Привет');
  });

  it('should fallback to English when language not found', () => {
    const translations = {
      en: { 'test.key': 'Hello' },
      by: {}
    };
    setTranslationsData(translations);
    expect(getTranslation('test.key', 'by')).toBe('Hello');
  });

  it('should return empty string for missing key', () => {
    const translations = { en: {}, by: {} };
    setTranslationsData(translations);
    expect(getTranslation('nonexistent.key', 'en')).toBe('');
  });

  it('should apply translations to elements with data-i18n attributes', () => {
    const translations = {
      en: { 'hero.subtitle': 'Writer & Storyteller' },
      by: { 'hero.subtitle': 'Пісьменнік і Апавядальнік' }
    };
    setTranslationsData(translations);
    applyTranslations('by');
    
    expect(document.querySelector('[data-i18n="hero.subtitle"]').textContent).toBe('Пісьменнік і Апавядальнік');
  });

  it('should update document title', () => {
    const translations = {
      en: { 'site.title': 'Test Site EN' },
      by: { 'site.title': 'Тест BY' }
    };
    setTranslationsData(translations);
    applyTranslations('en');
    expect(document.title).toBe('Test Site EN');
  });

  it('should return current language from localStorage', () => {
    localStorage.setItem('preferredLanguage', 'by');
    expect(getCurrentLang()).toBe('by');
  });

  it('should return English as default current language', () => {
    localStorage.clear();
    expect(getCurrentLang()).toBe('en');
  });

  it('should get keyed translations for language', () => {
    const translations = {
      en: { 'nav.home': 'Home', 'nav.about': 'About' },
      by: { 'nav.home': 'Галоўная', 'nav.about': 'Пра' }
    };
    setTranslationsData(translations);
    
    const enTranslations = getKeyedTranslations('en');
    expect(enTranslations['nav.home']).toBe('Home');
    expect(enTranslations['nav.about']).toBe('About');
  });
});
