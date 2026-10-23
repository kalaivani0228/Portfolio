
// ===== EMAIL SETTINGS =====
// Replace this with your real email address.
const YOUR_EMAIL = "YOUR_EMAIL@example.com";

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const toast = document.getElementById("toast");

let toastTimer;

// Show a small message on the page
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// ===== DARK AND LIGHT THEME =====
if (localStorage.getItem("portfolioTheme") === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeButton() {
    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "🌙" : "☀️";
    themeToggle.title = isLight ? "Switch to dark mode" : "Switch to light mode";
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    localStorage.setItem("portfolioTheme", isLight ? "light" : "dark");

    updateThemeButton();
});

// ===== MOBILE MENU =====
menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// ===== TYPING ANIMATION =====
const typingText = document.getElementById("typingText");

const roles = [
    "Computer Science Student",
    "Web Developer",
    "Creative Learner",
    "Future Software Engineer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];

    characterIndex += deleting ? -1 : 1;

    typingText.textContent = currentRole.substring(0, characterIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1200;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
    }

    setTimeout(typeRole, delay);
}

typeRole();

// ===== CLICKABLE PROJECT CARDS =====
document.querySelectorAll(".project-card").forEach(card => {
    function toggleProject() {
        const expanded = card.classList.toggle("expanded");
        const link = card.querySelector(".project-link");

        link.textContent = expanded
            ? "Show less ↑"
            : "Click to explore ↗";
    }

    card.addEventListener("click", toggleProject);

    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleProject();
        }
    });
});

// ===== SCROLL REVEAL EFFECT =====
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

// ===== ACTIVE NAVIGATION =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#navbar a");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// ===== FOOTER YEAR =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== EMAIL BUTTON =====
const emailButton = document.getElementById("emailButton");
const copyEmailButton = document.getElementById("copyEmail");

emailButton.href = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent("Portfolio Contact")}`;

emailButton.addEventListener("click", event => {
    if (YOUR_EMAIL === "YOUR_EMAIL@example.com") {
        event.preventDefault();
        showToast("Replace YOUR_EMAIL in script.js with your actual email first.");
    }
});

// ===== COPY EMAIL BUTTON =====
copyEmailButton.addEventListener("click", async () => {
    if (YOUR_EMAIL === "YOUR_EMAIL@example.com") {
        showToast("Add your actual email address in script.js first.");
        return;
    }

    try {
        await navigator.clipboard.writeText(YOUR_EMAIL);
        showToast("Email address copied successfully!");
    } catch {
        showToast("Your email address is: " + YOUR_EMAIL);
    }
});

// ===== PROFILE PHOTO FALLBACK =====
const profilePhoto = document.getElementById("profilePhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");

function showPhotoPlaceholder() {
    profilePhoto.style.display = "none";
    photoPlaceholder.style.display = "block";
}

profilePhoto.addEventListener("error", showPhotoPlaceholder);

profilePhoto.addEventListener("load", () => {
    profilePhoto.style.display = "block";
    photoPlaceholder.style.display = "none";
});

if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
    showPhotoPlaceholder();
}
