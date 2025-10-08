// ===== Mobile Menu Toggle =====
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    // Toggle menu on hamburger click
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("show");

      // Prevent body scroll when menu is open
      if (navLinks.classList.contains("show")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on nav links
    const navLinksItems = navLinks.querySelectorAll("a");
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("show");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("show") &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("show");
        document.body.style.overflow = "";
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("show")) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("show");
        document.body.style.overflow = "";
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768 && navLinks.classList.contains("show")) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }
});

// ===== Smooth Scrolling for Navigation Links =====
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// ===== Header Scroll Effect =====
let lastScrollTop = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }

  lastScrollTop = currentScroll;
});

// ===== Button Click Animations =====
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn, .header-cta");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.height, rect.width);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .btn, .header-cta {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);
