let currentLanguage = "en";
const languageBtn = document.getElementById("languageBtn");

function whatsappLink(message) {
  const number = SHOP_WHATSAPP_NUMBER;
  if (!/^\d{10,15}$/.test(number)) return "#";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
function renderProducts() {
  const grid = document.getElementById("collection");
  grid.innerHTML = PRODUCTS.map(p => {
    const name = currentLanguage === "mr" ? p.mr : p.name;
    const msg = `Hello Ojas Arts Creations, I am interested in ${p.name} (${p.code}). Please share availability, final price and delivery details.`;
    const link = whatsappLink(msg);
    return `<article class="product-card">
      <div class="product-photo" role="img" aria-label="Add product photo for ${p.name}">✿</div>
      <h3>${name}</h3><p>${p.note} · ${p.size}</p>
      <span class="price">${p.price}</span>
      <a class="order-link" href="${link}" ${link==="#"?"aria-disabled=true":'target="_blank" rel="noopener"'}>${currentLanguage==="mr"?"WhatsApp वर चौकशी करा":"Enquire on WhatsApp"} →</a>
    </article>`;
  }).join("");
}
function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = lang === "mr" ? el.dataset.mr : el.dataset.en;
  });
  languageBtn.textContent = lang === "mr" ? "English" : "मराठी";
  renderProducts();
}
languageBtn.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "mr" : "en"));
document.getElementById("mainWhatsApp").addEventListener("click", e => {
  const link = whatsappLink("Hello Ojas Arts Creations, please share your rangoli catalogue, prices and delivery details.");
  if (link === "#") { e.preventDefault(); alert("Please add the parent-managed WhatsApp number in products.js before publishing."); }
  else e.currentTarget.href = link;
});
renderProducts();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}