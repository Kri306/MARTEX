// =========================
// COMPONENT LOADER
// =========================
async function loadComponent(id, file) {
  try {
    const res = await fetch(file);

    if (!res.ok) {
      throw new Error(`Failed to load ${file} (${res.status})`);
    }

    const data = await res.text();
    document.getElementById(id).innerHTML = data;
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header", "components/header.html");
  // await loadComponent("hero", "components/hero.html");

  await loadComponent("features", "components/features.html");
  await loadComponent("featureContent", "components/feature-content.html");
  await loadComponent("featureAnalytics", "components/feature-analytics.html");

  await loadComponent("social", "components/social-marketing.html");
  await loadComponent("counter", "components/counter.html");

  await loadComponent("smartWay", "components/smart-way.html");
  await loadComponent("smartSolutions", "components/smart-solution.html");

  await loadComponent("integration", "components/integration-section.html");
  await loadComponent("videoPreview", "components/video-preview.html");

  await loadComponent("brands", "components/brands-section.html");
  await loadComponent("completeSolutions", "components/solutions-section.html");

  await loadComponent("workflow", "components/workflow-section.html");
  await loadComponent("insights", "components/insights-section.html");

  await loadComponent("process", "components/process-section.html");
  await loadComponent("testimonial", "components/testimonial-section.html");

  // await loadComponent("rating", "components/rating-section.html");
  await loadComponent("integrations", "components/integrations-section.html");

  await loadComponent("faq", "components/faq-section.html");
  await loadComponent("banner", "components/last-banner.html");

  await loadComponent("footer", "components/footer.html");

  // ✅ After loading all sections, your JS code should run here
  initScripts();
});

// =========================
// ALL OLD JS CODE (COMBINED)
// =========================
function initScripts() {
  // ==========logo=======
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".main-logo");

    if (!navbar || !logo) return;

    navbar.classList.toggle("scrolled", window.scrollY > 60);

    if (window.scrollY > 60) logo.src = "images/logo-pink.png";
    else logo.src = "images/logo-white.png";
  });

  // ========counter==========
  const counters = document.querySelectorAll(".counter");

  function animateCounter(counter) {
    const target = parseFloat(counter.getAttribute("data-target"));
    const suffix = counter.getAttribute("data-suffix") || "";
    const isDecimal = counter.getAttribute("data-decimal") === "true";

    const duration = 1200;
    const startTime = performance.now();

    function update(time) {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = target * progress;

      counter.textContent = isDecimal ? value.toFixed(2) : Math.floor(value) + suffix;

      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = isDecimal ? target : target + suffix;
    }

    requestAnimationFrame(update);
  }

  if (counters.length > 0) {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
  }

  // ==========brand slider========
  const track = document.getElementById("brandsTrack");
  const itemWidth = 258;

  if (track) {
    setInterval(() => {
      track.style.transform = `translateX(-${itemWidth}px)`;

      setTimeout(() => {
        track.appendChild(track.firstElementChild);
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        track.offsetHeight;
        track.style.transition = "transform 0.4s ease";
      }, 400);
    }, 1000);
  }

  //==================== review slider==================
  const track1 = document.querySelector(".testimonial-track");
  const dots = document.querySelectorAll(".dot");
  const cards = document.querySelectorAll(".testimonial-card");

  if (track1 && cards.length > 0) {
    const visibleCards = 3;
    const cardWidth = 350 + 30; // 380px
    let index = 0;

    for (let i = 0; i < visibleCards; i++) {
      track1.appendChild(cards[i].cloneNode(true));
    }

    const totalCards = cards.length;
    const slideSpeed = 800;
    const delay = 2500;

    function slide() {
      index++;

      track1.style.transition = `transform ${slideSpeed}ms ease`;
      track1.style.transform = `translateX(-${index * cardWidth}px)`;

      dots.forEach(d => d.classList.remove("active"));
      if (dots.length > 0) dots[index % visibleCards].classList.add("active");

      if (index === totalCards) {
        setTimeout(() => {
          track1.style.transition = "none";
          track1.style.transform = "translateX(0)";
          index = 0;
        }, slideSpeed);
      }
    }

    setInterval(slide, delay);
  }
}
