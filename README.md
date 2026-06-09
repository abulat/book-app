# Book App - Refactored Solution

This project has been refactored to make the JavaScript code testable with unit tests and to enable running a local HTTP server.

## Project Structure

```
src/
  index.html              # Main HTML file
  css/
    styles.css           # Application styles
  data/
    author.json          # Author information (JSON)
    books.json           # Book details (JSON)
    translations.json    # UI translations (JSON)
  images/                # Static images
  js/
    app.js              # Core testable application logic (ES6 modules)
    script.js           # Browser entry point (ES6 modules)
    config.js           # Configuration exports
    translations.js     # Translation data exports
tests/
  app.test.js           # Unit tests for app module
package.json            # Project dependencies and scripts
vitest.config.js        # Vitest configuration
```

## Key Changes

### 1. **Modular JavaScript Architecture**
   - Extracted business logic into [src/js/app.js](src/js/app.js)
   - Converted to ES6 modules for testability
   - Separated concerns: data handling, UI rendering, language switching

### 2. **Unit Tests**
   - Added Vitest framework for unit testing
   - Test suite located at [tests/app.test.js](tests/app.test.js)
   - Tests cover:
     - Language switching logic
     - Translation application
     - Book data rendering
     - Locale detection

### 3. **HTTP Server**
   - Added `http-server` for local development
   - Serves the app on `http://127.0.0.1:8080`

### 4. **JSON Data Files**
   - `src/data/author.json` - Author profile with multilingual support
   - `src/data/books.json` - Book details (title, description, genre, pages, release date)
   - `src/data/translations.json` - UI text translations (English & Belarusian)

## Available Commands

### Run Unit Tests
```bash
npm test
```
Runs the test suite once. All 6 tests should pass.

### Run Tests in Watch Mode
```bash
npm run test:watch
```
Monitors test files and re-runs tests on changes.

### Start Development Server
```bash
npm start
# or
npm run serve
```
Starts the HTTP server on port 8080. Access the app at:
- Local: `http://127.0.0.1:8080`
- Network: `http://192.168.2.169:8080`

## Installation

```bash
npm install
```

This installs all dependencies including:
- `vitest` - Unit testing framework
- `jsdom` - DOM simulation for tests
- `http-server` - Simple HTTP server

## Features

### Language Support
- **English (EN)** - Default language
- **Belarusian (BE)** - Full translation support
- Auto-detection based on browser locale
- Language preference stored in localStorage

### Core Functionality
- **Dynamic Language Switching** - Click EN/BE buttons to switch languages
- **Book Information** - Displays localized book title, description, genre, pages, release date
- **Smooth Navigation** - Anchor links with smooth scrolling
- **Scroll Spy** - Active navigation highlighting based on scroll position
- **Contact Form** - Integrated with Formspree for email submissions
- **Responsive Design** - Mobile-friendly layout

### Testable Functions (in `src/js/app.js`)
- `setLanguage(lang)` - Switch language and update UI
- `renderBook(lang)` - Render book details in selected language
- `loadBookData(path)` - Load book JSON asynchronously
- `applyTranslations(lang)` - Update all i18n elements
- `getDefaultLanguage(savedLang, userLang)` - Determine initial language
- `setBookData(data)` - Store book data for rendering

## Test Results

```
✓ tests/app.test.js (6)
  ✓ Language utilities (4)
    ✓ should return the default language from saved preference
    ✓ should use Belarusian for ru/be locale when no saved preference exists
    ✓ should apply translations to elements with data-i18n attributes
    ✓ should set the active language button class
  ✓ Book rendering (2)
    ✓ should render book details in English
    ✓ should render book details in Belarusian

Test Files  1 passed (1)
Tests  6 passed (6)
```

## Browser Compatibility

- Modern browsers with ES6 module support
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires JavaScript enabled

## Development Workflow

1. **Modify Code**: Edit files in `src/js/`, `src/data/`, or tests
2. **Run Tests**: `npm test` to verify changes
3. **Test Locally**: `npm start` and open `http://127.0.0.1:8080`
4. **Language Testing**: Click EN/BE buttons to verify translations

## Notes

- All translations are stored in `src/data/translations.json`
- Book data is loaded from `src/data/books.json`
- Author information is in `src/data/author.json`
- The app gracefully handles missing JSON files with console warnings
