document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector(".navbar");
  const icon = menuToggle.querySelector("i");
  const navLinks = document.querySelectorAll(".navbar a");

  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
});


// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        document.querySelector(".navbar").style.display = "none";
      }
    }
  });
});

/**********************/
/* COUNTDOWN VERSI 2  */
/* Reset setiap hari  */
/**********************/
function initializeDailyCountdown() {
  // Set waktu target setiap hari jam 23:59:59
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 0);

  // Jika sudah lewat, set untuk hari berikutnya
  if (now > end) {
    end.setDate(end.getDate() + 1);
  }

  function updateCountdown() {
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) {
      // Reset untuk hari berikutnya
      end.setDate(end.getDate() + 1);

      // Update tampilan
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";

      // Update teks penawaran (opsional)
      const countdownElement = document.querySelector(".countdown");
      if (countdownElement) {
        countdownElement.innerHTML =
          "<p>Penawaran hari ini telah berakhir! Kembali besok untuk penawaran baru.</p>";
      }
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  }

  // Jalankan segera dan setiap 1 detik
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

// Panggil fungsi countdown
initializeDailyCountdown();

// Sticky Header on Scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Animation on Scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".intro-card, .benefit-card, .testimonial-card"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Set initial state for animated elements
document
  .querySelectorAll(".intro-card, .benefit-card, .testimonial-card")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

// Run animation check on scroll and load
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
