/* ============================================================
   Mukund M K — Portfolio interactions
   ============================================================ */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Nav: scrolled state + mobile toggle ---------- */
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
  // Scroll progress bar
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById("progress").style.width = scrolled + "%";
});

function closeMenu() {
  links.classList.remove("open");
  toggle.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
});
const navClose = document.getElementById("navClose");
if (navClose) navClose.addEventListener("click", closeMenu);
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
// Close the menu with Escape
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

/* ---------- Rotating subtitle words ---------- */
const rotator = document.getElementById("rotator");
const words = [
  "intelligent applications",
  "AI-powered assistants",
  "LLM workflows",
  "Flutter mobile apps",
  "things people love",
];
let wi = 0;
if (rotator && !prefersReduced) {
  setInterval(() => {
    rotator.style.opacity = "0";
    rotator.style.transform = "translateY(-8px)";
    rotator.style.transition = "opacity .3s, transform .3s";
    setTimeout(() => {
      wi = (wi + 1) % words.length;
      rotator.textContent = words[wi];
      rotator.style.opacity = "1";
      rotator.style.transform = "translateY(0)";
    }, 300);
  }, 2600);
}

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(
  ".section__title, .about__text, .stat-card, .tl-item, .mentor-card, .skill-card, .soft-card, .project-card, .edu-card, .ach-card, .hobby-card, .inspire-card, .contact, .hero__content"
);
revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = Math.min((i % 6) * 0.07, 0.4) + "s";
});
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- 3D tilt on cards ---------- */
if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

/* ---------- Particle network background ---------- */
(function particles() {
  if (prefersReduced) return;
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let w, h, pts, mouse = { x: -999, y: -999 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((w * h) / 16000));
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
  }
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseleave", () => { mouse.x = -999; mouse.y = -999; });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // draw node
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(45,212,191,0.55)";
      ctx.fill();

      // connect to nearby points
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(120,220,235,${0.14 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      // connect to mouse
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < 180) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255,126,107,${0.25 * (1 - mdist / 180)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ---------- Drawing gallery toggle ---------- */
(function drawToggle() {
  const btn = document.getElementById("drawToggle");
  const gallery = document.getElementById("drawGallery");
  if (!btn || !gallery) return;
  btn.addEventListener("click", () => {
    const willShow = gallery.hasAttribute("hidden");
    if (willShow) {
      gallery.removeAttribute("hidden");
      btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Hide drawings';
      btn.setAttribute("aria-expanded", "true");
    } else {
      gallery.setAttribute("hidden", "");
      btn.innerHTML = '<i class="fa-solid fa-images"></i> View my drawings';
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

/* ---------- Lightbox gallery ---------- */
(function lightbox() {
  const box = document.getElementById("lightbox");
  if (!box) return;
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCap");
  const photos = Array.from(document.querySelectorAll(".edu-photo, .draw-thumb, .proj-shot"));
  let idx = 0;

  function show(i) {
    idx = (i + photos.length) % photos.length;
    const btn = photos[idx];
    img.src = btn.dataset.full;
    img.alt = btn.dataset.cap || "";
    cap.innerHTML = btn.dataset.cap || "";
  }
  function open(i) { show(i); box.classList.add("open"); box.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function close() { box.classList.remove("open"); box.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

  photos.forEach((btn, i) => btn.addEventListener("click", () => open(i)));
  document.getElementById("lightboxClose").addEventListener("click", close);
  document.getElementById("lightboxNext").addEventListener("click", () => show(idx + 1));
  document.getElementById("lightboxPrev").addEventListener("click", () => show(idx - 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
})();

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__links a");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => spy.observe(s));
