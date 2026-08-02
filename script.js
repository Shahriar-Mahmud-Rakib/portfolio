document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close mobile menu after clicking a menu item
const navItems = document.querySelectorAll("#nav-links a");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
