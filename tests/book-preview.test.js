import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  renderBooks,
  setBookData
} from '../src/js/app.js';

describe('Book preview rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="books-container"></div>
      <div class="language-switcher">
        <button class="lang-btn active" data-lang="en">EN</button>
        <button class="lang-btn" data-lang="be">BE</button>
      </div>
    `;
  });

  it('should render an ebook preview link and open a modal with ebook content', () => {
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
        ebook: 'A preview of the ebook content.\nThis text should appear in the modal.',
        amazonUrl: ''
      }
    ];

    setBookData(books);
    renderBooks('en');

    const previewLink = document.querySelector('.ebook-preview-link');
    expect(previewLink).toBeTruthy();
    expect(previewLink.textContent).toContain('Read preview');

    previewLink.click();

    const modal = document.querySelector('.ebook-preview-modal');
    expect(modal).toBeTruthy();
    expect(modal.textContent).toContain('A preview of the ebook content.');
  });

  it('should render ebook preview links only for the active language when ebook data is localized', () => {
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
        ebook: { en: 'English preview text', be: '' },
        amazonUrl: ''
      }
    ];

    setBookData(books);
    renderBooks('en');

    expect(document.querySelector('.ebook-preview-link')).toBeTruthy();

    renderBooks('be');

    expect(document.querySelector('.ebook-preview-link')).toBeNull();
  });

  it('should render EPUB previews by calling display after renderTo', async () => {
    const display = vi.fn().mockResolvedValue();
    const renderTo = vi.fn(() => ({ display }));
    const open = vi.fn().mockResolvedValue();
    const epubCtor = vi.fn(() => ({ open, renderTo, spine: { items: [{ href: 'chapter1' }] } }));

    const originalEpub = window.ePub;
    window.ePub = epubCtor;

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
        ebook: 'https://example.com/book.epub',
        amazonUrl: ''
      }
    ];

    setBookData(books);
    renderBooks('en');

    document.querySelector('.ebook-preview-link').click();
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(epubCtor).toHaveBeenCalledWith('https://example.com/book.epub', { openAs: 'epub' });
    expect(renderTo).toHaveBeenCalledWith(expect.any(HTMLElement), { width: '100%', height: '700px', flow: 'scrolled-doc' });
    expect(display).toHaveBeenCalledWith('chapter1');

    window.ePub = originalEpub;
  });
});
