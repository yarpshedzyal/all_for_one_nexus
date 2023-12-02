const socket = io.connect("http://" + document.domain + ":" + location.port);

// Import Components
import CheckingStylesTable from "./components/CheckingStylesTable.js";
import fetch_data from "./components/fetch_data.js";
import CreateTable from "./components/CreateTable.js";
import ModalWindow from "./components/ModalWindow.js";
import Cuscomize from "./components/Customize.js" 
import FETCH from "./components/FETCH.js";
import NumberOfItems from "./components/NumberOfItems.js";
import SearchRadio from "./components/SearchRadio.js";
import AddProductForm from "./components/AddProductForm.js";
import DeleteSelectedButton from "./components/DeleteSelectedButton.js";
import addviascsv from "./components/addviacsv.js";  
import logoAnimate from "./components/logoAnimate.js";


// Import Modules Sockets
import SocketGet from "./Socket/modules/SocketGet.js";
import SocketPost from "./Socket/modules/SocketPost.js";
import progress_update from "./Socket/components/progress_update.js"
import Message from "./Socket/components/Message.js";
import Connection from "./Socket/components/Connection.js";
  

document.querySelector("#btnCollapse").addEventListener("click",()=>{
    document.querySelector(".navbar-collapse").classList.toggle("show");
});

const ArrKeys = ["ASIN", "SKU", "Name", "ThrLink", "WSlink", "PricingStrategy", "BasicHndlingTime", "Price",
"DeliveryPriceTHR10001", "DeliveryPriceWS10001", "DeliveryPriceTHR90001", "DeliveryPriceWS90001",
"ThresholdForMedianHTCalculation", "OrdersCount", "UnitsSoldCount", "ReturnsCount", "AZCount",
"ItemNumber", "StockAviability", "FreeShippingWithPlus", "estimated_referral_fee",
]
 
 
CheckingStylesTable(); 
fetch_data().then(async (data) => { 
    await CreateTable(data,ArrKeys, socket);
    await Cuscomize(); 
    await addviascsv(data, ArrKeys); 
}); 
NumberOfItems(ArrKeys);
SearchRadio(ArrKeys);
AddProductForm(); 
DeleteSelectedButton();  
logoAnimate();

//socket get pregress (1: socket, 2: url 3: Text Parser)
progress_update(socket, "progress_delivery_update","Parse All Delivery Prices");
progress_update(socket, "progress_delivery_update_selected","Parse Selected Delivery Prices");
progress_update(socket, "progress_update_selected","Parse Selected Prices");
progress_update(socket, "progress_update","Parse All Prices"); 
Message(socket);
Connection(socket);
 


// Refresh по классу. Нужно только добавить на кнопку. thisBtnRefresh
// data-time="300"
let thisBtnRefresh = document.querySelectorAll(".thisBtnRefresh"); 
thisBtnRefresh.forEach((thisBtn) =>{
    thisBtn.addEventListener("click",()=>{
        if(thisBtn.dataset.time !== undefined){
            setTimeout(()=>{
                location.reload();
            },Number(thisBtn.dataset.time))
        }else{
            location.reload();
        } 
    });
}) 


let download_tsv = document.querySelector('#download-tsv');
download_tsv.addEventListener('click', ()=>{window.location.href = '/download_tsv_report'});
 
/* 
    Отправка на запроса на сервер парсить страницы Parse All Prices, Parse All Delivery Prices.
    Также, кнопка Parse Selected Delivery Prices и Parse Selected Prices 
    вызываются из файла ParseSelected.
*/
document.querySelector("#parse-all-prices-button").addEventListener("click",()=>{ 
    SocketPost(socket,"parse_all").then((res)=>{
        console.log(res);
      });
});
document.querySelector("#parse-all-delivery-prices-button").addEventListener("click", () => {    
    SocketPost(socket,"delivery_all_parse").then((res)=>{
      console.log(res);
    });
});  
 