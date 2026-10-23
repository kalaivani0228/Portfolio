// Mobile Navigation

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "✕" : "☰";
});


// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});


// Typing Text Animation

const typingText = document.getElementById("typing-text");

const roles = [
    "Computer Science Student",
    "Aspiring Software Developer",
    "Java Programmer",
    "Web Development Learner"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {
            deleting = true;

            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

    }

    setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();


// Automatically Update Copyright Year

document.getElementById("year").textContent =
    new Date().getFullYear();


// Back to Top Button

const topButton = document.getElementById("top-btn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }

});

topButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// Scroll Reveal Animation

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, " +
    ".project-card, .certification-card, .education-card, .contact-card"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(function (element) {
    observer.observe(element);
});