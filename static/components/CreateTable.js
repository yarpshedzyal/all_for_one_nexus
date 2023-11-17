const ArrKeys = ["ASIN", "Old ASINs", "SKU", "Name", "THR Link", "WS Link", "Pricing Strategy", "Basic Handling Time", "Price",
"Delivery Price THR 10001", "Delivery Price WS 10001", "Delivery Price THR 90001", "Delivery Price WS 90001",
"Threshold for median HT calculation", "Orders count", "Orders count", "Units sold count", "Returns count", "A-to-Z count",
"Item #", "ETA", "Stock availability", "Free shipping with Plus"
]

async function CreateTable(data) {
 
  let newTable = document.querySelector("#newTable");
  let NewTableHeaders = document.querySelector("#NewTableHeaders");
  NewTableHeaders.innerHTML ="";
  newTable.innerHTML="";
  OldTableHeaders(data, NewTableHeaders)
  OldTable(data, newTable);
}
function OldTableHeaders(data, NewTableHeaders) {
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

function OldTable(data, newTable) {
  data.items.map((e, i) => { 
    newTable.insertAdjacentHTML("beforeend", `
    <tr>
      <td data-column="checkbox"><input style="width: 100%;text-align: center;" type="checkbox" name="selected_product" value="${e._id.$oid}" title="${e._id.$oid}"></td>
      <td data-column="index" scope="row" title="${i}">${i}</td>
      ${ArrKeys.map((key) => `
        ${e[key] === undefined ? "" : `<td data-column="${key}" title='${e[key] === undefined ? "" : e[key]}'>${e[key]}</td>`}
      `).join('')}
    </tr> 
    `);
  });
}

export default CreateTable;
