// Fallback pages data
const fallbackPages = [
  { 
    file: "EthicalHacking.html",
    title: "Ethical Hacking",
    description: "Start here for a practical security testing roadmap.",
    category: "security",
    dateAdded: "2024-01-15"
  },
  { 
    file: "InformationSecurityCareerRoadmap.html",
    title: "Information Security Career Roadmap",
    description: "Roles, skills, and steps from beginner to architect.",
    category: "security",
    dateAdded: "2024-01-20"
  },
  { 
    file: "InteractiveDIKWHierarchyExplorer.html",
    title: "Interactive DIKW Hierarchy Explorer",
    description: "From data to wisdom with hands-on examples.",
    category: "general",
    dateAdded: "2024-02-01"
  },
  { 
    file: "InteractiveGuidetoLearningMethods.html",
    title: "Interactive Guide to Learning Methods",
    description: "Techniques that help you learn faster and better.",
    category: "general",
    dateAdded: "2024-02-05"
  },
  { 
    file: "InteractiveGuidetoMachineLearning.html",
    title: "Interactive Guide to Machine Learning",
    description: "A guided tour of core ML ideas.",
    category: "ml",
    dateAdded: "2024-02-10"
  },
  { 
    file: "ML.html",
    title: "Machine Learning Roadmap",
    description: "Pathways, tools, and projects.",
    category: "ml",
    dateAdded: "2024-02-15"
  },
  { 
    file: "knowledge-webpage.html",
    title: "Knowledge Webpage",
    description: "A general knowledge hub and notes.",
    category: "general",
    dateAdded: "2024-02-20"
  }
];

// Utility function to prettify filenames
function prettify(name) {
  return name
    .replace(/\.html?$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

// Load manifest from pages.json or fallback to hardcoded data
async function loadManifest() {
  try {
    const res = await fetch("/roadmaps/pages.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No manifest");
    const data = await res.json();
    return data;
  } catch {
    console.log("Using fallback pages data");
    return fallbackPages;
  }
}

// Sort function
function sortItems(items, sortBy) {
  const sorted = [...items];
  
  switch (sortBy) {
    case 'alphabetical':
      return sorted.sort((a, b) => {
        const titleA = (a.title || prettify(a.file)).toLowerCase();
        const titleB = (b.title || prettify(b.file)).toLowerCase();
        return titleA.localeCompare(titleB);
      });
    case 'recent':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.dateAdded || '2024-01-01');
        const dateB = new Date(b.dateAdded || '2024-01-01');
        return dateB - dateA; // Most recent first
      });
    default:
      return sorted;
  }
}

// Render the roadmap list
function renderList(items) {
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort-select");
  const listEl = document.getElementById("roadmap-list");
  const emptyState = document.getElementById("empty-state");
  
  let currentItems = [...items];
  
  // Create card HTML
  function createCard(item) {
    const title = item.title || prettify(item.file);
    const desc = item.description || "Open the guide";
    const url = `/roadmaps/${item.file}`;
    
    return `
      <article class="card" data-title="${title.toLowerCase()}" data-category="${item.category || 'general'}">
        <h3><a href="${url}">${title}</a></h3>
        <p>${desc}</p>
        <p><a class="open" href="${url}">Open →</a></p>
      </article>
    `;
  }
  
  // Apply filters and render
  function applyFiltersAndRender() {
    const searchTerm = (searchInput.value || "").toLowerCase();
    const sortBy = sortSelect.value;
    
    // Filter by search term
    let filteredItems = currentItems.filter(item => {
      const title = (item.title || prettify(item.file)).toLowerCase();
      const desc = (item.description || "").toLowerCase();
      return title.includes(searchTerm) || desc.includes(searchTerm);
    });
    
    // Sort items
    filteredItems = sortItems(filteredItems, sortBy);
    
    // Render
    if (filteredItems.length === 0) {
      listEl.innerHTML = "";
      emptyState.hidden = false;
    } else {
      listEl.innerHTML = filteredItems.map(createCard).join("");
      emptyState.hidden = true;
    }
  }
  
  // Set up event listeners
  searchInput.addEventListener("input", applyFiltersAndRender);
  sortSelect.addEventListener("change", applyFiltersAndRender);
  
  // Initial render
  currentItems = items;
  applyFiltersAndRender();
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSmoothScrolling();
  
  // Load and render roadmaps
  loadManifest().then(renderList).catch(error => {
    console.error("Error loading roadmaps:", error);
    // Show empty state if everything fails
    document.getElementById("empty-state").hidden = false;
  });
});

// Export for potential future use
window.HackAndBuild = {
  loadManifest,
  renderList,
  prettify,
  sortItems
};