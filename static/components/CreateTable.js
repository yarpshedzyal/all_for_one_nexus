async function CreateTable(data) {
  let newTable = document.querySelector("#newTable");
  let NewTableHeaders = document.querySelector("#NewTableHeaders");

  OldTableHeaders(data, NewTableHeaders)
  OldTable(data, newTable);
}
function OldTableHeaders(data, NewTableHeaders){ 
  NewTableHeaders.insertAdjacentHTML("beforeend", ` 
  <th scope="col" data-column="checkbox"></th>
  <th scope="col" data-column="index" title="#">#</th>
  <th scope="col" data-column="asin" title="${data.items[0].ASIN === undefined ? "" : 'ASIN'}">${data.items[0].ASIN === undefined ? "" : "ASIN"}</th>
  <th scope="col" data-column="odl-asin" title="${data.items[0]['Old ASINs'] === undefined ? "" :  'Old ASINs'}">${data.items[0]['Old ASINs'] === undefined ? "" : 'Old ASINs'}</th>
  <th scope="col" data-column="sku" title="${data.items[0].SKU === undefined ? "" : 'SKU'}">${data.items[0].SKU === undefined ? "" : "SKU"}</th>
  <th scope="col" data-column="old-sku" title="${data.items[0]['Old SKUs'] === undefined ? "" : 'Old SKUs'}">${data.items[0]['Old SKUs'] === undefined ? "" : 'Old SKUs'}</th>
  <th scope="col" data-column="name" title="${data.items[0].Name === undefined ? "" : "Name"}">${data.items[0].Name === undefined ? "" : "Name"}</th>
  <th scope="col" data-column="thr-link" title="${data.items[0]['THR Link'] === undefined ? "" : 'THR Link'}">${data.items[0]['THR Link'] === undefined ? "" : 'THR Link'}</th>
  <th scope="col" data-column="link" title="${data.items[0]['WS Link'] === undefined ? "" : 'WS Link'}">${data.items[0]['WS Link'] === undefined ? "" : 'WS Link'}</th>
  <th scope="col" data-column="pricing" title="${data.items[0]["Pricing Strategy"] === undefined ? "" : "Pricing Strategy"}">${data.items[0]["Pricing Strategy"] === undefined ? "" : "Pricing Strategy"}</th>
  <th scope="col" data-column="bht" title="${data.items[0]['Basic Handling Time'] === undefined ? "" : 'Basic Handling Time'}">${data.items[0]['Basic Handling Time'] === undefined ? "" : 'Basic Handling Time'}</th>
  <th scope="col" data-column="price" title="${data.items[0].Price === undefined ? "" : "Price"}">${data.items[0].Price === undefined ? "" : "Price"}</th>
  <th scope="col" data-column="delivery-thr-10001" title="${data.items[0]['Delivery Price THR 10001'] === undefined ? "" : 'Delivery Price THR 10001'}">${data.items[0]['Delivery Price THR 10001'] === undefined ? "" : 'Delivery Price THR 10001'}</th>
  <th scope="col" data-column="delivery-ws-10001" title="${data.items[0]['Delivery Price WS 10001'] === undefined ? "" : 'Delivery Price WS 10001'}">${data.items[0]['Delivery Price WS 10001'] === undefined ? "" : 'Delivery Price WS 10001'}</th>
  <th scope="col" data-column="delivery-thr-90001" title="${data.items[0]['Delivery Price THR 90001'] === undefined ? "" : 'Delivery Price THR 90001'}">${data.items[0]['Delivery Price THR 90001'] === undefined ? "" : 'Delivery Price THR 90001'}</th>
  <th scope="col" data-column="delivery-ws-90001" title="${data.items[0]['Delivery Price WS 90001'] === undefined ? "" : 'Delivery Price WS 90001'}">${data.items[0]['Delivery Price WS 90001'] === undefined ? "" : 'Delivery Price WS 90001'}</th>
  <th scope="col" data-column="threshlod-m" title="${data.items[0]['Threshold for median HT calculation'] === undefined ? "" : 'Threshold for median HT calculation'}">${data.items[0]['Threshold for median HT calculation'] === undefined ? "" : 'Threshold for median HT calculation'}</th>
  <th scope="col" data-column="orders-count" title="${data.items[0]['Orders count'] === undefined ? "" : 'Orders count'}">${data.items[0]['Orders count'] === undefined ? "" : 'Orders count'}</th>
  <th scope="col" data-column="units-sold" title="${data.items[0]['Units sold count'] === undefined ? "" : 'Units sold count'}">${data.items[0]['Units sold count'] === undefined ? "" : 'Units sold count'}</th>
  <th scope="col" data-column="returs" title="${data.items[0]['Returns count'] === undefined ? "" : 'Returns count'}">${data.items[0]['Returns count'] === undefined ? "" : 'Returns count'}</th>
  <th scope="col" data-column="a-z" title="${data.items[0]['A-to-Z count'] === undefined ? "" : 'A-to-Z count'}">${data.items[0]['A-to-Z count'] === undefined ? "" : 'A-to-Z count'}</th>
  <th scope="col" data-column="item" title="${data.items[0]['Item #'] === undefined ? "" : 'Item #'}">${data.items[0]['Item #'] === undefined ? "" : 'Item #'}</th>
  <th scope="col" data-column="eta" title="${data.items[0].ETA === undefined ? "" : "ETA"}">${data.items[0].ETA === undefined ? "" : "ETA"}</th>
  <th scope="col" data-column="stock-availble" title="${data.items[0]['Stock availability'] === undefined ? "" : 'Stock availability'}">${data.items[0]['Stock availability'] === undefined ? "" : 'Stock availability'}</th>
  <th scope="col" data-column="free-ship" title="${data.items[0]['Free shipping with Plus'] === undefined ? "" : 'Free shipping with Plus'}">${data.items[0]['Free shipping with Plus'] === undefined ? "" : 'Free shipping with Plus'}</th> `);
}

function OldTable(data, newTable) {
  data.items.map((e, i) => {
    console.log(e);
    newTable.insertAdjacentHTML("beforeend", `
    <tr>
    <td><input style="width: 100%;text-align: center;" type="checkbox" name="selected_product" value="${e._id.$oid}" title="${e._id.$oid}"></td>
    <th data-column="index" scope="row" title="${i}">${i}</th>
    <td data-column="asin" title='${e.ASIN === undefined ? "" : e.ASIN}'>${e.ASIN === undefined ? "" : e.ASIN}</td>
    <td data-column="odl-asin" title='${e['Old ASINs'] === undefined ? "" : e['Old ASINs']}'>${e['Old ASINs'] === undefined ? "" : e['Old ASINs']}</td>
    <td data-column="sku" title='${e.SKU === undefined ? "" : e.SKU}'>${e.SKU === undefined ? "" : e.SKU}</td>
    <td data-column="old-sku" title='${e['Old SKUs'] === undefined ? "" : e['Old SKUs']}'>${e['Old SKUs'] === undefined ? "" : e['Old SKUs']}</td>
    <td data-column="name" title='${e.Name === undefined ? "" : e.Name}'>${e.Name === undefined ? "" : e.Name}</td>
    <td data-column="thr-link" title='${e['THR Link'] === undefined ? "" : e['THR Link']}'>${e['THR Link'] === undefined ? "" : e['THR Link']}</td>
    <td data-column="link" title='${e['WS Link'] === undefined ? "" : e['WS Link']}'>${e['WS Link'] === undefined ? "" : e['WS Link']}</td>
    <td data-column="pricing" title='${e['Pricing Strategy'] === undefined ? "" : e['Pricing Strategy']}'>${e['Pricing Strategy'] === undefined ? "" : e['Pricing Strategy']}</td>
    <td data-column="bht" title='${e['Basic Handling Time'] === undefined ? "" : e['Basic Handling Time']}'>${e['Basic Handling Time'] === undefined ? "" : e['Basic Handling Time']}</td>
    <td data-column="price" title='${e.Price === undefined ? "" : e.Price}'>${e.Price === undefined ? "" : e.Price}</td>
    <td data-column="delivery-thr-10001" title='${e['Delivery PriceTHR 10001'] === undefined ? "" : e['Delivery PriceTHR 10001']}'>${e['Delivery PriceTHR 10001'] === undefined ? "" : e['Delivery PriceTHR 10001']}</td>
    <td data-column="delivery-ws-10001" title='${e['Delivery PriceWS 10001'] === undefined ? "" : e['Delivery PriceWS 10001']}'>${e['Delivery PriceWS 10001'] === undefined ? "" : e['Delivery PriceWS 10001']}</td>
    <td data-column="delivery-thr-90001" title='${e['Delivery PriceTHR 90001'] === undefined ? "" : e['Delivery PriceTHR 90001']}'>${e['Delivery PriceTHR 90001'] === undefined ? "" : e['Delivery PriceTHR 90001']}</td>
    <td data-column="delivery-ws-90001" title='${e['Delivery PriceWS 90001'] === undefined ? "" : e['Delivery PriceWS 90001']}'>${e['Delivery PriceWS 90001'] === undefined ? "" : e['Delivery PriceWS 90001']}</td>
    <td data-column="threshlod-m" title='${e['Threshold for median HT calculation'] === undefined ? "" : e['Threshold for median HT calculation']}'>${e['Threshold for median HT calculation'] === undefined ? "" : e['Threshold for median HT calculation']}</td>
    <td data-column="orders-count" title='${e['Orders count'] === undefined ? "" : e['Orders count']}'>${e['Orders count'] === undefined ? "" : e['Orders count']}</td>
    <td data-column="units-sold" title='${e['Units sold count'] === undefined ? "" : e['Units sold count']}'>${e['Units sold count'] === undefined ? "" : e['Units sold count']}</td>
    <td data-column="returs" title='${e['Returns count'] === undefined ? "" : e['Returns count']}'>${e['Returns count'] === undefined ? "" : e['Returns count']}</td>
    <td data-column="a-z" title='${e['A-to-Z count'] === undefined ? "" : e['A-to-Z count']}'>${e['A-to-Z count'] === undefined ? "" : e['A-to-Z count']}</td>
    <td data-column="item" title='${e['Item #'] === undefined ? "" : e['Item #']}'>${e['Item #'] === undefined ? "" : e['Item #']}</td>
    <td data-column="eta" title='${e.ETA === undefined ? "" : e.ETA}'>${e.ETA === undefined ? "" : e.ETA}</td>
    <td data-column="stock-availble" title='${e['Stock availability'] === undefined ? "" : e['Stock availability']}'>${e['Stock availability'] === undefined ? "" : e['Stock availability']}</td>
    <td data-column="free-ship" title='${e['Free shipping with Plus'] === undefined ? "" : e['Free shipping with Plus']}'>${e['Free shipping with Plus'] === undefined ? "" : e['Free shipping with Plus']}</td>
  </tr>
  
    `);
  });
}

export default CreateTable;
