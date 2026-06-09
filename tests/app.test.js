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
        <button class="lang-btn" data-lang="be">BE</button>
      </div>
      <h1 data-i18n="hero.subtitle">Writer & Storyteller</h1>
      <h1 id="author-name">Author Name</h1>
      <p id="author-bio">Bio</p>
      <div id="books-container"></div>
    `;
    localStorage.clear();
  });

  it('should set active language button class', () => {
    const translations = { en: {}, be: {} };
    setTranslationsData(translations);
    setLanguage('be');
    
    const activeButton = document.querySelector('.lang-btn.active');
    expect(activeButton).not.toBeNull();
    expect(activeButton.dataset.lang).toBe('be');
  });

  it('should set document language attribute', () => {
    const translations = { en: {}, be: {} };
    setTranslationsData(translations);
    setLanguage('be');
    expect(document.documentElement.lang).toBe('be');
  });

  it('should save language to localStorage', () => {
    const translations = { en: {}, be: {} };
    setTranslationsData(translations);
    setLanguage('be');
    expect(localStorage.getItem('preferredLanguage')).toBe('be');
  });

  it('should switch all content when language changes', () => {
    const translations = {
      en: { 'hero.subtitle': 'Writer EN' },
      be: { 'hero.subtitle': 'Пісьменнік BE' }
    };
    const authorData = {
      name: { en: 'Ales', be: 'Алесь' },
      bio: { en: 'Bio EN', be: 'Баіа BE' }
    };
    const books = [
      {
        id: 'book1',
        title: { en: 'Book EN', be: 'Кніга BE' },
        description: { en: 'Desc EN', be: 'Апісанне BE' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/en.png', be: 'images/be.png' },
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

    setLanguage('be');
    expect(document.querySelector('[data-i18n="hero.subtitle"]').textContent).toBe('Пісьменнік BE');
    expect(document.getElementById('author-name').textContent).toBe('Алесь');
    expect(document.querySelector('.book-title').textContent).toBe('Кніга BE');
  });
});
