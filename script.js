console.log("NeighborLink site loaded.");

// Define static colors for each page
const pageColors = {
  "index.html":      { header: "#4a90e2", activeLink: "#ffffff" }, // Home - blue
  "about.html":      { header: "#2a9d8f", activeLink: "#ffffff" }, // About - teal
  "resources.html":  { header: "#7e57c2", activeLink: "#ffffff" }, // Resources - purple
  "housing.html":    { header: "#2a7a34", activeLink: "#ffffff" }, // Housing - green
  "contact.html":    { header: "#e67e22", activeLink: "#ffffff" }, // Contact - orange
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
        }

        // Apply static colors for header and active link
        applyPageColors();
      })
      .catch(error => console.error("Error loading banner:", error));
  } else {
    applyPageColors();
  }
});

// Apply static colors
function applyPageColors() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const colors = pageColors[currentPage] || pageColors["index.html"];

  // Set header background color
  const header = document.querySelector("header");
  if (header) header.style.background = colors.header;

  // Highlight active nav link
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.style.color = colors.activeLink;
      link.style.textShadow = "none"; // Remove glow
      link.style.boxShadow = "none";   // Remove glow
      link.style.background = "none";  // Remove pill effect if any
    } else {
      link.classList.remove("active");
      link.style.color = "";           // reset color for inactive links
      link.style.textShadow = "";
      link.style.boxShadow = "";
      link.style.background = "";
    }
  });
}
