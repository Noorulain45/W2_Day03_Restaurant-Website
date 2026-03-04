const navItems = [
  { name: "Home", isActive: true },
  { name: "Special Offers", isActive: false },
  { name: "Restaurant", isActive: false },
  { name: "Track Order", isActive: false },
];

function renderNavbar() {
  const navUl = document.querySelector("#navbar");

  navUl.innerHTML = "";

  navItems.forEach((item, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "#";
    a.textContent = item.name;
    a.className = `px-4 py-2 rounded-3xl transition-colors ${
      item.isActive
        ? "bg-[#FC8A06] text-white font-medium"
        : "hover:bg-gray-100"
    }`;

    a.addEventListener("click", (e) => {
      e.preventDefault();

      navItems.forEach((navItem, i) => {
        navItem.isActive = i === index;
      });

      renderNavbar();
    });

    li.appendChild(a);
    navUl.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderNavbar);

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementsByClassName("mobile-menu")[0];

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});