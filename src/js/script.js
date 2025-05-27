// Language switching functionality
let currentLang = 'en';

// Function to show messages in the message panel
function showMessage(message, type = 'info') {
    // Create message panel if it doesn't exist
    let messagePanel = document.querySelector('.message-panel');
    if (!messagePanel) {
        messagePanel = document.createElement('div');
        messagePanel.className = 'message-panel';
        document.body.appendChild(messagePanel);
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    messagePanel.appendChild(messageElement);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.remove();
            // Remove message panel if it's empty
            if (messagePanel.children.length === 0) {
                messagePanel.remove();
            }
        }, 300); // Wait for fade-out animation
    }, 5000);
}

// Function to set language
function setLanguage(lang) {
    if (!window.translations[lang]) {
        console.error(`Language ${lang} not found in translations`);
        return;
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    currentLang = lang;

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (window.translations[lang][key]) {
            element.textContent = window.translations[lang][key];
        }
    });

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Function to update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Get current scroll position with offset
    const scrollPosition = window.scrollY + 100;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Find the current section
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Check if we're at the bottom of the page
        if (scrollPosition + windowHeight >= documentHeight - 100) {
            // If we're at the bottom, activate the last section
            currentSection = sections[sections.length - 1].getAttribute('id');
        } else if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active state of navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize language from localStorage or default to English
document.addEventListener('DOMContentLoaded', () => {
    // Get user's preferred language from browser
    const userLang = navigator.language || navigator.userLanguage;
    const savedLang = localStorage.getItem('preferredLanguage');
    
    // Set default language based on conditions
    let defaultLang = 'en';
    if (!savedLang && (userLang === 'ru' || userLang === 'ru-RU' || !userLang)) {
        defaultLang = 'by';
    }
    
    // Use saved language if available, otherwise use default
    const initialLang = savedLang || defaultLang;
    setLanguage(initialLang);

    // Add click event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        
        // Change navbar background
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 0) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const img = document.getElementById('book-cover-img');
                img.src = lang === 'by'
                    ? 'images/I-Plakaly-anioly-Cover-BY.png'
                    : 'images/I-Plakaly-anioly-Cover-EN.png';
            });
        });

      // Helper to get selected language from localStorage or active button
  function getCurrentLang() {
    // Try to get from localStorage (if your language switcher saves it)
    if (localStorage.getItem('lang')) {
      return localStorage.getItem('lang');
    }
    // Fallback to active button
    return document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
  }

  function updateBookCover(lang) {
    const img = document.getElementById('book-cover-img');
    if (!img) return;
    if (lang === 'by') {
      img.src = 'images/I-Plakaly-anioly-Cover-BY.png';
    } else {
      img.src = 'images/I-Plakaly-anioly-Cover-EN.png';
    }
  }

  // Initial set using current language
  updateBookCover(getCurrentLang());

  // Listen for language switch and save to localStorage
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      localStorage.setItem('lang', this.dataset.lang);
      updateBookCover(this.dataset.lang);
    });
  });


    // Set initial active navigation link
    updateActiveNavLink();

    // Handle form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const formData = new FormData(this);
                const response = await fetch(window.config.formspree.endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showMessage(window.translations[currentLang]['contact.form.success'], 'success');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error handling form submission:', error);
                showMessage(window.translations[currentLang]['contact.form.error'], 'error');
            }
        });
    }
}); 