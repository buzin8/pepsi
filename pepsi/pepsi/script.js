const hero = document.getElementById("hero");
const stage = document.getElementById("stage");
const thumbsBox = document.getElementById("thumbs");

// Each can: name, page colour, photo
const CANS = {
  pepsi: { name: "Pepsi",         bg: "#0a62c4", img: "images/pepsi.png" },
  retro: { name: "Pepsi Classic", bg: "#e30b2b", img: "images/retro.png" },
  black: { name: "Pepsi Black",   bg: "#1f1b1d", img: "images/black.png" }
};

let uid = 0;
function globe(r) {
  const id = "g" + (uid++);
  return `<defs><clipPath id="${id}"><circle r="${r}"/></clipPath></defs>
  <circle r="${r + 6}" fill="#fff"/>
  <g clip-path="url(#${id})">
    <circle r="${r}" fill="#1b3a9c"/>
    <path d="M-60 -60H60V-26C18 -8 -10 4 -60 8Z" fill="#e4152d"/>
    <path d="M-60 8C-10 4 18 -8 60 -26V-6C20 -2 -12 24 -60 38Z" fill="#fff"/>
  </g>`;
}

function canSVG(type) {
  return `<img src="${CANS[type].img}" alt="${CANS[type].name} can">`;
}

// nav logo
document.getElementById("logo").innerHTML = `<svg viewBox="-56 -56 112 112">${globe(46)}</svg>`;

// thumbnails
Object.keys(CANS).forEach((key, i) => {
  const b = document.createElement("button");
  b.className = "thumb" + (i === 0 ? " active" : "");
  b.dataset.can = key;
  b.setAttribute("aria-label", CANS[key].name);
  b.innerHTML = canSVG(key);
  b.addEventListener("click", () => select(b));
  b.addEventListener("mouseenter", () => select(b)); // hover also switches
  thumbsBox.appendChild(b);
});

function show(key) {
  hero.style.setProperty("--bg", CANS[key].bg);
  stage.innerHTML = canSVG(key);
}
function select(btn) {
  if (btn.classList.contains("active")) return;
  document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  hero.style.setProperty("--bg", CANS[btn.dataset.can].bg);
  stage.classList.add("swap");
  setTimeout(() => { stage.innerHTML = canSVG(btn.dataset.can); stage.classList.remove("swap"); }, 250);
}
show("pepsi");
