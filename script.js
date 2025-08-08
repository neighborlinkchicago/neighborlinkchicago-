// You can use this later for filtering resources, handling form data, etc.
console.log("NeighborLink site loaded.");

// Parallax scroll effect for banner images with initial upward offset
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
