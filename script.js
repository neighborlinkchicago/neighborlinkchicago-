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

      // Now initialize parallax effect
      initParallax();
    })
    .catch(error => {
      console.error("Error loading banner:", error);
    });
});

// Parallax scroll effect for banner images with consistent height
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
