const cartOverlay = document.getElementById("cart-overlay");
const toggleBtn = document.getElementById("cart-toggle");
const cartBtn = document.getElementById("show-cart-button");

let cart = [];

toggleBtn.addEventListener("click", () => {
  cartOverlay.classList.add("hidden");
});

cartBtn?.addEventListener("click", () => {
  cartOverlay.classList.remove("hidden");
  renderCart();
});

// "Take me back" button inside the cart modal
const cartBackBtn = document.getElementById("cart-back-button");
cartBackBtn?.addEventListener("click", () => {
  cartOverlay.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function addToCart(product) {
  const existing = cart.find((item) => item.title === product.title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemPrice = parseFloat(item.price.replace("GBP", "").trim());
    const subtotal = item.quantity * itemPrice;
    total += subtotal;

    const itemEl = document.createElement("div");
    itemEl.className =
      "flex justify-between items-center bg-gray-100 rounded p-3";

    itemEl.innerHTML = `
      <div class="flex flex-col md:flex-row items-center gap-4">
        <img src="${item.image}" alt="${item.title}" class="w-14 h-14 rounded-full object-cover">
        <div>
          <h3 class="font-bold text-sm">${item.title}</h3>
          <p class="text-xs text-gray-600">${item.description}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="decrease bg-white border px-2 rounded text-lg" data-index="${index}">-</button>
        <span class="font-semibold text-sm">${item.quantity}</span>
        <button class="increase bg-white border px-2 rounded text-lg" data-index="${index}">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  totalDisplay.textContent = `£${total.toFixed(2)}`;

  document.querySelectorAll(".increase").forEach((btn) =>
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      cart[i].quantity += 1;
      renderCart();
    })
  );

  document.querySelectorAll(".decrease").forEach((btn) =>
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      if (cart[i].quantity > 1) {
        cart[i].quantity -= 1;
      } else {
        cart.splice(i, 1);
      }
      renderCart();
    })
  );
}

// Attach cart behavior to slider cards (Burgers / Fries / Cold drinks)
function wireSliderCardsToCart() {
  const sliderCards = document.querySelectorAll(".menu-slider-wrapper article");
  if (!sliderCards.length) return;

  sliderCards.forEach((card) => {
    const addBtn = card.querySelector("button[aria-label='Add item']");
    if (!addBtn) return;

    // Avoid binding twice
    if (addBtn.dataset.cartBound === "true") return;
    addBtn.dataset.cartBound = "true";

    addBtn.addEventListener("click", () => {
      const info = card.querySelector("div.min-w-0");
      if (!info) return;

      const titleEl = info.querySelector("h3");
      const descEl = info.querySelector("p");
      const priceEl = info.querySelector("div.mt-3 p");

      const title = titleEl ? titleEl.textContent.trim() : "Item";
      const description = descEl ? descEl.textContent.trim() : "";
      const priceText = priceEl ? priceEl.textContent.trim() : "";

      const numeric = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;
      const price = `${numeric.toFixed(2)} GBP`;

      const imgEl = card.querySelector("div.relative img");
      const image = imgEl ? imgEl.getAttribute("src") || "" : "";

      const product = { title, description, price, image };

      addToCart(product);

      if (typeof Toastify === "function") {
        Toastify({
          text: `${product.title} added to cart!`,
          duration: 1000,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "Green",
            color: "white",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            fontWeight: "Semibold",
          },
        }).showToast();
      }
    });
  });
}

// Run after DOM is ready (scripts are at the end of body)
wireSliderCardsToCart();
