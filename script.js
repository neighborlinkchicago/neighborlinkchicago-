console.log("NeighborLink site loaded.");

// Load banner.html content and then insert banner image dynamically
document.addEventListener("DOMContentLoaded", function () {
  const bannerContainer = document.getElementById("banner-container");
  if (!bannerContainer) return;

  fetch("banner.html")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load banner.html");
      return response.text();
    })
    .then(html => {
      bannerContainer.innerHTML = html;

      // Insert banner image dynamically inside #banner-placeholder
      const placeholder = document.getElementById("banner-placeholder");
      if (!placeholder) return;

      const img = document.createElement("img");
      img.className = "banner-image";

      // Use window.bannerData from each page, fallback to default if missing
      const data = window.bannerData || {};
      img.src = data.src || "images/default.jpg";
      img.alt = data.alt || "Banner Image";

      placeholder.appendChild(img);

      // Initialize parallax effect
      initParallax();
    })
    .catch(error => {
      console.error("Error loading banner:", error);
    });
});

// Parallax scroll effect for banner images with initial upward offset
function initParallax() {
  const banner = document.querySelector(".banner-image");
  if (!banner) return;

  document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let startShift = window.innerWidth <= 480 ? -15 : window.innerWidth <= 768 ? -20 : -30;
    let shift = startShift + scrollPosition * 0.25;
    banner.style.transform = `translateY(${shift}px)`;
  });
}
