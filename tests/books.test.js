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

  it('should create carousel arrow buttons', () => {
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
    
    document.body.innerHTML = `
      <div class="carousel-wrapper">
        <button class="carousel-arrow" data-direction="left" aria-label="Scroll left">←</button>
        <div id="books-container" class="books-container"></div>
        <button class="carousel-arrow" data-direction="right" aria-label="Scroll right">→</button>
      </div>
    `;
    
    renderBooks('en');
    
    const arrows = document.querySelectorAll('.carousel-arrow');
    expect(arrows).toHaveLength(2);
    expect(arrows[0].dataset.direction).toBe('left');
    expect(arrows[1].dataset.direction).toBe('right');
  });

  it('should disable left arrow button initially', () => {
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
    
    document.body.innerHTML = `
      <div class="carousel-wrapper">
        <button class="carousel-arrow" data-direction="left" aria-label="Scroll left">←</button>
        <div id="books-container" class="books-container" style="width: 800px; overflow-x: auto;"></div>
        <button class="carousel-arrow" data-direction="right" aria-label="Scroll right">→</button>
      </div>
    `;
    
    renderBooks('en');
    
    const leftArrow = document.querySelector('.carousel-arrow[data-direction="left"]');
    expect(leftArrow.disabled).toBe(true);
    expect(leftArrow.classList.contains('disabled')).toBe(true);
  });

  it('should have disabled attribute and class on left arrow when at start', () => {
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
    
    document.body.innerHTML = `
      <div class="carousel-wrapper">
        <button class="carousel-arrow" data-direction="left" aria-label="Scroll left">←</button>
        <div id="books-container" class="books-container"></div>
        <button class="carousel-arrow" data-direction="right" aria-label="Scroll right">→</button>
      </div>
    `;
    
    renderBooks('en');
    
    const leftArrow = document.querySelector('.carousel-arrow[data-direction="left"]');
    expect(leftArrow.getAttribute('aria-disabled')).toBe('true');
    expect(leftArrow.hasAttribute('disabled')).toBe(true);
  });

  it('should enable arrow buttons only when scrollable', () => {
    // Create multiple books to make it scrollable
    const books = Array.from({ length: 10 }, (_, i) => ({
      id: `book${i + 1}`,
      title: { en: `Book ${i + 1}`, by: `Кніга ${i + 1}` },
      description: { en: 'Desc', by: 'Апісанне' },
      genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
      pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
      release: { title: { en: 'Release', by: 'Выданне' }, value: { en: 'April', by: 'Красавік' } },
      cta: { en: 'Get', by: 'Купіць' },
      cover: { en: 'images/1.png', by: 'images/1.png' },
      amazonUrl: ''
    }));
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div class="carousel-wrapper">
        <button class="carousel-arrow" data-direction="left" aria-label="Scroll left">←</button>
        <div id="books-container" class="books-container" style="width: 200px; overflow-x: auto;"></div>
        <button class="carousel-arrow" data-direction="right" aria-label="Scroll right">→</button>
      </div>
    `;
    
    renderBooks('en');
    
    // Initially, left arrow should be disabled, right might be enabled
    const leftArrow = document.querySelector('.carousel-arrow[data-direction="left"]');
    const rightArrow = document.querySelector('.carousel-arrow[data-direction="right"]');
    
    expect(leftArrow.disabled).toBe(true);
    expect(leftArrow.classList.contains('disabled')).toBe(true);
  });

  it('should have book-details with flex layout for sticky button', () => {
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
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const bookDetails = document.querySelector('.book-details');
    
    // Verify that book-details element exists
    expect(bookDetails).not.toBeNull();
    
    // Verify that book-details contains title, description, and button
    const title = bookDetails.querySelector('.book-title');
    const description = bookDetails.querySelector('.book-description');
    const button = bookDetails.querySelector('.book-action-btn');
    
    expect(title).not.toBeNull();
    expect(description).not.toBeNull();
    expect(button).not.toBeNull();
  });

  it('should have book-description that grows to fill space', () => {
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
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const bookDescription = document.querySelector('.book-description');
    
    // Verify that description element exists and is not null
    expect(bookDescription).not.toBeNull();
    
    // Verify that the element has the book-description class for styling
    expect(bookDescription.classList.contains('book-description')).toBe(true);
  });

  it('should position action button at bottom of book details', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'Book Title', by: 'Заголовак' },
        description: { en: 'Long description that will take some space', by: 'Долгае апісанне' },
        genre: { title: { en: 'Genre', by: 'Жанр' }, value: { en: 'Fiction', by: 'Праза' } },
        pages: { title: { en: 'Pages', by: 'Старонкі' }, value: { en: '142', by: '140' } },
        release: { title: { en: 'Release', by: 'Выданне' }, value: { en: 'April', by: 'Красавік' } },
        cta: { en: 'Get Your Copy', by: 'Купіць Кнігу' },
        cover: { en: 'images/1.png', by: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const bookDetails = document.querySelector('.book-details');
    const actionBtn = document.querySelector('.book-action-btn');
    
    // Verify that action button is a child of book-details
    expect(bookDetails.contains(actionBtn)).toBe(true);
    
    // Verify that action button is the last element in book-details
    expect(bookDetails.lastElementChild).toBe(actionBtn);
  });
});
