console.log("NeighborLink site loaded.");

// Map page filenames to theme colors
const pageColors = {
  "index.html": "#27ae60",      // Home - green
  "about.html": "#2980b9",      // About - blue
  "resources.html": "#8e44ad",  // Resources - purple
  "housing.html": "#c0392b",    // Housing - red
  "contact.html": "#f39c12"     // Contact - orange
};

// Load banner.html content and insert banner image dynamically
document.addEventListener("DOMContentLoaded", function () {
  const bannerContainer = document.getElementById("banner-container");
  if (bannerContainer) {
    fetch("banner.html")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load banner.html");
        return response.text();
      })
      .then(html => {
        bannerContainer.innerHTML = html;

        const placeholder = document.getElementById("banner-placeholder");
        if (placeholder) {
          const img = document.createElement("img");
          img.className = "banner-image";

          const data = window.bannerData || {};
          img.src = data.src || "images/default.jpg";
          img.alt = data.alt || "Banner Image";

          placeholder.appendChild(img);

          // Initialize parallax effect
          initParallax();
        }

        // After banner loads, apply header color & active nav
        applyHeaderTheme();
      })
      .catch(error => {
        console.error("Error loading banner:", error);
        applyHeaderTheme(); // still apply header theme even if banner fails
      });
  } else {
    // No banner on page, still apply header theme
    applyHeaderTheme();
  }
});

// Parallax scroll effect for banner images
function initParallax() {
  document.addEventListener("scroll", function () {
    const banner = document.querySelector(".banner-image");
    if (!banner) return;

    const scrollPosition = window.scrollY;
    const startShift = window.innerWidth <= 600 ? -40 : -30;
    const shift = Math.min(scrollPosition * 0.4 + startShift, 0);

    banner.style.transform = `translateY(${shift}px)`;
  });
}

// Apply header background and active nav glow
function applyHeaderTheme() {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll("nav a");
  if (!header || navLinks.length === 0) return;

  const currentPage = window.location.pathname.split("/").pop();
  const themeColor = pageColors[currentPage] || "#27ae60";

  // Apply header background
  header.style.backgroundColor = themeColor;

  // Highlight active nav link with glow
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");

      link.style.color = themeColor;
      link.style.textShadow = `
        0 0 5px ${themeColor},
        0 0 10px ${themeColor},
        0 0 20px ${themeColor},
        0 0 40px ${themeColor}
      `;
    } else {
      // Reset other links to default color & remove glow
      link.style.color = "";
      link.style.textShadow = "";
    }

    // Optional: Hover effect matches page color
    link.addEventListener("mouseenter", () => {
      link.style.color = themeColor;
      link.style.textShadow = `
        0 0 5px ${themeColor},
        0 0 10px ${themeColor},
        0 0 20px ${themeColor},
        0 0 40px ${themeColor}
      `;
    });
    link.addEventListener("mouseleave", () => {
      if (!link.classList.contains("active")) {
        link.style.color = "";
        link.style.textShadow = "";
      }
    });
  });
}
