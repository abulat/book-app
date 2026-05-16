import { config } from './config.js';
import { getDefaultLanguage, loadTranslationsData, loadAuthorData, loadBookData, setLanguage } from './app.js';

function attachLanguageButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });
}

function attachSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function attachScrollSpy() {
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPosition = window.scrollY + 100;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        currentSection = sections[sections.length - 1].getAttribute('id');
      } else if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });

    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.background = window.scrollY > 0 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
    }
  });
}

function attachFormHandler() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);

    fetch(config.formspree.endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Thank you for your message! We will get back to you soon.');
          contactForm.reset();
        } else {
          alert('There was an error sending your message. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error handling form submission:', error);
        alert('There was an error sending your message. Please try again.');
      });
  });
}

async function initialize() {
  const initialLang = getDefaultLanguage(localStorage.getItem('preferredLanguage'), navigator.language || navigator.userLanguage);

  try {
    await loadTranslationsData();
    await loadAuthorData();
    await loadBookData();
  } catch (error) {
    console.warn('Data load failed:', error);
  }

  setLanguage(initialLang);
  attachLanguageButtons();
  attachSmoothScroll();
  attachScrollSpy();
  attachFormHandler();
}

document.addEventListener('DOMContentLoaded', initialize);
