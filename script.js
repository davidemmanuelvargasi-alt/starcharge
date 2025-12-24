/* ===== MENU ===== */
const menuOverlay = document.getElementById("menuOverlay");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");

function setMenu(open){
  if(open){
    menuOverlay.classList.add("active");
    menuOverlay.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  } else {
    menuOverlay.classList.remove("active");
    menuOverlay.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }
}

openMenu?.addEventListener("click", ()=> setMenu(true));
closeMenu?.addEventListener("click", ()=> setMenu(false));

menuOverlay?.addEventListener("click", (e)=>{
  if(e.target === menuOverlay) setMenu(false);
});

document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape" && menuOverlay.classList.contains("active")) setMenu(false);
});

document.querySelectorAll("[data-close-menu]").forEach(a=>{
  a.addEventListener("click", ()=> setMenu(false));
});


/* ===== BACKGROUNDS (fix imágenes que no cargan) =====
   - aplica la imagen como background de .bg
   - precarga con Image()
   - si falla: deja fallback oscuro (no se ve feo)
*/
document.querySelectorAll(".panel").forEach(panel => {
  const url = panel.getAttribute("data-bg");
  const bg = panel.querySelector(".bg");
  if(!url || !bg) return;

  const img = new Image();
  img.referrerPolicy = "no-referrer"; // ayuda en algunos hosts
  img.onload = () => {
    bg.style.backgroundImage = `
      radial-gradient(900px 520px at 50% 20%, rgba(255,255,255,.06), transparent 60%),
      linear-gradient(180deg, rgba(0,0,0,.20), rgba(0,0,0,.86)),
      url("${url}")
    `;
  };
  img.onerror = () => {
    // fallback: solo gradientes (tech oscuro)
    bg.style.backgroundImage = `
      radial-gradient(900px 520px at 50% 20%, rgba(255,255,255,.08), transparent 60%),
      linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.90))
    `;
  };
  img.src = url;
});
