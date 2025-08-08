// You can use this later for filtering resources, handling form data, etc.
console.log("NeighborLink site loaded.");

// Parallax scroll effect for banner images
document.addEventListener("scroll", function () {
  const banner = document.querySelector(".banner-image");
  if (!banner) return; // Avoid errors if page has no banner
  let scrollPosition = window.scrollY;
  banner.style.transform = `translateY(${scrollPosition * 0.4}px)`;
});
