console.log("NeighborLink site loaded.");

// Define page-specific header and glow colors
const pageColors = {
  "index.html":      { header: "#4a90e2", glow: "rgba(74,144,226,0.85)" }, // Home - blue
  "about.html":      { header: "#2a9d8f", glow: "rgba(45,157,143,0.85)" }, // About - teal
  "resources.html":  { header: "#7e57c2", glow: "rgba(126,87,194,0.85)" }, // Resources - purple
  "housing.html":    { header: "#2a7a34", glow: "rgba(42,122,52,0.85)" },  // Housing - green
  "contact.html":    { header: "#e67e22", glow: "rgba(230,126,34,0.85)" }, // Contact - orange
};

// Wait for DOM
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

        // Insert banner image
        const placeholder = document.getElementById("banner-placeholder");
        if (placeholder) {
          const img = document.createElement("img");
          img.className = "banner-image";
          const data = window.bannerData || {};
          img.src = data.src || "images/default.jpg";
          img.alt = data.alt || "Banner Image";
          placeholder.appendChild(img);

          // Initialize parallax
          initParallax();
        }

        // Highlight active nav link and set header color
        applyPageColors();
      })
      .catch(error => console.error("Error loading banner:", error));
  } else {
    // If no banner, still apply colors
    applyPageColors();
  }
});

// Parallax effect
function initParallax() {
  document.addEventListener("scroll", function () {
    const banner = document.querySelector(".banner-image");
    if (!banner) return;

    let scrollPosition = window.scrollY;
    let startShift = window.innerWidth <= 600 ? -40 : -30;
    let shift = Math.min(scrollPosition * 0.4 + startShift, 0);

    banner.style.transform = `translateY(${shift}px)`;
  });
}

// Highlight active nav link and apply header/glow colors
function applyPageColors() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const colors = pageColors[currentPage] || pageColors["index.html"];

  // Set header background color
  const header = document.querySelector("header");
  if (header) header.style.background = colors.header;

  // Highlight active link and set glow color
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.style.textShadow = `
        0 0 6px ${colors.glow},
        0 0 14px ${colors.glow},
        0 0 26px ${colors.glow}
      `;
      link.style.boxShadow = `
        0 0 0 2px ${colors.glow},
        0 0 18px 2px ${colors.glow}
      `;
    } else {
      link.classList.remove("active");
      link.style.textShadow = "";
      link.style.boxShadow = "";
    }
  });
}
