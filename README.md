# Book App

A modern, responsive website for showcasing a book and its author. Built with vanilla JavaScript, HTML, and CSS.

## Features

- Responsive design
- Multi-language support (English and Belarusian)
- Smooth scrolling navigation
- Contact form with Formspree integration
- Dynamic message notifications
- Active page highlighting
- Automated deployment with GitHub Actions

## Project Structure

```
book-app/
├── src/                    # Source files
│   ├── js/                # JavaScript files
│   │   ├── script.js      # Main application logic
│   │   ├── config.js      # Configuration settings
│   │   └── translations.js # Language translations
│   ├── css/               # Stylesheets
│   │   └── styles.css     # Main stylesheet
│   ├── assets/            # Images and other assets
│   └── index.html         # Main HTML file
├── dist/                  # Production build (generated)
├── .github/              # GitHub configuration
│   └── workflows/        # GitHub Actions workflows
├── package.json          # Project configuration
└── README.md            # Project documentation
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run clean` - Clean the build directory

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. The deployment process is triggered automatically when you push to the main branch.

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. The built files will be in the `dist` directory
3. Deploy the contents of the `dist` directory to your hosting service

### GitHub Pages Deployment

1. Push your changes to the main branch
2. GitHub Actions will automatically:
   - Build the project
   - Deploy to GitHub Pages
3. Your site will be available at `https://<username>.github.io/<repository-name>`

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Formspree for form handling
- GitHub Actions for CI/CD
- GitHub Pages for hosting

## License

MIT 