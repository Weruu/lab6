document.addEventListener("DOMContentLoaded", () => {
  const addItemBtn = document.getElementById("add-menu-item");
  const itemsContainer = document.getElementById("menu-items");
  const saveBtn = document.getElementById("save-menu");

  function createMenuItem() {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <label>Назва пункту меню:
        <input type="text" class="menu-label" placeholder="Наприклад: Про нас">
      </label>
      <label>Посилання (URL):
        <input type="text" class="menu-link" placeholder="https://example.com">
      </label>
      <div class="subitems-container"></div>
      <button type="button" class="add-subitem">Додати підпункт</button>
      <button type="button" class="remove-menu-item">Видалити пункт</button>
    `;
    itemsContainer.appendChild(div);
  }

  addItemBtn.addEventListener("click", () => {
    createMenuItem();
  });

  itemsContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("add-subitem")) {
      const menuItem = target.parentElement;
      const subContainer = menuItem.querySelector(".subitems-container");
      const subDiv = document.createElement("div");
      subDiv.className = "subitem";
      subDiv.innerHTML = `
        <label>Назва підпункту:
          <input type="text" class="sub-label" placeholder="Наприклад: Команда">
        </label>
        <label>Посилання (URL):
          <input type="text" class="sub-link" placeholder="https://example.com/sub">
        </label>
        <button type="button" class="remove-subitem">Видалити підпункт</button>
      `;
      subContainer.appendChild(subDiv);
    } else if (target.classList.contains("remove-menu-item")) {
      target.parentElement.remove();
    } else if (target.classList.contains("remove-subitem")) {
      target.parentElement.remove();
    }
  });

  saveBtn.addEventListener("click", () => {
    const menuData = [];
    document.querySelectorAll(".menu-item").forEach((item) => {
      const label = item.querySelector(".menu-label").value.trim();
      const link = item.querySelector(".menu-link").value.trim();
      if (!label) {
        return;
      }
      const subitems = [];
      item.querySelectorAll(".subitem").forEach((sub) => {
        const subLabel = sub.querySelector(".sub-label").value.trim();
        const subLink = sub.querySelector(".sub-link").value.trim();
        if (subLabel) {
          subitems.push({ label: subLabel, link: subLink });
        }
      });
      menuData.push({ label, link, subitems });
    });
    fetch("save_data.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ menu: menuData }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result.status === "success") {
          alert("Меню успішно збережено!");
        } else {
          alert(
            "Помилка під час збереження: " +
              (result?.message || "невідома помилка")
          );
        }
      })
      .catch(() => {
        alert(
          "Не вдалося зв’язатися з сервером. Перевірте налаштування PHP/серверу."
        );
      });
  });
});
