// ================= PRELOADER =================

window.addEventListener("load", function () {

    const preloader = document.querySelector(".preloader");

    if (!preloader) return;

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";

        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);

    }, 700);

});


// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {

        menuBtn.innerHTML = "✕";

    } else {

        menuBtn.innerHTML = "☰";

    }

});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuBtn.innerHTML = "☰";

    });

});


// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a:not(.nav-button)");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .stat-card, .skill-card, .project-card, .service-card, .contact-info, .contact-form"
);

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


// ================= CONTACT FORM =================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const button = contactForm.querySelector("button");

        button.innerHTML = "Message Ready ✓";

        button.style.background =
            "linear-gradient(135deg,#20b26b,#159957)";

        setTimeout(() => {

            button.innerHTML = "Send Message ↗";

            button.style.background = "";

            contactForm.reset();

        }, 2500);

    });
}