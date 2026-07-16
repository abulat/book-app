# Book App

A small multilingual book showcase app with localized content, book rendering, and ebook preview support.

## Project structure

```text
src/
  index.html
  css/
    styles.css
  data/
    author.json
    books.json
    translations.json
    ebook/
      ...epub files...
  images/
  js/
    app.js
    author.js
    book.preview.js
    books.js
    config.js
    data-loader.js
    script.js
    state.js
    translations.js

tests/
  app.test.js
  author.test.js
  book-preview.test.js
  books.test.js
  data-loader.test.js
  translations.test.js
```

## Available scripts

### Install dependencies
```bash
npm install
```

### Run tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Start a local dev server
```bash
npm run dev
```

This serves the app from [src](src) on port 8080.

### Build a production-style copy
```bash
npm run build
```

### Preview the built app
```bash
npm run preview
```

## Features

- Multilingual UI and book content for English and Belarusian
- Dynamic book rendering with localized titles, descriptions, and metadata
- Ebook preview links that open a modal preview for text or EPUB content
- Modular JS architecture with ES modules
- Unit tests covering app, author, books, data loading, translations, and preview behavior

## Tests

The current suite includes:

- [tests/app.test.js](tests/app.test.js)
- [tests/author.test.js](tests/author.test.js)
- [tests/books.test.js](tests/books.test.js)
- [tests/book-preview.test.js](tests/book-preview.test.js)
- [tests/data-loader.test.js](tests/data-loader.test.js)
- [tests/translations.test.js](tests/translations.test.js)

## Notes

- Translations live in [src/data/translations.json](src/data/translations.json)
- Book data is loaded from [src/data/books.json](src/data/books.json)
- Author data is loaded from [src/data/author.json](src/data/author.json)
- Ebook preview assets are stored under [src/data/ebook](src/data/ebook)
