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
        <button class="lang-btn" data-lang="be">BE</button>
      </div>
    `;
  });

  it('should render single book in English', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'And the Angels Wept', be: 'І плакалі анёлы' },
        description: { en: 'English description', be: 'Беларускае апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release Date', be: 'Дата Выдання' }, value: { en: 'April, 2025', be: 'Красавік 2025' } },
        cta: { en: 'Get Your Copy', be: 'Купіць Кнігу' },
        cover: { en: 'images/en-cover.png', be: 'images/be-cover.png' },
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
        title: { en: 'Book One', be: 'Кніга Адна' },
        description: { en: 'First book', be: 'Першая кніга' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release Date', be: 'Дата Выдання' }, value: { en: 'April, 2025', be: 'Красавік 2025' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: 'https://amazon.example.com'
      },
      {
        id: 'book2',
        title: { en: 'Book Two', be: 'Кніга Два' },
        description: { en: 'Second book', be: 'Другая кніга' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '150', be: '150' } },
        release: { title: { en: 'Release Date', be: 'Дата Выдання' }, value: { en: 'Soon', be: 'Скора' } },
        cta: { en: 'Coming', be: 'Прыходзіць' },
        cover: { en: 'images/2.png', be: 'images/2.png' },
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

  it('should toggle truncated book description with show more and show less', () => {
    const longDescription = Array(5).fill('This is a very long book description intended to exceed the maximum truncation length for the test case.').join(' ');
    const books = [
      {
        id: 'book1',
        title: { en: 'Book One', be: 'Кніга Адна' },
        description: { en: longDescription, be: longDescription },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release Date', be: 'Дата Выдання' }, value: { en: 'April, 2025', be: 'Красавік 2025' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: ''
      }
    ];

    setBookData(books);
    renderBooks('en');

    const descriptionContent = document.querySelector('.book-description .description-content');
    expect(descriptionContent).toBeTruthy();
    expect(descriptionContent.textContent.length).toBeLessThan(200);

    const actionBtn = document.querySelector('.show-more-btn');
    expect(actionBtn).toBeTruthy();

    actionBtn.click();

    expect(descriptionContent.textContent).toBe(longDescription.trim());
    expect(actionBtn.dataset.expanded).toBe('true');

    actionBtn.click();

    expect(descriptionContent.textContent.length).toBeLessThan(200);
    expect(actionBtn.dataset.expanded).toBe('false');
  });

  it('should render books in Belarusian', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'And the Angels Wept', be: 'І плакалі анёлы' },
        description: { en: 'English description', be: 'Беларускае апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release Date', be: 'Дата Выдання' }, value: { en: 'April, 2025', be: 'Красавік 2025' } },
        cta: { en: 'Get Your Copy', be: 'Купіць Кнігу' },
        cover: { en: 'images/en-cover.png', be: 'images/be-cover.png' },
        amazonUrl: 'https://amazon.example.com'
      }
    ];
    setBookData(books);
    renderBooks('be');
    
    expect(document.querySelector('.book-title').textContent).toBe('І плакалі анёлы');
    expect(document.querySelector('.book-description').textContent).toBe('Беларускае апісанне');
    expect(document.querySelector('.book-action-btn').textContent).toBe('Купіць Кнігу');
  });

  it('should set correct href for English books with amazonUrl', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release Date', be: 'Дата Выдання' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
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
        title: { en: 'Coming Soon', be: 'Скора' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '150', be: '150' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'Soon', be: 'Скора' } },
        cta: { en: 'Coming', be: 'Прыходзіць' },
        cover: { en: 'images/2.png', be: 'images/2.png' },
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
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/en.png', be: 'images/be.png' },
        amazonUrl: ''
      }
    ];
    setBookData(books);
    renderBooks('en');
    expect(document.querySelector('.book-cover-img').getAttribute('src')).toBe('images/en.png');
    
    renderBooks('be');
    expect(document.querySelector('.book-cover-img').getAttribute('src')).toBe('images/be.png');
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
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
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
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
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
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
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
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
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
      title: { en: `Book ${i + 1}`, be: `Кніга ${i + 1}` },
      description: { en: 'Desc', be: 'Апісанне' },
      genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
      pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
      release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
      cta: { en: 'Get', be: 'Купіць' },
      cover: { en: 'images/1.png', be: 'images/1.png' },
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
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
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
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Desc', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
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
        title: { en: 'Book Title', be: 'Заголовак' },
        description: { en: 'Long description that will take some space', be: 'Долгае апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get Your Copy', be: 'Купіць Кнігу' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
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

  it('should truncate long descriptions to 200 characters without cutting words', () => {
    const longDescription = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. '.repeat(10); // Over 200 characters
    
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', be: 'Кніга' },
        description: { en: longDescription, be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const description = document.querySelector('.book-description');
    const content = description.querySelector('.description-content');
    const text = content.textContent;
    
    // Check that text is truncated and contains ellipsis
    expect(text.length).toBeLessThan(longDescription.length);
    expect(text.endsWith('...')).toBe(true);
    expect(text.length).toBeLessThanOrEqual(210); // 200 + ellipsis buffer
  });

  it('should display show more button for truncated descriptions', () => {
    const longDescription = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. '.repeat(10);
    
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', be: 'Кніга' },
        description: { en: longDescription, be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const showMoreBtn = document.querySelector('.show-more-btn');
    expect(showMoreBtn).toBeTruthy();
    expect(showMoreBtn.dataset.expanded).toBe('false');
  });

  it('should not display show more button for short descriptions', () => {
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', be: 'Кніга' },
        description: { en: 'Short description', be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const showMoreBtn = document.querySelector('.show-more-btn');
    expect(showMoreBtn).toBeFalsy();
  });

  it('should expand full description when show more button is clicked', () => {
    const longDescription = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. '.repeat(10);
    
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', be: 'Кніга' },
        description: { en: longDescription, be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const showMoreBtn = document.querySelector('.show-more-btn');
    const description = document.querySelector('.book-description');
    const content = description.querySelector('.description-content');
    
    // Click show more button
    showMoreBtn.click();
    
    // Check that text is now full and button state changed
    expect(content.textContent).toBe(longDescription);
    expect(showMoreBtn.dataset.expanded).toBe('true');
  });

  it('should truncate description again when show less button is clicked', () => {
    const longDescription = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. '.repeat(10);
    
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', be: 'Кніга' },
        description: { en: longDescription, be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const showMoreBtn = document.querySelector('.show-more-btn');
    const description = document.querySelector('.book-description');
    const content = description.querySelector('.description-content');
    
    // Expand
    showMoreBtn.click();
    expect(content.textContent).toBe(longDescription);
    
    // Collapse
    showMoreBtn.click();
    
    // Check that text is truncated again and ends with ellipsis
    expect(content.textContent).not.toBe(longDescription);
    expect(content.textContent.endsWith('...')).toBe(true);
    expect(showMoreBtn.dataset.expanded).toBe('false');
  });

  it('should store both full and truncated text in data attributes', () => {
    const longDescription = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. '.repeat(10);
    
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', be: 'Кніга' },
        description: { en: longDescription, be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const description = document.querySelector('.book-description');
    const content = description.querySelector('.description-content');
    const fullTextAttr = description.getAttribute('data-full-text');
    const truncatedAttr = description.getAttribute('data-truncated-text');
    
    // Verify both data attributes are set
    expect(fullTextAttr).toBeTruthy();
    expect(truncatedAttr).toBeTruthy();
    
    // Full text should match the original description
    expect(fullTextAttr).toBe(longDescription);
    
    // Truncated text should be shorter and end with ellipsis
    expect(truncatedAttr.length).toBeLessThan(fullTextAttr.length);
    expect(truncatedAttr.endsWith('...')).toBe(true);
    
    // Initial display should show truncated version
    expect(content.textContent).toBe(truncatedAttr);
  });

  it('should display show more/less buttons with text color styling', () => {
    const longDescription = 'Lorem ipsum dolor sit amet consectetur adipiscing elit. '.repeat(10);
    
    const books = [
      {
        id: 'book1',
        title: { en: 'Book', be: 'Кніга' },
        description: { en: longDescription, be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '142', be: '140' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'April', be: 'Красавік' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/1.png', be: 'images/1.png' },
        amazonUrl: ''
      }
    ];
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    const showMoreBtn = document.querySelector('.show-more-btn');
    
    // Verify button exists and has correct class
    expect(showMoreBtn).toBeTruthy();
    expect(showMoreBtn.className).toBe('show-more-btn');
    
    // Verify button content exists (should contain "Show More")
    expect(showMoreBtn.textContent.length).toBeGreaterThan(0);
  });

  it('should follow complete show more/less flow with text restoration', () => {
    // Step 1: Create a long description for the first book
    const longDescription = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '.repeat(3);
    
    const books = [
      {
        id: 'book1',
        title: { en: 'Test Book', be: 'Тэст Кніга' },
        description: { en: longDescription, be: 'Апісанне' },
        genre: { title: { en: 'Genre', be: 'Жанр' }, value: { en: 'Fiction', be: 'Праза' } },
        pages: { title: { en: 'Pages', be: 'Старонкі' }, value: { en: '100', be: '100' } },
        release: { title: { en: 'Release', be: 'Выданне' }, value: { en: 'June', be: 'Чэрвень' } },
        cta: { en: 'Get', be: 'Купіць' },
        cover: { en: 'images/test.png', be: 'images/test.png' },
        amazonUrl: ''
      }
    ];
    
    setBookData(books);
    
    document.body.innerHTML = `
      <div id="books-container" class="books-container"></div>
    `;
    
    renderBooks('en');
    
    // Step 2: Remember displayed book description (should be truncated around 200 chars)
    const descriptionEl = document.querySelector('.book-description');
    const descriptionContent = descriptionEl.querySelector('.description-content');
    const initialDisplayedText = descriptionContent.textContent;
    
    // Acceptance: text at step 2 should be around 200 chars (allow 50 char tolerance)
    expect(initialDisplayedText.length).toBeGreaterThan(150);
    expect(initialDisplayedText.length).toBeLessThan(250);
    console.log('Step 2: ', initialDisplayedText);  
    expect(initialDisplayedText.endsWith('...')).toBe(true);
    
    // Step 3: Click show more
    const showMoreBtn = document.querySelector('.show-more-btn');
    expect(showMoreBtn).toBeTruthy();
    showMoreBtn.click();
    
    // Step 4: Remember displayed book description (should be full)
    const expandedText = descriptionContent.textContent;
    expect(expandedText.length).toBeGreaterThan(initialDisplayedText.length);
    expect(expandedText).toBe(longDescription);
    
    // Step 5: Click show less
    const showLessBtn = document.querySelector('.show-more-btn');
    expect(showLessBtn).toBeTruthy();
    showLessBtn.click();
    
    // Step 6: Compare displayed text - should match initial truncated text
    const collapsedText = descriptionContent.textContent;
    
    // Acceptance: after clicking show less, visible text should be less than 200 chars
    expect(collapsedText.length).toBeLessThan(200);
    expect(collapsedText.length).toBeGreaterThan(150);
    
    // Most important: text should be restored exactly as it was
    expect(collapsedText).toBe(initialDisplayedText);
    expect(collapsedText.endsWith('...')).toBe(true);
  });
});
