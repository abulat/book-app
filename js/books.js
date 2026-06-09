// ============================================================================
// BOOK RENDERING
// ============================================================================

import { getState } from './state.js';
import { getTranslation } from './translations.js';

const DOM = {
  booksContainer: 'books-container',
  contactSection: 'contact',
  bookActionBtn: '.book-action-btn',
  booksScrollWrapper: 'books-scroll-wrapper'
};

/**
 * Truncate text to specified length without cutting words
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {object} Object with full text and truncated text
 */
function truncateText(text, maxLength = 200) {
  if (!text || text.length <= maxLength) {
    return { full: text, truncated: text, isTruncated: false };
  }

  // Find the last space within maxLength characters
  let truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    truncated = truncated.substring(0, lastSpaceIndex);
  }

  return { full: text, truncated: truncated + '...', isTruncated: true };
}

/**
 * Get a localized value from a nested object with language fallback
 * @param {object} obj - Object with language keys (en, be, etc.)
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
  
  // Truncate description
  const description = get(book.description);
  const { truncated, isTruncated } = truncateText(description);
  
  // Get translations for buttons
  const showMoreText = getTranslation('books.showMore', lang);
  const showLessText = getTranslation('books.showLess', lang);
  
  // Build description HTML with show more/less toggle
  let descriptionHTML = `<p class="book-description ${isTruncated ? 'truncated' : ''}" data-full-text="${description.replace(/"/g, '&quot;')}&nbsp;" data-truncated-text="${truncated.replace(/"/g, '&quot;')}&nbsp;">${truncated}&nbsp;`;
    
  if (isTruncated) {
    // Stripped out all line breaks inside this string so it doesn't push down
    descriptionHTML += `<a class="show-more-btn" data-expanded="false" style="display: inline-flex; gap: 4px; cursor: pointer;"><span class="show-more-text">${showMoreText}</span><span class="show-less-text" style="display: none;">${showLessText}</span></a>`;
  }

  descriptionHTML += `</p>`;

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
      ${descriptionHTML}
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
 * Attach click handlers to "show more/less" buttons
 */
function attachShowMoreHandlers() {
  document.querySelectorAll('.show-more-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      
      const descriptionEl = btn.parentElement; // This is the <p> tag
      const contentSpan = descriptionEl.querySelector('.description-content'); 
      
      const isExpanded = btn.dataset.expanded === 'true';
      const showMoreText = btn.querySelector('.show-more-text');
      const showLessText = btn.querySelector('.show-less-text');
      
      if (isExpanded) {
        // Collapse
        const truncatedText = descriptionEl.getAttribute('data-truncated-text');
        
        if (contentSpan) {
          contentSpan.innerHTML = truncatedText;
        } else {
          // Fallback just in case the span wasn't found
          descriptionEl.textContent = truncatedText; 
        }
        
        descriptionEl.classList.add('truncated');
        showMoreText.style.display = 'inline';
        showLessText.style.display = 'none';
        btn.dataset.expanded = 'false';
        
        if (!contentSpan) descriptionEl.appendChild(btn);

      } else {
        // Expand
        const fullText = descriptionEl.getAttribute('data-full-text');
        
        if (contentSpan) {
          contentSpan.innerHTML = fullText;
        } else {
          // Fallback just in case
          descriptionEl.textContent = fullText;
        }
        
        descriptionEl.classList.remove('truncated');
        showMoreText.style.display = 'none';
        showLessText.style.display = 'inline';
        btn.dataset.expanded = 'true';
        
        if (!contentSpan) descriptionEl.appendChild(btn);
      }
    });
  });
}

/**
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
  const scrollAmount = container.clientWidth * 0.865 + 3 * 16; // 3rem gap in pixels (assuming 16px = 1rem)
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
  attachShowMoreHandlers();
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
