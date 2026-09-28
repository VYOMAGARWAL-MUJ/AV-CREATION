const products = [
  {name:"Handcrafted Saree", category:"sarees", label:"YOUR SAREE PHOTO", tone:"tone-1"},
  {name:"Handcrafted Suit", category:"suits", label:"YOUR SUIT PHOTO", tone:"tone-2"},
  {name:"Dress Material", category:"suits", label:"YOUR DRESS MATERIAL", tone:"tone-3"},
  {name:"Handcrafted Bed Sheet", category:"bedsheets", label:"YOUR BED SHEET PHOTO", tone:"tone-4"},
  {name:"Printed Bedcover", category:"bedsheets", label:"YOUR BEDCOVER PHOTO", tone:"tone-5"},
  {name:"Handmade Door Hanging", category:"decor", label:"YOUR DOOR HANGING", tone:"tone-6"},
  {name:"Handcrafted Décor", category:"decor", label:"YOUR DÉCOR PHOTO", tone:"tone-7"},
  {name:"New Collection", category:"sarees", label:"ADD YOUR PHOTO", tone:"tone-8"}
];

const names = {sarees:"Sarees", suits:"Suits", bedsheets:"Bed Sheets", decor:"Décor"};
const tones = ["#d7b47a,#8f4f3e","#c9a17e,#76866e","#d4c1a1,#a55b4c","#b88b64,#d9c08b","#d4a875,#7b6250","#80604a,#d8b77a","#b67c62,#e2c99c","#9e7450,#c9b07b"];
const grid = document.getElementById("productGrid");

function renderProducts(filter="all"){
  grid.innerHTML = "";
  products.filter(p => filter === "all" || p.category === filter).forEach((p,i) => {
    const card = document.createElement("article");
    card.className = "product-card";
    const pair = tones[i % tones.length].split(",");
    card.innerHTML = `
      <div class="product-image" style="background:linear-gradient(135deg,${pair[0]},${pair[1]})">
        <span>${p.label}</span>
        <small>${names[p.category]}</small>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>Handcrafted with care and inspired by timeless Indian aesthetics.</p>
        <span class="product-tag">${names[p.category]}</span>
      </div>`;
    grid.appendChild(card);
  });
}
renderProducts();

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section => observer.observe(section));

function submitEnquiry(event){
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const category = form.category.value;
  const message = form.message.value.trim();
  const whatsappNumber = "919873093737";
  const text = encodeURIComponent(
    `Hello AV Creation,\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${category}\n\nEnquiry:\n${message}`
  );
  window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  return false;
}
