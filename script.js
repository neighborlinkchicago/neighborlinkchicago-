// You can use this later for filtering resources, handling form data, etc.
console.log("NeighborLink site loaded.");

// Load banner.html content into #banner-container dynamically
document.addEventListener("DOMContentLoaded", function () {
  const bannerContainer = document.getElementById("banner-container");
  if (!bannerContainer) return;

  fetch("banner.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load banner.html");
      }
      return response.text();
    })
    .then((html) => {
      bannerContainer.innerHTML = html;
      // Banner loaded, now you can safely add parallax effect on the loaded banner-image
      initParallax();
    })
    .catch((error) => {
      console.error("Error loading banner:", error);
    });
});

// Parallax scroll effect for banner images with initial upward offset
function initParallax() {
  document.addEventListener("scroll", function () {
    const banner = document.querySelector(".banner-image");
    if (!banner) return; // Avoid errors if page has no banner

    let scrollPosition = window.scrollY;

    // Determine initial upward shift based on screen width
    let startShift = window.innerWidth <= 600 ? -70 : -50;

    // Calculate the new transform position (max 0, so it doesn't move beyond initial container)
    let shift = Math.min(scrollPosition * 0.5 + startShift, 0);

    banner.style.transform = `translateY(${shift}px)`;
  });
}
