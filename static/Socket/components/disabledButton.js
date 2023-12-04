function disabledButton(socket) {
  let ParseSelectedPrices = document.querySelector("#parse-selected-prices-button");
  let ParseSelectedDeliveryPrices = document.querySelector("#parse-selected-delivery-prices-button");
  let PADPB = document.querySelector("#parse-all-delivery-prices-button");
  let PAPB = document.querySelector("#parse-all-prices-button")
  socket.on("delivery_all_parse_started", async (res) => {
    // console.log(res);
    PADPB.disabled = res.disabled;
  });
  socket.on("parse_all_started", async (res) => {
    // console.log(res);
    PAPB.disabled = res.disabled;
  });
  socket.on("selected_parse_started", async (res) => { 
    // console.log(res);
    ParseSelectedPrices.disabled = res.disabled;
  });
  socket.on("delivery_selected_parse_started", async (res) => {
    // console.log(res);
    ParseSelectedDeliveryPrices.disabled = res.disabled;
  });
}

export default disabledButton;