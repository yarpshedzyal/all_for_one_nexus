import SocketPost from "../Socket/modules/SocketPost.js";
const socket = io.connect("http://" + document.domain + ":" + location.port);
let isParseSelectedExecuted = false;
function ParseSelected(data) {
  if (!isParseSelectedExecuted) {
    isParseSelectedExecuted = true;
    let InpSelected = document.querySelectorAll(".InpSelected");
    let Table = document.querySelector("#newTable");
    let ParseSelectedPrices = document.querySelector("#parse-selected-prices-button");
    let ParseSelectedDeliveryPrices = document.querySelector("#parse-selected-delivery-prices-button");

    let setData = new Set();
    ParseSelectedPrices.addEventListener("click", () => {
      setData.clear(); 
      ForInpSelected()
      let arrData = Array.from(setData); 
      SocketPost(socket,"selected_parse", {arrData}); 
    }, false);
    ParseSelectedDeliveryPrices.addEventListener("click", () => {
      setData.clear(); 
      ForInpSelected()
      let arrData = Array.from(setData); 
      SocketPost(socket,"delivery_selected_parse", {arrData}); 
    }, false);


    function ForInpSelected() {
      let arrTable = Table.children;
      console.dir(arrTable);
      for (let i = 0; i < arrTable.length; i++) {
        let thisTr = arrTable[i];
        let inp = thisTr.children[0].children[0];
        if (inp.checked === true) {
          // if (inp.title === data.items[i]._id.$oid) {
            console.log(data.items[i]);
            console.log(inp);
            setData.add(data.items[i]);
          // }
        }
      }
    }  
    console.log(data);
  }
}

export default ParseSelected;