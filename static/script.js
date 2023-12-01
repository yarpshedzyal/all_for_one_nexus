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
 
 

socket.on("message", async (res) => {   
    alert(res);
    console.log(res);
});

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

//socket get pregress
progress_update(socket, "progress_delivery_update");
progress_update(socket, "progress_1");
progress_update(socket, "progress_2");
progress_update(socket, "progress_3");


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

document.querySelector("#TestProgress1").addEventListener("click", () => {    
    SocketPost(socket,"TestProgress1").then((res)=>{
      console.log(res);
    });
});  
document.querySelector("#TestProgress2").addEventListener("click", () => {    
    SocketPost(socket,"TestProgress2").then((res)=>{
      console.log(res);
    });
});  
document.querySelector("#TestProgress3").addEventListener("click", () => {    
    SocketPost(socket,"TestProgress3").then((res)=>{
      console.log(res);
    });
});  
 