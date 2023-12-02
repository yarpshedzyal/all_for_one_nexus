 import ModalWindow from "./ModalWindow.js";
 import ParseSelected from "./ParseSelected.js"

async function CreateTable(data , ArrKeys, socket) {
  let ObjCustomCheck = JSON.parse(localStorage.getItem("ObjCustomCheck")); 
 
  let newTable = document.querySelector("#newTable");
  let NewTableHeaders = document.querySelector("#NewTableHeaders");
  NewTableHeaders.innerHTML ="";
  newTable.innerHTML="";
  OldTableHeaders(data, NewTableHeaders, ArrKeys,ObjCustomCheck)
  OldTable(data, newTable, ArrKeys,ObjCustomCheck);
  ModalWindow();
  await ParseSelected(data, socket);
}
function OldTableHeaders(data, NewTableHeaders , ArrKeys,ObjCustomCheck) {
  NewTableHeaders.insertAdjacentHTML("beforeend",`
  <th scope="col" ${ObjCustomCheck && ObjCustomCheck["checkbox"] === undefined ?"" : `data-display=${ObjCustomCheck && ObjCustomCheck["checkbox"].checked}`} data-column="checkbox">
    <button class="noStyleBtn CheckAll"><strong>All</strong></button>
  </th>
  <th scope="col" ${ObjCustomCheck && ObjCustomCheck["index"] === undefined ?"" : `data-display=${ObjCustomCheck && ObjCustomCheck["index"].checked}`} data-column="index" title="#">#</th>  
  `)
  
  ArrKeys.forEach((Key, index)=>{ 
 
    NewTableHeaders.insertAdjacentHTML("beforeend", `  
    ${
      data.items[0][Key] === undefined ? ""  : `<th scope="col" ${ObjCustomCheck && ObjCustomCheck[Key] === undefined ?"" : `data-display=${ObjCustomCheck && ObjCustomCheck[Key].checked}`} data-column="${Key}" title='${data.items[0][Key] === undefined ? "" : Key}'>${Key}</th>`
    } 
   `);
  }) 
}

function OldTable(data, newTable , ArrKeys,ObjCustomCheck) {
  data.items.map((e, i) => { 
    newTable.insertAdjacentHTML("beforeend", `
    <tr>
      <td data-column="checkbox" ${ObjCustomCheck && ObjCustomCheck["checkbox"] === undefined ?"" : `data-display=${ObjCustomCheck && ObjCustomCheck["checkbox"].checked}`}><input class="InpSelected" style="width: 100%;text-align: center;" type="checkbox" name="selected_product" value="${e._id.$oid}" title="${e._id.$oid}"></td>
      <td class="openW" ${ ObjCustomCheck && ObjCustomCheck["index"] === undefined ?"" : `data-display=${ObjCustomCheck && ObjCustomCheck["index"].checked}`} data-column="index" data-targetmodal="#columnindex" scope="row" title="${i}">${i}</td>
      ${ArrKeys.map((key) => `
        ${e[key] === undefined ? "" : `<td ${ ObjCustomCheck && ObjCustomCheck[key] === undefined ?"" : `data-display=${ObjCustomCheck && ObjCustomCheck[key].checked}`} data-column="${key}" title='${e[key] === undefined ? "" : e[key]}'> 
        ${key === "WSlink" || key === "ThrLink"? `<a href="${e[key]}" target="_blank">${e[key]}</a>` : e[key]}
        </td>`}
      `).join('')}
    </tr> 
    `);
  });
}

export default CreateTable;
