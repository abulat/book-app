// ============================================================================
// BOOK RENDERING
// ============================================================================

import { getState } from './state.js';

const DOM = {
  booksContainer: 'books-container',
  contactSection: 'contact',
  bookActionBtn: '.book-action-btn'
};

/**
 * Get a localized value from a nested object with language fallback
 * @param {object} obj - Object with language keys (en, by, etc.)
 * @param {string} lang - Target language code
 * @returns {string|null} Localized value or null if not found
 */
function getLocalizedValue(obj, lang) {
  if (!obj) return null;
  return obj[lang] || obj.en || null;
}

/**
 * Build book content HTML structure
 * @param {object} book - Book data object
 * @param {string} lang - Language code
 * @returns {string} Book HTML markup
 */
function buildBookHTML(book, lang) {
  const get = (field) => getLocalizedValue(field, lang) || '';
  
  return `
    <div class="book-cover">
      <div class="cover-placeholder">
        <img src="${get(book.cover) || 'images/placeholder-cover.png'}" alt="${get(book.title)}" class="book-cover-img">
      </div>
    </div>
    <div class="book-details">
      <h3 class="book-title">${get(book.title) || 'Book Title'}</h3>
      <p class="book-description">${get(book.description)}</p>
      <div class="book-features">
        <div class="feature">
          <h4 class="book-genre-title">${get(book.genre?.title) || 'Genre'}</h4>
          <p class="book-genre-value">${get(book.genre?.value)}</p>
        </div>
        <div class="feature">
          <h4 class="book-pages-title">${get(book.pages?.title) || 'Pages'}</h4>
          <p class="book-pages-value">${get(book.pages?.value)}</p>
        </div>
        <div class="feature">
          <h4 class="book-release-title">${get(book.release?.title) || 'Release Date'}</h4>
          <p class="book-release-value">${get(book.release?.value)}</p>
        </div>
      </div>
      <a href="${lang === 'en' && book.amazonUrl ? book.amazonUrl : '#contact'}" class="cta-button book-action-btn">${get(book.cta) || 'Get Your Copy'}</a>
    </div>
  `;
}

/**
 * Create a book DOM element
 * @param {object} book - Book data object
 * @param {string} lang - Language code
 * @returns {HTMLElement} Book element
 */
function createBookElement(book, lang) {
  const div = document.createElement('div');
  div.className = 'book-content';
  div.dataset.bookId = book.id;
  div.innerHTML = buildBookHTML(book, lang);
  return div;
}

/**
 * Open external link in new window
 * @param {HTMLElement} btn - Button element
 */
function handleExternalLink(btn) {
  const href = btn.getAttribute('href');
  if (href.startsWith('http')) {
    window.open(href, '_blank');
  }
}

/**
 * Scroll to contact section
 * @param {HTMLElement} btn - Button element
 */
function handleContactLink(btn) {
  const contactSection = document.getElementById(DOM.contactSection);
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Attach click handlers to book action buttons
 */
function attachBookActionHandlers() {
  document.querySelectorAll(DOM.bookActionBtn).forEach(btn => {
    btn.addEventListener('click', event => {
      const href = btn.getAttribute('href');
      
      if (href.startsWith('http')) {
        event.preventDefault();
        handleExternalLink(btn);
      } else if (href === '#contact') {
        event.preventDefault();
        handleContactLink(btn);
      }
    });
  });
}

/**
 * Render all books for specified language
 * @param {string} lang - Language code
 */
export function renderBooks(lang) {
  const state = getState();
  if (!Array.isArray(state.books) || state.books.length === 0) {
    return;
  }

  const container = document.getElementById(DOM.booksContainer);
  if (!container) {
    return;
  }

  container.innerHTML = '';
  state.books.forEach(book => {
    container.appendChild(createBookElement(book, lang)).appendChild(document.createElement('hr'));
  });

  attachBookActionHandlers();
}

/**
 * Get books data from state
 * @returns {array} Books array
 */
export function getBookData() {
  const state = getState();
  return state.books;
}
