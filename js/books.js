// ============================================================================
// BOOK RENDERING
// ============================================================================

import { getState } from './state.js';

const DOM = {
  booksContainer: 'books-container',
  contactSection: 'contact',
  bookActionBtn: '.book-action-btn',
  booksScrollWrapper: 'books-scroll-wrapper'
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
  const coverSrc = get(book.cover) || 'images/placeholder-cover.png';
  
  // Format genre values as tags
  const genreValue = get(book.genre?.value) || '';
  const genreTags = genreValue
    .split(',')
    .map(tag => `<span class="genre-tag">${tag.trim()}</span>`)
    .join('');
  
  return `
    <div class="book-cover">
      <div class="cover-wrapper">
        <div class="cover-placeholder">
          <img src="${coverSrc}" alt="${get(book.title)}" class="book-cover-img">
        </div>
        <div class="cover-popup-overlay">
          <img src="${coverSrc}" alt="${get(book.title)}" class="cover-popup-img">
        </div>
      </div>
      <div class="cover-metadata">
        <div class="metadata-item">
          <h4 class="metadata-label">${get(book.genre?.title) || 'Genre'}</h4>
          <p class="metadata-value">${genreTags}</p>
        </div>
        <div class="metadata-item">
          <h4 class="metadata-label">${get(book.pages?.title) || 'Pages'}</h4>
          <p class="metadata-value">${get(book.pages?.value)}</p>
        </div>
        <div class="metadata-item">
          <h4 class="metadata-label">${get(book.release?.title) || 'Release Date'}</h4>
          <p class="metadata-value">${get(book.release?.value)}</p>
        </div>
      </div>
    </div>
    <div class="book-details">
      <h3 class="book-title">${get(book.title) || 'Book Title'}</h3>
      <p class="book-description">${get(book.description)}</p>
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
 * Update carousel arrow button visibility and disabled state
 */
function updateArrowButtonState() {
  const container = document.getElementById(DOM.booksContainer);
  const leftBtn = document.querySelector('.carousel-arrow[data-direction="left"]');
  const rightBtn = document.querySelector('.carousel-arrow[data-direction="right"]');

  if (!container || !leftBtn || !rightBtn) return;

  const canScrollLeft = container.scrollLeft > 0;
  const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 1;

  // Update disabled state based on scroll position
  leftBtn.disabled = !canScrollLeft;
  rightBtn.disabled = !canScrollRight;

  // Update aria-disabled attribute for accessibility
  leftBtn.setAttribute('aria-disabled', !canScrollLeft);
  rightBtn.setAttribute('aria-disabled', !canScrollRight);

  // Update visual styles for disabled state
  leftBtn.classList.toggle('disabled', !canScrollLeft);
  rightBtn.classList.toggle('disabled', !canScrollRight);
}

/**
 * Scroll carousel left or right
 * @param {string} direction - 'left' or 'right'
 */
function scrollCarousel(direction) {
  const container = document.getElementById(DOM.booksContainer);
  if (!container) return;

  // Scroll by one book width (80% of container) plus gap
  const scrollAmount = container.clientWidth * 0.8 + 3 * 16; // 3rem gap in pixels (assuming 16px = 1rem)
  const targetScroll = direction === 'left' 
    ? container.scrollLeft - scrollAmount 
    : container.scrollLeft + scrollAmount;

  container.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  });

  // Update button state after scroll
  setTimeout(updateArrowButtonState, 50);
}

/**
 * Attach keyboard navigation to carousel
 */
function attachKeyboardNavigation() {
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      scrollCarousel('left');
    } else if (event.key === 'ArrowRight') {
      scrollCarousel('right');
    }
  });
}

/**
 * Attach click handlers to carousel arrow buttons
 */
function attachArrowButtonHandlers() {
  document.querySelectorAll('.carousel-arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      const direction = btn.dataset.direction;
      if (direction === 'left' || direction === 'right') {
        scrollCarousel(direction);
      }
    });
  });
}

/**
 * Attach scroll event listener to update arrow button states
 */
function attachScrollListener() {
  const container = document.getElementById(DOM.booksContainer);
  if (!container) return;

  container.addEventListener('scroll', updateArrowButtonState);
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
    container.appendChild(createBookElement(book, lang));
  });

  attachBookActionHandlers();
  attachKeyboardNavigation();
  attachArrowButtonHandlers();
  attachScrollListener();
  updateArrowButtonState();
}

/**
 * Get books data from state
 * @returns {array} Books array
 */
export function getBookData() {
  const state = getState();
  return state.books;
}
