// Toggle Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Loader Control
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // إخفاء اللودر بعد 2 ثواني
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 2000); // 2000 = 2 ثواني
});
