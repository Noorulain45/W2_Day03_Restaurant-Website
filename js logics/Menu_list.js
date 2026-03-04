
const menuItems = [
  { name: "Offers", active: true },
  { name: "Burgers" },
  { name: "Fries" },
  { name: "Snacks" },
  { name: "Salads" },
  { name: "Cold drinks" },
  { name: "Happy Meal®" },
  { name: "Desserts" },
  { name: "Hot drinks" },
  { name: "Sauces" },
  { name: "Orbit®" }
];

function populateMenu() {
  const menuList = document.getElementById('menu-list');

  function setSliderVisibility(selectedName) {
    const sliderGroups = document.querySelectorAll("[data-slider-category]");
    if (!sliderGroups.length) return;

    const name = (selectedName || "").trim().toLowerCase();

    // Offers = show all slider groups
    if (name === "offers") {
      sliderGroups.forEach((el) => (el.style.display = ""));
      return;
    }

    // Show only the slider group whose category matches the menu tab name
    let matchedAny = false;
    sliderGroups.forEach((el) => {
      const category = (el.getAttribute("data-slider-category") || "").trim().toLowerCase();
      const show = category === name;
      if (show) matchedAny = true;
      el.style.display = show ? "" : "none";
    });

    // If the selected tab isn't represented in the slider groups, keep them all visible.
    if (!matchedAny) {
      sliderGroups.forEach((el) => (el.style.display = ""));
    }
  }
  
  menuItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.href = "#";
    a.className = `inline-block px-3 py-1 md:px-4 md:py-2 hover:bg-orange-700 rounded-full transition-colors ${
      item.active ? 'bg-black' : ''
    }`;
    a.textContent = item.name;
    

    a.addEventListener('click', (e) => {
      e.preventDefault();

      document.querySelectorAll('#menu-list a').forEach(link => {
        link.classList.remove('bg-black');
      });

      a.classList.add('bg-black');
      setSliderVisibility(item.name);
    });
    
    li.appendChild(a);
    menuList.appendChild(li);
  });

  // Initialize slider visibility based on the initially active item
  const active = menuItems.find((m) => m.active) || menuItems[0];
  if (active) setSliderVisibility(active.name);
}


document.addEventListener('DOMContentLoaded', populateMenu);

