import { getState } from './state.js';

/**
 * Normalize ebook source paths for preview rendering.
 * @param {string} source - Raw ebook source string
 * @returns {string|null} Resolved source path or null when invalid
 */
function resolveEbookSource(source) {
  if (!source) return null;
  if (/^(https?:)?\/\//i.test(source) || source.startsWith('data:')) {
    return source;
  }

  const normalized = source.trim().replace(/^\.\//, '');
  const candidates = [normalized];

  if (!normalized.startsWith('data/')) {
    candidates.push(`data/${normalized}`);
  }

  if (normalized.startsWith('ebooks/')) {
    candidates.push(`data/ebook/${normalized.replace(/^ebooks\//, '')}`);
  } else if (!normalized.startsWith('data/ebook/')) {
    candidates.push(`data/ebook/${normalized}`);
  }

  return candidates.find(candidate => Boolean(candidate));
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Select the ebook value for the active language.
 * @param {object|string} ebook - Ebook field from book data
 * @param {string} lang - Active language code
 * @returns {string|null}
 */
function getLocalizedEbookValue(ebook, lang) {
  if (!ebook) return null;
  if (typeof ebook === 'string') {
    return ebook.trim() || null;
  }

  if (typeof ebook !== 'object') {
    return null;
  }

  const localized = ebook[lang];
  return typeof localized === 'string' && localized.trim() ? localized : null;
}

/**
 * Get ebook preview metadata for a book in the current language.
 * @param {object} book - Book data object
 * @param {string} lang - Language code
 * @returns {{type: string, content?: string, source?: string}|null}
 */
export function getEbookPreview(book, lang) {
  if (!book?.ebook) return null;

  const ebookValue = getLocalizedEbookValue(book.ebook, lang);
  if (!ebookValue) return null;

  const normalized = ebookValue.replace(/\\n/g, '\n');
  const isSource = /\.(epub|html|txt|md)$/i.test(normalized.trim());

  if (!isSource || normalized.includes('\n')) {
    return { type: 'text', content: normalized };
  }

  return { type: 'source', source: resolveEbookSource(normalized) };
}

/**
 * Ensure the ebook preview modal exists in the DOM.
 * @returns {HTMLElement}
 */
function ensureEbookModal() {
  let modal = document.querySelector('.ebook-preview-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.className = 'ebook-preview-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="ebook-preview-backdrop"></div>
    <div class="ebook-preview-dialog" role="dialog" aria-modal="true" aria-label="Ebook preview">
      <div class="ebook-preview-header">
        <h3 class="ebook-preview-title">Preview</h3>
        <button class="ebook-preview-close" type="button" aria-label="Close preview">×</button>
      </div>
      <div class="ebook-preview-body"></div>
    </div>
  `;

  document.body.appendChild(modal);
  return modal;
}

/**
 * Render ebook preview content into the modal.
 * @param {HTMLElement} modal
 * @param {object} book
 * @param {string} lang
 */
export async function openEbookPreview(modal, book, lang) {
  const body = modal.querySelector('.ebook-preview-body');
  if (!body) return;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.innerHTML = '<div class="ebook-preview-loading">Loading preview…</div>';

  const preview = getEbookPreview(book, lang);
  if (!preview) {
    body.innerHTML = '<div class="ebook-preview-empty">Preview content is unavailable.</div>';
    return;
  }

  if (preview.type === 'text') {
    const paragraphs = (preview.content || '').split(/\n+/).filter(Boolean);
    body.innerHTML = paragraphs.length > 0
      ? paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')
      : '<p>No preview content is available.</p>';
    return;
  }

  try {
    const Epub = window.ePub || window.ePubJS || window.epubjs;
    if (!Epub) {
      throw new Error('EPUB.js is not available in the browser.');
    }

    const container = document.createElement('div');
    container.className = 'ebook-preview-renderer';
    body.innerHTML = '';
    body.appendChild(container);

    const epubBook = Epub(preview.source, {
      openAs: 'epub'
    });

    await epubBook.ready;

    const rendition = epubBook.renderTo(container, {
      width: '100%',
      height: '700px',
      flow: 'scrolled-doc'
    });


    for (const section of epubBook.spine.items) {
      const sectionContainer = document.createElement('div');

      sectionContainer.className = 'epub-section';

      container.appendChild(sectionContainer);

      const sectionRendition = epubBook.renderTo(sectionContainer, {
        width: '100%',
        flow: 'scrolled-doc'
      });

      await sectionRendition.display(section.href);
    }
  } catch (error) {
    console.warn('Unable to render EPUB preview:', error);
    body.innerHTML = '<div class="ebook-preview-empty">Preview content is unavailable in this environment.</div>';
  }
}

function closeEbookPreview(modal) {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

/**
 * Attach click handlers to ebook preview links.
 */
export function attachEbookPreviewHandlers() {
  document.querySelectorAll('.ebook-preview-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const bookId = link.getAttribute('data-book-id');
      const book = getState().books.find(item => item.id === bookId);
      if (!book) return;

      const lang = link.getAttribute('data-lang') || 'en';
      const modal = ensureEbookModal();
      openEbookPreview(modal, book, lang);

      modal.querySelector('.ebook-preview-close')?.addEventListener('click', () => closeEbookPreview(modal), { once: true });
      modal.querySelector('.ebook-preview-backdrop')?.addEventListener('click', () => closeEbookPreview(modal), { once: true });
    });
  });
}
