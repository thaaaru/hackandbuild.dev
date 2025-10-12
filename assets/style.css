/* --------------------
 * 1. Variables and Reset
 * -------------------- */
:root {
    --color-text-light: #2c3e50;    /* Dark-ish grey for text */
    --color-text-dark: #ecf0f1;     /* Light-ish grey for dark mode text */
    --color-background-light: #ffffff; /* Pure white */
    --color-background-dark: #222222;  /* Near black for dark mode */
    --color-primary-light: #3498db; /* Blue */
    --color-primary-dark: #2ecc71;  /* Green for dark mode contrast */
    --color-accent-light: #e67e22;  /* Orange */
    --color-accent-dark: #f1c40f;   /* Yellow */
    --color-card-light: #f9f9f9;
    --color-card-dark: #333333;
    --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-mono: 'Fira Code', 'Roboto Mono', monospace;
    --max-width: 1000px;
    --spacing: 20px;
}

/* Dark Mode Theme */
.dark-mode {
    --color-text: var(--color-text-dark);
    --color-background: var(--color-background-dark);
    --color-primary: var(--color-primary-dark);
    --color-accent: var(--color-accent-dark);
    --color-card: var(--color-card-dark);
}

/* Light Mode (Default) */
body {
    --color-text: var(--color-text-light);
    --color-background: var(--color-background-light);
    --color-primary: var(--color-primary-light);
    --color-accent: var(--color-accent-light);
    --color-card: var(--color-card-light);
}

/* Basic Reset */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-sans);
    line-height: 1.6;
    color: var(--color-text);
    background-color: var(--color-background);
    transition: background-color 0.3s, color 0.3s;
}

/* --------------------
 * 2. Typography
 * -------------------- */
h1, h2, h3 {
    line-height: 1.2;
    margin-bottom: 0.5em;
    font-weight: 700;
}

/* Monospaced Accent for Headings */
.site-header h1, .section-heading, .hero-title {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s;
}

a:hover {
    color: var(--color-accent);
}

/* --------------------
 * 3. Layout and Components
 * -------------------- */
.container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing);
}

section {
    padding: calc(var(--spacing) * 2) 0;
}

hr {
    border: none;
    border-top: 1px solid var(--color-card);
    margin: 0;
}

/* Header */
.site-header {
    background-color: var(--color-background);
    border-bottom: 1px solid var(--color-card);
    padding: var(--spacing) 0;
    position: sticky;
    top: 0;
    z-index: 10;
}

.site-header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.site-header h1 {
    font-size: 1.5rem;
}

/* Buttons */
.button {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 600;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.2s;
    font-family: var(--font-mono);
}

.button.primary {
    background-color: var(--color-primary);
    color: var(--color-background-light); /* Always light text for contrast */
}

.button.secondary {
    background-color: transparent;
    color: var(--color-primary);
    border-color: var(--color-primary);
}

.button:hover {
    filter: brightness(1.2);
}

/* Grid Layouts */
.grid-2 {
    display: grid;
    gap: var(--spacing);
    grid-template-columns: 1fr;
}
@media (min-width: 600px) {
    .grid-2 {
        grid-template-columns: repeat(2, 1fr);
    }
}

.grid-3 {
    display: grid;
    gap: var(--spacing);
    grid-template-columns: 1fr;
}
@media (min-width: 768px) {
    .grid-3 {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Card Style */
.card {
    background-color: var(--color-card);
    padding: var(--spacing);
    border-radius: 6px;
    border: 1px solid transparent;
    transition: border-color 0.2s, background-color 0.2s;
}

.card:hover {
    border-color: var(--color-primary);
}

/* Roadmap Card Styling (Specific) */
.roadmap-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.roadmap-card .card-content h3 {
    margin-top: 0;
    color: var(--color-primary);
}

.roadmap-card .card-link {
    margin-top: 15px;
    align-self: flex-start;
    font-size: 0.9rem;
}

/* Hero */
.hero-section {
    text-align: center;
    padding-top: calc(var(--spacing) * 4);
    padding-bottom: calc(var(--spacing) * 4);
}

.hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: var(--color-primary);
}

.hero-subtitle {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    margin-bottom: var(--spacing);
    font-weight: 300;
}

.hero-description {
    max-width: 700px;
    margin: 0 auto 2rem;
    font-size: 1.1rem;
}

.hero-actions > * {
    margin: 0 10px;
}

/* Code Block for Contribution */
pre {
    background-color: var(--color-card);
    padding: var(--spacing);
    overflow-x: auto;
    border-radius: 4px;
    font-family: var(--font-mono);
    margin: 1.5rem 0;
    border: 1px solid var(--color-primary);
}

/* Dark Mode Toggle */
#dark-mode-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;
    color: var(--color-text);
}

/* Footer */
.site-footer {
    padding: var(--spacing) 0;
    text-align: center;
    font-size: 0.9rem;
    border-top: 1px solid var(--color-card);
    margin-top: calc(var(--spacing) * 2);
}
