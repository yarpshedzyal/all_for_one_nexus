function ParseSelected(data) {
  let InpSelected = document.querySelectorAll(".InpSelected");
  let Table = document.querySelector("#newTable");
  let ParseSelectedPrices = document.querySelector("#parse-selected-prices-button");
  let ParseSelectedDeliveryPrices = document.querySelector("#parse-selected-delivery-prices-button");

  ParseSelectedPrices.addEventListener("click", () => {
    ForInpSelected()
  });
  ParseSelectedDeliveryPrices.addEventListener("click", () => {
    ForInpSelected()
  });
  function ForInpSelected() { 
    let arrTable = Table.children; 
    console.dir(arrTable);
    for(let i = 0; i < arrTable.length; i++){
      let thisTr = arrTable[i];
      let inp = thisTr.children[0].children[0];  
      if (inp.checked === true) {
        if(inp.title === data.items[i]._id.$oid){
        console.log(data.items[i]);
        console.log(inp);
        }
      }
    }
 
  }

  // function ForInpSelected() {
  //   InpSelected.forEach((e, i) => {
  //     if (e.checked === true) {
  //       // if(e.title === data.items[i]._id.$oid){
  //       console.log(data.items[i]);
  //       console.log(e);
  //       // }
  //     }
  //   });
  // }

  console.log(data);

}

export default ParseSelected;