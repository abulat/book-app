import { beforeEach, describe, expect, it } from 'vitest';
import {
  renderBooks,
  getBookData,
  setBookData
} from '../src/js/app.js';

describe('Book rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="books-container"></div>
      <div class="language-switcher">
        <button class="lang-btn active" data-lang="en">EN</button>
        <button class="lang-btn" data-lang="by">BY</button>
      </div>
    `;
  });

  it('should render single book in English', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'And the Angels Wept', by: 'І плакалі анёлы' },
        description: { en: 'English description', by: 'Беларускае апісанне' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
        release: { title: { en: 'Release Date', by: 'Дата Выдання' }, value: { en: 'April, 2025', by: 'Красавік 2025' } },
        cta: { en: 'Get Your Copy', by: 'Купіць Кнігу' },
        cover: { en: 'images/en-cover.png', by: 'images/by-cover.png' },
        amazonUrl: 'https://amazon.example.com'
      }
    ];
    setBookData(books);
    renderBooks('en');
    
    expect(document.querySelector('.book-title').textContent).toBe('And the Angels Wept');
    expect(document.querySelector('.book-description').textContent).toBe('English description');
    expect(document.querySelector('.book-action-btn').textContent).toBe('Get Your Copy');
  });

  it('should render multiple books', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'Book One', by: 'Кніга Адна' },
        description: { en: 'First book', by: 'Першая кніга' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
        release: { title: { en: 'Release Date', by: 'Дата Выдання' }, value: { en: 'April, 2025', by: 'Красавік 2025' } },
        cta: { en: 'Get', by: 'Купіць' },
        cover: { en: 'images/1.png', by: 'images/1.png' },
        amazonUrl: 'https://amazon.example.com'
      },
      {
        id: 'book2',
        title: { en: 'Book Two', by: 'Кніга Два' },
        description: { en: 'Second book', by: 'Другая кніга' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '150', by: '150' } },
        release: { title: { en: 'Release Date', by: 'Дата Выдання' }, value: { en: 'Soon', by: 'Скора' } },
        cta: { en: 'Coming', by: 'Прыходзіць' },
        cover: { en: 'images/2.png', by: 'images/2.png' },
        amazonUrl: ''
      }
    ];
    setBookData(books);
    renderBooks('en');
    
    const bookTitles = document.querySelectorAll('.book-title');
    expect(bookTitles).toHaveLength(2);
    expect(bookTitles[0].textContent).toBe('Book One');
    expect(bookTitles[1].textContent).toBe('Book Two');
  });

  it('should render books in Belarusian', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'And the Angels Wept', by: 'І плакалі анёлы' },
        description: { en: 'English description', by: 'Беларускае апісанне' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
        release: { title: { en: 'Release Date', by: 'Дата Выдання' }, value: { en: 'April, 2025', by: 'Красавік 2025' } },
        cta: { en: 'Get Your Copy', by: 'Купіць Кнігу' },
        cover: { en: 'images/en-cover.png', by: 'images/by-cover.png' },
        amazonUrl: 'https://amazon.example.com'
      }
    ];
    setBookData(books);
    renderBooks('by');
    
    expect(document.querySelector('.book-title').textContent).toBe('І плакалі анёлы');
    expect(document.querySelector('.book-description').textContent).toBe('Беларускае апісанне');
    expect(document.querySelector('.book-action-btn').textContent).toBe('Купіць Кнігу');
  });

  it('should set correct href for English books with amazonUrl', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', by: 'Кніга' },
        description: { en: 'Desc', by: 'Апісанне' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
        release: { title: { en: 'Release Date', by: 'Дата Выдання' }, value: { en: 'April', by: 'Красавік' } },
        cta: { en: 'Get', by: 'Купіць' },
        cover: { en: 'images/1.png', by: 'images/1.png' },
        amazonUrl: 'https://amazon.example.com'
      }
    ];
    setBookData(books);
    renderBooks('en');
    
    expect(document.querySelector('.book-action-btn').getAttribute('href')).toBe('https://amazon.example.com');
  });

  it('should set contact href for books without amazonUrl', () => {
    const books = [
      {
        id: 'book2',
        title: { en: 'Coming Soon', by: 'Скора' },
        description: { en: 'Desc', by: 'Апісанне' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '150', by: '150' } },
        release: { title: { en: 'Release', by: 'Выданне' }, value: { en: 'Soon', by: 'Скора' } },
        cta: { en: 'Coming', by: 'Прыходзіць' },
        cover: { en: 'images/2.png', by: 'images/2.png' },
        amazonUrl: ''
      }
    ];
    setBookData(books);
    renderBooks('en');
    
    expect(document.querySelector('.book-action-btn').getAttribute('href')).toBe('#contact');
  });

  it('should set correct cover image', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', by: 'Кніга' },
        description: { en: 'Desc', by: 'Апісанне' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
        release: { title: { en: 'Release', by: 'Выданне' }, value: { en: 'April', by: 'Красавік' } },
        cta: { en: 'Get', by: 'Купіць' },
        cover: { en: 'images/en.png', by: 'images/by.png' },
        amazonUrl: ''
      }
    ];
    setBookData(books);
    renderBooks('en');
    expect(document.querySelector('.book-cover-img').getAttribute('src')).toBe('images/en.png');
    
    renderBooks('by');
    expect(document.querySelector('.book-cover-img').getAttribute('src')).toBe('images/by.png');
  });

  it('should get book data', () => {
    const books = [{ id: 'book1' }];
    setBookData(books);
    expect(getBookData()).toEqual(books);
  });

  it('should handle empty books array', () => {
    setBookData([]);
    renderBooks('en');
    expect(document.getElementById('books-container').innerHTML).toBe('');
  });

  it('should not render if books container does not exist', () => {
    document.body.innerHTML = '';
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', by: 'Кніга' },
        description: { en: 'Desc', by: 'Апісанне' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
        release: { title: { en: 'Release', by: 'Выданне' }, value: { en: 'April', by: 'Красавік' } },
        cta: { en: 'Get', by: 'Купіць' },
        cover: { en: 'images/1.png', by: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    setBookData(books);
    expect(() => renderBooks('en')).not.toThrow();
  });
});
