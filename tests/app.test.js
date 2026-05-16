import { beforeEach, describe, expect, it } from 'vitest';
import {
  setTranslationsData,
  setBookData,
  setAuthorData,
  getKeyedTranslations,
  getBookData,
  getAuthorData,
  setLanguage
} from '../src/js/app.js';

describe('Data setters and getters', () => {
  it('should set and get translations data', () => {
    const data = { en: { test: 'value' } };
    setTranslationsData(data);
    expect(getKeyedTranslations('en')).toEqual({ test: 'value' });
  });

  it('should set and get book data', () => {
    const books = [{ id: 'book1' }];
    setBookData(books);
    expect(getBookData()).toEqual(books);
  });

  it('should set and get author data', () => {
    const author = { name: { en: 'Test' } };
    setAuthorData(author);
    expect(getAuthorData()).toEqual(author);
  });

  it('should convert non-array book data to empty array', () => {
    setBookData(null);
    expect(getBookData()).toEqual([]);
  });
});

describe('Language switching orchestration', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="language-switcher">
        <button class="lang-btn active" data-lang="en">EN</button>
        <button class="lang-btn" data-lang="by">BY</button>
      </div>
      <h1 data-i18n="hero.subtitle">Writer & Storyteller</h1>
      <h1 id="author-name">Author Name</h1>
      <p id="author-bio">Bio</p>
      <div id="books-container"></div>
    `;
    localStorage.clear();
  });

  it('should set active language button class', () => {
    const translations = { en: {}, by: {} };
    setTranslationsData(translations);
    setLanguage('by');
    
    const activeButton = document.querySelector('.lang-btn.active');
    expect(activeButton).not.toBeNull();
    expect(activeButton.dataset.lang).toBe('by');
  });

  it('should set document language attribute', () => {
    const translations = { en: {}, by: {} };
    setTranslationsData(translations);
    setLanguage('by');
    expect(document.documentElement.lang).toBe('by');
  });

  it('should save language to localStorage', () => {
    const translations = { en: {}, by: {} };
    setTranslationsData(translations);
    setLanguage('by');
    expect(localStorage.getItem('preferredLanguage')).toBe('by');
  });

  it('should switch all content when language changes', () => {
    const translations = {
      en: { 'hero.subtitle': 'Writer EN' },
      by: { 'hero.subtitle': 'Пісьменнік BY' }
    };
    const authorData = {
      name: { en: 'Ales', by: 'Алесь' },
      bio: { en: 'Bio EN', by: 'Баіа BY' }
    };
    const books = [
      {
        id: 'book1',
        title: { en: 'Book EN', by: 'Кніга BY' },
        description: { en: 'Desc EN', by: 'Апісанне BY' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
        release: { title: { en: 'Release', by: 'Выданне' }, value: { en: 'April', by: 'Красавік' } },
        cta: { en: 'Get', by: 'Купіць' },
        cover: { en: 'images/en.png', by: 'images/by.png' },
        amazonUrl: ''
      }
    ];

    setTranslationsData(translations);
    setAuthorData(authorData);
    setBookData(books);

    setLanguage('en');
    expect(document.querySelector('[data-i18n="hero.subtitle"]').textContent).toBe('Writer EN');
    expect(document.getElementById('author-name').textContent).toBe('Ales');
    expect(document.querySelector('.book-title').textContent).toBe('Book EN');

    setLanguage('by');
    expect(document.querySelector('[data-i18n="hero.subtitle"]').textContent).toBe('Пісьменнік BY');
    expect(document.getElementById('author-name').textContent).toBe('Алесь');
    expect(document.querySelector('.book-title').textContent).toBe('Кніга BY');
  });
});
