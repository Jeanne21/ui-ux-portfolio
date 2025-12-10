// Smooth scroll
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth" });
    });
});

// Example form handler (does nothing but prevent reload)
document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks! Your message has been sent.");
});
