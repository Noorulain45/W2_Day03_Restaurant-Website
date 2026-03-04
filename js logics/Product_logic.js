let allProducts = [];

const products = (id, type) => {
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;
      renderProducts(data, id, type);
    })
    .catch((error) => console.error("Error loading menu:", error));
};

function renderProducts(data, id, type) {
  const menuContainer = document.getElementById(id);
  menuContainer.innerHTML = "";

  const items = data.filter((item) => item.type === type);

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "flex justify-between items-center py-4 2xl:py-1 3xl:w-[496px] 3xl:h-[245px] rounded-lg shadow-[0_0_15px_5px_rgba(0,0,0,0.2)] px-5 gap-x-2";

    card.innerHTML = `
      <div class="space-y-4">
        <h1 class="font-bold text-base xl:text-xl">${item.title}</h1>
        <p class="text-[10px] xl:text-sm text-gray-700">${item.description}</p>
        <p class="font-bold text-base md:text-lg">${item.price}</p>
      </div>
      <div class="w-[300px] relative">
        <img src="${item.image}" alt="${item.title}" class="product-image w-full h-auto">
        <button class="add-to-cart absolute right-0 bottom-0 bg-white/90 rounded-tl-3xl p-2"
          data-title="${item.title}"
          data-price="${item.price}"
          data-description="${item.description}"
          data-image="${item.image}">
          <img src="../assets/Plus.png" class="w-6 h-6 3xl:w-auto 3xl:h-auto">
        </button>
      </div>
    `;

    menuContainer.appendChild(card);

    const addToCartBtn = card.querySelector(".add-to-cart");
    addToCartBtn.addEventListener("click", () => {
      const productCard = addToCartBtn.closest("div");
      const imageSrc = productCard.querySelector(".product-image").getAttribute("src");

      const product = {
        title: addToCartBtn.dataset.title,
        price: addToCartBtn.dataset.price,
        description: addToCartBtn.dataset.description,
        image: imageSrc,
      };

      addToCart(product);

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
          fontWeight: "Semibold"
        },
        onClick: function() {
          
        }
      }).showToast();
      console.log("Product added to cart:", product);
    });
  });
}

products("burger-section", "burger");
products("fries-section", "fries");
products("drinks-section", "drinks");

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  ["burger", "fries", "drinks"].forEach((type) => {
    const filtered = allProducts.filter((item) =>
      item.type === type &&
      (item.title.toLowerCase().includes(searchTerm) ||
       item.description.toLowerCase().includes(searchTerm))
    );
    renderProducts(filtered, `${type}-section`, type);
  });
});
