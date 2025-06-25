# Bootstrap 5.3.7 Project

A simple, clean Bootstrap 5.3.7 project using minified CSS and your own custom SCSS.

## Project Structure

```
Design/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css    # Bootstrap 5.3.7 minified CSS
│   │   └── custom.css           # Custom styles (compiled from SCSS)
│   ├── scss/
│   │   └── custom.scss          # Your SCSS for development
│   └── js/
│       ├── bootstrap.bundle.min.js  # Bootstrap JS
│       └── script.js               # Custom JavaScript
└── README.md
```

## Quick Start

1. Open `index.html` in your browser.
2. Edit `assets/scss/custom.scss` for your custom styles.
3. Compile SCSS to CSS (see below).

## Installing Sass

Before using SCSS, you need to install Sass. Choose one of these methods:

### npm (Recommended)
```sh
npm install -g sass
```

## SCSS Commands

Use these commands in your project root to compile your SCSS:

**Compile once:**
```sh
sass assets/scss/custom.scss assets/css/custom.css
```

**Watch for changes (auto-compile):**
```sh
sass --watch assets/scss/custom.scss:assets/css/custom.css
```

- Your custom styles will override Bootstrap as needed.

## Customization

- Edit `assets/scss/custom.scss` for all your custom styles.
- Compile to `assets/css/custom.css` as shown above.
- Modify `index.html` for structure/content changes.