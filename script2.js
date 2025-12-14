document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("dynamic-menu");
  let currentData = null;
  async function loadMenu() {
    try {
      const response = await fetch("get_menu.php");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const dataString = JSON.stringify(data);
      if (dataString !== currentData) {
        currentData = dataString;
        renderMenu(data.menu || []);
      }
    } catch (err) {
      console.error("Помилка при завантаженні меню:", err);
    }
  }

  function renderMenu(menuData) {
    menuContainer.innerHTML = "";
    const nav = document.createElement("nav");
    nav.className = "menu";
    const topUl = document.createElement("ul");
    menuData.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = item.label;
      a.href = item.link || "#";
      li.appendChild(a);
      if (Array.isArray(item.subitems) && item.subitems.length > 0) {
        const subUl = document.createElement("ul");
        item.subitems.forEach((sub) => {
          const subLi = document.createElement("li");
          const subA = document.createElement("a");
          subA.textContent = sub.label;
          subA.href = sub.link || "#";
          subLi.appendChild(subA);
          subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
      }
      topUl.appendChild(li);
    });
    nav.appendChild(topUl);
    menuContainer.appendChild(nav);
  }

  loadMenu();
  setInterval(loadMenu, 5000);
});
