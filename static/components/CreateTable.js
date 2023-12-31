import ModalWindow from "./ModalWindow.js";
import ParseSelected from "./ParseSelected.js"

async function CreateTable(data, ArrKeys, socket) {
  let ColumnStyle = {}; 
  // Загрузка данных из localStorage при загрузке страницы 
  if (localStorage.getItem("ColumnStyle")) {
    ColumnStyle = JSON.parse(localStorage.getItem("ColumnStyle")); 
  }

  let ObjCustomCheck = JSON.parse(localStorage.getItem("ObjCustomCheck"));

  let newTable = document.querySelector("#newTable");
  let NewTableHeaders = document.querySelector("#NewTableHeaders");
  NewTableHeaders.innerHTML = "";
  newTable.innerHTML = "";
  OldTableHeaders(data, NewTableHeaders, ArrKeys, ObjCustomCheck,ColumnStyle)
  OldTable(data, newTable, ArrKeys, ObjCustomCheck);
  ModalWindow();
  await ParseSelected(data, socket);


  function onMouseDown(e, th) {
    const initialX = e.clientX;
    const initialWidth = th.getBoundingClientRect().width;
  
    function onMouseMove(mousemove) {
      const newWidth = initialWidth + (mousemove.clientX - initialX);
      th.style.width = newWidth + 'px';
    }
  
    function onMouseUp() { 
      const columnName = th.dataset.column;
      ColumnStyle[columnName] = th.style.width;
      localStorage.setItem("ColumnStyle", JSON.stringify(ColumnStyle)); 
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
  
  document.querySelectorAll('.ChangingTheStyle').forEach(function(th) {
    th.addEventListener('mousedown', function(e) {
      onMouseDown(e, th);
    });
  });
  
  

  // let ChangingTheStyle = document.querySelectorAll(".ChangingTheStyle");
  // let inpChangingTheStyle = document.querySelector("#inpChangingTheStyle");
  // let SaveChangesColumnWidth = document.querySelector("#SaveChangesColumnWidth");

  // let columnName;
  // let ElTarget;
  // ChangingTheStyle.forEach((el) => {
  //   el.addEventListener("click", (etarget) => {
  //     // Сохранение данных в объект ColumnStyle при клике
  //     columnName = el.dataset.column; 
  //     ElTarget = etarget.target;
  //   }); 
  // });
 
  // SaveChangesColumnWidth.addEventListener("click", () => {  
  //   columnName = el.dataset.column; 
  //   ColumnStyle[columnName] = inpChangingTheStyle.value;
  //   localStorage.setItem("ColumnStyle", JSON.stringify(ColumnStyle)); 
  //   ElTarget.style.width = inpChangingTheStyle.value+"px";
  // }); 

}
function OldTableHeaders(data, NewTableHeaders, ArrKeys, ObjCustomCheck,ColumnStyle) {
  console.log(ColumnStyle);
  NewTableHeaders.insertAdjacentHTML("beforeend", `
  <th scope="col" ${ObjCustomCheck && ObjCustomCheck["checkbox"] === undefined ? "" : `data-display=${ObjCustomCheck && ObjCustomCheck["checkbox"].checked}`} data-column="checkbox">
    <button class="noStyleBtn CheckAll"><strong>All</strong></button>
  </th>
  <th scope="col" ${ObjCustomCheck && ObjCustomCheck["index"] === undefined ? "" : `data-display=${ObjCustomCheck && ObjCustomCheck["index"].checked}`} data-column="index" title="#">#</th>  
  `)
  // openW
  ArrKeys.forEach((Key, index) => {  
    NewTableHeaders.insertAdjacentHTML("beforeend", `  
    ${data.items[0][Key] === undefined ? "" : `<th class="ChangingTheStyle" data-targetmodal="#ChangingTheStyle" scope="col" ${ObjCustomCheck && ObjCustomCheck[Key] === undefined ? "" : `data-display=${ObjCustomCheck && ObjCustomCheck[Key].checked}`} data-column="${Key}" title='${data.items[0][Key] === undefined ? "" : Key}'
    ${ColumnStyle[Key] === undefined ? "" : `style="width:${ColumnStyle[Key]}"`} >${Key}</th>`
      } 
   `);
  })
}

function OldTable(data, newTable, ArrKeys, ObjCustomCheck) {
  data.items.map((e, i) => {
    newTable.insertAdjacentHTML("beforeend", `
    <tr>
      <td data-column="checkbox" ${ObjCustomCheck && ObjCustomCheck["checkbox"] === undefined ? "" : `data-display=${ObjCustomCheck && ObjCustomCheck["checkbox"].checked}`}><input class="InpSelected"   type="checkbox" name="selected_product" value="${e._id.$oid}" title="${e._id.$oid}"></td>
      <td class="openW" ${ObjCustomCheck && ObjCustomCheck["index"] === undefined ? "" : `data-display=${ObjCustomCheck && ObjCustomCheck["index"].checked}`} data-column="index" data-targetmodal="#columnindex" scope="row" title="${i}">${i +1}</td>
      ${ArrKeys.map((key) => `
        ${e[key] === undefined ? "" : `<td ${ObjCustomCheck && ObjCustomCheck[key] === undefined ? "" : `data-display=${ObjCustomCheck && ObjCustomCheck[key].checked}`} data-column="${key}" title='${e[key] === undefined ? "" : e[key]}'> 
        ${key === "WSlink" || key === "ThrLink" ? `<a href="${e[key]}" target="_blank">${e[key]}</a>` : e[key]}
        </td>`}
      `).join('')}
    </tr> 
    `);
  });
}

export default CreateTable;
