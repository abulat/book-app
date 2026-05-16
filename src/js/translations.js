// ============================================================================
// TRANSLATIONS & LANGUAGE MANAGEMENT
// ============================================================================

import { getState } from './state.js';

const DOM = {
  langButtons: '.lang-btn',
};

/**
 * Detect default language based on saved preference or browser locale
 * @param {string} savedLang - Previously saved language preference
 * @param {string} userLang - Browser language/locale
 * @returns {string} Language code (en or by)
 */
export function getDefaultLanguage(savedLang, userLang = '') {
  if (savedLang) {
    return savedLang;
  }

  if (/^(ru|be)/.test((userLang || '').toLowerCase())) {
    return 'by';
  }

  return 'en';
}

/**
 * Get translated string for a key in specified language
 * @param {string} key - Translation key (dot notation supported)
 * @param {string} lang - Language code
 * @returns {string} Translated text or empty string
 */
export function getTranslation(key, lang) {
  const state = getState();
  if (!state.translations) {
    return '';
  }
  return state.translations?.[lang]?.[key] || state.translations?.en?.[key] || '';
}

/**
 * Apply all translations to DOM elements with data-i18n attribute
 * @param {string} lang - Language code
 */
export function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const text = getTranslation(key, lang);
    if (text) {
      element.textContent = text;
    }
  });

  const title = getTranslation('site.title', lang);
  if (title) {
    document.title = title;
  }
}

/**
 * Get current language from localStorage
 * @returns {string} Current language code
 */
export function getCurrentLang() {
  return localStorage.getItem('preferredLanguage') || 'en';
}

/**
 * Get all translations for a language
 * @param {string} lang - Language code
 * @returns {object} Translation object for language
 */
export function getKeyedTranslations(lang) {
  const state = getState();
  return state.translations?.[lang] || {};
}

export const translations = {
    en: {
        'site.title': 'Ales Begood - Writer & Storyteller',
        'author.name': 'Ales Begood',
        'site.authorName': 'Ales Begood',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.books': 'Books',
        'nav.contact': 'Contact',
        'hero.title': 'Ales Begood',
        'hero.subtitle': 'Writer & Storyteller',
        'hero.cta': 'Discover More',
        'author.title': 'About the Author',
        'author.bio1': 'Ales Begood is a Belarusian author. He has been writing poems and short stories all his life, but they might have remained unpublished if not for the events that followed the 2020 presidential election in his home country — Belarus. For Ales, the printed word became a way to speak about pain, hope, and human dignity — the things he saw in the eyes of the people around him. He believes that words have the power to bear witness to the truth, even when others remain silent.',
        'books.title': 'Publications',
        'books.book1.title': 'And the Angels Wept',
        'books.book1.description': 'And the Angels Wept is a debut collection of short stories, originally written in Belarusian and Russian, and translated into English. The book carries the honest and painful voice of a people who have endured protests, torture, and repression, but held on to hope. At the center are ordinary people facing moments of truth, fear, and faith — described with sincerity and humanity, without pathos but with a sense of respect.',
        'books.book1.genre.title': 'Genre',
        'books.book1.genre.value': 'Contemporary Fiction, Political Fiction, Short Stories, Psychological Drama, Social Commentary',
        'books.book1.pages.title': 'Pages',
        'books.book1.pages.value': '142',
        'books.book1.release.title': 'Release Date',
        'books.book1.release.value': 'April, 2025',
        'books.book1.cta': 'Get Your Copy via Amazon',
        'contact.title': 'Get in Touch',
        'contact.info.title': 'Contact Information',
        'contact.info.email': 'Email: ales@allesbegood.com',
        'contact.info.social': 'Follow me on social media:',
        'contact.social.twitter': 'Twitter',
        'contact.social.instagram': 'Instagram',
        'contact.social.linkedin': 'LinkedIn',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send Message',
        'contact.form.success': 'Thank you for your message! We will get back to you soon.',
        'contact.form.error': 'There was an error sending your message. Please try again or email directly to: ales@allesbegood.com',
        'footer.copyright': '© 2024 Ales Begood. All rights reserved.'
    },
    by: {
        'site.title': 'Алесь Бігуд - Пісьменнік і Апавядальнік',
        'author.name': 'Алесь Бігуд',
        'site.authorName': 'Алесь Бігуд',
        'nav.home': 'Галоўная',
        'nav.about': 'Пра аўтара',
        'nav.books': 'Кнігі',
        'nav.contact': 'Кантакты',
        'hero.title': 'Алесь Бігуд',
        'hero.subtitle': 'Пісьменнік і Апавядальнік',
        'hero.cta': 'Даведацца Больш',
        'author.title': 'Пра Аўтара',
        'author.bio1': 'Алесь Бігуд — беларускі аўтар. Ён піша вершы і кароткія апавяданні ўсё сваё жыццё, але яны так бы і засталіся невыданымі, калі б не падзеі, што адбыліся пасля прэзідэнцкіх выбараў 2020 года ў ягонай краіне — Беларусі. Для Алеся надрукаванае слова стала спосабам гаварыць пра боль, надзею і чалавечую годнасць, якія ён бачыў у вачах людзей вакол сябе. Ён верыць, што слова здольнае сведчыць пра праўду — нават тады, калі маўчаць іншыя.',
        'books.title': 'Публікацыі',
        'books.book1.title': 'І плакалі анёлы',
        'books.book1.description': 'І плакалі анёлы — гэта дэбютны зборнік апавяданняў, напісаны на беларускай і рускай мовах. У кнізе гучыць шчыры і балючы голас народа, які перажыў пратэсты, катаванні і рэпрэсіі, але не згубіў надзеі. Аўтар паказвае людзей у іх самых праўдзівых і ўразлівых момантах — без прыкрас і штучнага героізму, але з глыбокай павагай да іх годнасці.',
        'books.book1.genre.title': 'Жанр',
        'books.book1.genre.value': 'Мастацкая проза, з элементамі сацыяльна-палітычнай драмы, псіхалагічнага апавядання і дакументальнай прозы.',
        'books.book1.pages.title': 'Старонкі',
        'books.book1.pages.value': '140',
        'books.book1.release.title': 'Дата Выдання',
        'books.book1.release.value': 'Красавік 2025',
        'books.book1.cta': 'Купіць Кнігу (Звязацца з аўтарам)',
        'contact.title': 'Звязацца',
        'contact.info.title': 'Кантактная Інфармацыя',
        'contact.info.email': 'Email: ales@allesbegood.com',
        'contact.info.social': 'Сачыце за мной у сацыяльных сетках:',
        'contact.social.twitter': 'Twitter',
        'contact.social.instagram': 'Instagram',
        'contact.social.linkedin': 'LinkedIn',
        'contact.form.name': 'Імя',
        'contact.form.email': 'Email',
        'contact.form.message': 'Паведамленне',
        'contact.form.submit': 'Адправіць',
        'contact.form.success': 'Дзякуй за ваша паведамленне! Мы адкажам вам у бліжэйшы час.',
        'contact.form.error': 'Адбылася памылка пры адпраўцы паведамлення. Калі ласка, паспрабуйце зноў або напішыце на: ales@allesbegood.com',
        'footer.copyright': '© 2024 Алесь Бігуд. Усе правы абаронены.'
    }
}; 
