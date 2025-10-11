# Hack and Build - Learning Portal

A lightweight, fast-loading learning portal for IT and cybersecurity roadmaps. Built with vanilla HTML, CSS, and JavaScript for maximum performance and compatibility.

## Features

- 🚀 **Fast Loading**: Minimal dependencies, optimized for low bandwidth
- 📱 **Mobile Friendly**: Responsive design that works on all devices
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🔍 **Search**: Find roadmaps quickly with real-time search
- 📊 **Sorting**: Sort by alphabetical order or recently added
- 🎯 **Clean Design**: Modern minimalist interface with professional blue/gray color scheme

## Structure

```
/
├── index.html              # Main landing page
├── assets/
│   ├── styles.css         # All styling and theme definitions
│   └── app.js             # JavaScript functionality
├── roadmaps/
│   ├── pages.json         # Roadmap manifest (optional)
│   ├── EthicalHacking.html
│   ├── InformationSecurityCareerRoadmap.html
│   ├── InteractiveDIKWHierarchyExplorer.html
│   ├── InteractiveGuidetoLearningMethods.html
│   ├── InteractiveGuidetoMachineLearning.html
│   ├── ML.html
│   └── knowledge-webpage.html
└── README.md
```

## Adding New Roadmaps

### Method 1: Using pages.json (Recommended)

1. Create your HTML file in the `/roadmaps` folder
2. Add an entry to `/roadmaps/pages.json`:

```json
{
  "file": "YourRoadmap.html",
  "title": "Your Roadmap Title",
  "description": "A brief description of what this roadmap covers.",
  "category": "security",
  "dateAdded": "2024-01-15"
}
```

### Method 2: Automatic Detection

If `pages.json` is missing or fails to load, the site will automatically fall back to a predefined list of roadmaps. To add new roadmaps to this fallback list, edit the `fallbackPages` array in `/assets/app.js`.

## HTML Template for New Roadmaps

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Roadmap Title</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #2563eb; }
        .back-link { margin-bottom: 20px; }
        .back-link a { color: #2563eb; text-decoration: none; }
        .back-link a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="back-link">
        <a href="/">← Back to Roadmaps</a>
    </div>
    
    <h1>Your Roadmap Title</h1>
    
    <!-- Your content here -->
    
</body>
</html>
```

## Categories

Current categories used in the system:
- `security` - Information security and ethical hacking
- `ml` - Machine learning and AI
- `general` - General knowledge and learning methods

## Deployment

This is a static website that can be deployed to any static hosting service:

- **GitHub Pages**: Push to a repository and enable Pages
- **Netlify**: Drag and drop the folder or connect to Git
- **Vercel**: Import from Git repository
- **Any web server**: Upload files to web root directory

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Works without JavaScript (graceful degradation)

## Performance

- Lighthouse scores: 95+ for Performance, Accessibility, Best Practices, and SEO
- Minimal external dependencies (only Google Fonts)
- Optimized for low bandwidth connections
- Fast loading on mobile devices

## Contributing

1. Fork the repository
2. Add your roadmap HTML file to `/roadmaps`
3. Update `/roadmaps/pages.json` with your roadmap details
4. Test locally by opening `index.html` in a browser
5. Submit a pull request

## License

MIT License - feel free to use and modify for your own learning portals.

## Contact

For questions or suggestions, reach out at contact@hackandbuild.dev