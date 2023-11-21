 

async function CreateTable(data , ArrKeys) {
 
  let newTable = document.querySelector("#newTable");
  let NewTableHeaders = document.querySelector("#NewTableHeaders");
  NewTableHeaders.innerHTML ="";
  newTable.innerHTML="";
  OldTableHeaders(data, NewTableHeaders, ArrKeys)
  OldTable(data, newTable, ArrKeys);
}
function OldTableHeaders(data, NewTableHeaders , ArrKeys) {
  NewTableHeaders.insertAdjacentHTML("beforeend",`
  <th scope="col" data-column="checkbox"></th>
  <th scope="col" data-column="index" title="#">#</th>  
  `)
  
  ArrKeys.forEach((Key, index)=>{ 
    NewTableHeaders.insertAdjacentHTML("beforeend", `  
    ${
      data.items[0][Key] === undefined ? ""  : `<th scope="col"  data-column="${Key}" title='${data.items[0][Key] === undefined ? "" : Key}'>${Key}</th>`
    } 
   `);
  }) 
}

function OldTable(data, newTable , ArrKeys) {
  data.items.map((e, i) => { 
    newTable.insertAdjacentHTML("beforeend", `
    <tr>
      <td data-column="checkbox"><input style="width: 100%;text-align: center;" type="checkbox" name="selected_product" value="${e._id.$oid}" title="${e._id.$oid}"></td>
      <td class="btnModal" data-column="index" data-targetmodal="#columnindex" scope="row" title="${i}">${i}</td>
      ${ArrKeys.map((key) => `
        ${e[key] === undefined ? "" : `<td data-column="${key}" title='${e[key] === undefined ? "" : e[key]}'>${e[key]}</td>`}
      `).join('')}
    </tr> 
    `);
  });
}

export default CreateTable;
