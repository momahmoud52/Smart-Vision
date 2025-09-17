// Toggle Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Loader Control
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // إخفاء اللودر بعد 6 ثواني
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 6000); // 6000 = 6 ثواني
});
