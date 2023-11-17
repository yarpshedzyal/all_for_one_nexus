// Объект, представляющий различные стили с флагом checked для отслеживания выбора
let colorsObj = {
  "table-secondary": { checked: true },
  "table-primary": { checked: false },
  "table-dark": { checked: false },
  "table-light": { checked: false },
  "table-info": { checked: false },
  "table-warning": { checked: false }
};

function CheckingStylesTable() {
  // Находим элемент формы и контейнер для переключения стилей
  let CreateFormCheckingStyles = document.querySelector("#CreateFormCheckingStyles");
  let ToggleStyleTable = document.querySelector(".ToggleStyleTable");

  // Генерируем HTML для каждого стиля и добавляем его к форме 
  Object.keys(colorsObj).map((e, i) => {
    CreateFormCheckingStyles.insertAdjacentHTML("beforeend", `
    <div class="form-check mx-2">
      <input class="form-check-input CheckingStylesTable" type="radio" name="StyleTableRadio" id="${e}" ${colorsObj[e].checked ? "checked" : ""}>
      <label class="form-check-label" for="${e}">
        ${e}
      </label>
    </div>
    `);
  });

  // Находим все элементы радио-кнопок
  let CheckingStylesTable = document.querySelectorAll(".CheckingStylesTable");

  // Добавляем обработчик события для каждой радио-кнопки
  CheckingStylesTable.forEach((e) => {
    e.addEventListener("click", () => {
      // Сбрасываем состояние для каждой кнопки и убираем класс ToggleStyleTable
      CheckingStylesTable.forEach((i) => {
        i.removeAttribute("checked");
        colorsObj[i.id].checked = false;
        ToggleStyleTable.classList.remove(i.id);
      });

      // Устанавливаем состояние для выбранной кнопки и добавляем класс ToggleStyleTable
      if (!e.hasAttribute("checked")) {
        e.setAttribute("checked", "");
        colorsObj[e.id].checked = true;
        ToggleStyleTable.classList.add(e.id);
      }

      // Сохраняем состояние в localStorage
      localStorage.setItem("colorsObj", JSON.stringify(colorsObj)); 
    });
  });

  // Восстанавливаем состояние из localStorage при загрузке страницы
  const savedColorsObj = localStorage.getItem("colorsObj");
  if (savedColorsObj) {
    Object.assign(colorsObj, JSON.parse(savedColorsObj));
    CheckingStylesTable.forEach((e) => {
      e.checked = colorsObj[e.id].checked;
      if (e.checked) {
        ToggleStyleTable.classList.add(e.id);
      }
    });
  }
}

export default CheckingStylesTable;
