import SocketPost from "../Socket/modules/SocketPost.js";
const socket = io.connect("http://" + document.domain + ":" + location.port);
let isParseSelectedExecuted = false;
function ParseSelected(data) {
  let CheckAll = document.querySelectorAll(".CheckAll"); 
  CheckAll.forEach((thisBtn)=>{
    thisBtn.addEventListener("click", () => { 
      CheckingAll();
    });
  })
  function CheckingAll() {
    let Table = document.querySelector("#newTable");
    let arrTable = Table.children; 
    for (let i = 0; i < arrTable.length; i++) {
      let thisTr = arrTable[i];
      let inp = thisTr.children[0].children[0];
      if (inp.checked === true) {
        inp.checked = false
      } else {
        inp.checked = true
      }
    }
  }


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
      SocketPost(socket, "selected_parse", { arrData });
      console.log(arrData);
      if(arrData.length !== 0){
        ParseSelectedPrices.disabled = true;
      } 
    }, false);
    ParseSelectedDeliveryPrices.addEventListener("click", () => {
      setData.clear();
      ForInpSelected()
      let arrData = Array.from(setData);
      SocketPost(socket, "delivery_selected_parse", { arrData });
      if(arrData.length !== 0){
        ParseSelectedDeliveryPrices.disabled = true;
      }
       
    }, false);


    function ForInpSelected() {
      let arrTable = Table.children;
      console.dir(arrTable);
      for (let i = 0; i < arrTable.length; i++) {
        let thisTr = arrTable[i];
        let inp = thisTr.children[0].children[0];
        if (inp.checked === true) {
          // if (inp.title === data.items[i]._id.$oid) { 
          setData.add(data.items[i]);
          // }
        }
      }
    }  
  }
}

export default ParseSelected;