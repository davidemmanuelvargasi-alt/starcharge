// ===== MENU (animación suave) =====
const menuOverlay = document.getElementById("menuOverlay");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");

function openDrawer(){
  menuOverlay.classList.add("active");
  menuOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // evita scroll atrás
}

function closeDrawer(){
  menuOverlay.classList.remove("active");
  menuOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // restaura scroll
}

openMenu?.addEventListener("click", openDrawer);
closeMenu?.addEventListener("click", closeDrawer);

// cerrar tocando fuera del panel
menuOverlay?.addEventListener("click", (e) => {
  if (e.target === menuOverlay) closeDrawer();
});

// cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuOverlay.classList.contains("active")) closeDrawer();
});

// cerrar al dar click en links del menú
document.querySelectorAll(".menu-item").forEach(a => {
  a.addEventListener("click", () => closeDrawer());
});


// ===== SLIDER (auto + dots + swipe) =====
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));

let index = 0;
let timer = null;
const INTERVAL = 6000; // 6s

function setBackgrounds(){
  slides.forEach(slide => {
    const bg = slide.getAttribute("data-bg");
    if (bg) slide.style.backgroundImage = `url("${bg}")`;
  });
}

function showSlide(i){
  index = (i + slides.length) % slides.length;

  slides.forEach((s, k) => s.classList.toggle("is-active", k === index));
  dots.forEach((d, k) => d.classList.toggle("is-on", k === index));
}

function startAuto(){
  stopAuto();
  timer = setInterval(() => showSlide(index + 1), INTERVAL);
}

function stopAuto(){
  if (timer) clearInterval(timer);
  timer = null;
}

// Dots click
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    startAuto();
  });
});

// Swipe (touch)
let startX = 0;
let startY = 0;
let tracking = false;

function onTouchStart(e){
  const t = e.touches[0];
  startX = t.clientX;
  startY = t.clientY;
  tracking = true;
}

function onTouchMove(e){
  if (!tracking) return;
  const t = e.touches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;

  // si está scrolleando vertical, no interferir
  if (Math.abs(dy) > Math.abs(dx)) return;

  // evita scroll horizontal raro
  e.preventDefault();
}

function onTouchEnd(e){
  if (!tracking) return;
  tracking = false;

  const t = e.changedTouches[0];
  const dx = t.clientX - startX;

  if (Math.abs(dx) > 40){
    if (dx < 0) showSlide(index + 1);
    else showSlide(index - 1);
    startAuto();
  }
}

const slider = document.querySelector(".slider");
slider?.addEventListener("touchstart", onTouchStart, { passive: true });
slider?.addEventListener("touchmove", onTouchMove, { passive: false });
slider?.addEventListener("touchend", onTouchEnd, { passive: true });

// Init
setBackgrounds();
showSlide(0);
startAuto();
