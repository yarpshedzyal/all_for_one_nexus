import CheckingStylesTable from "./components/CheckingStylesTable.js";
import fetch_data from "./components/fetch_data.js";
import CreateTable from "./components/CreateTable.js";
import ModalWindow from "./components/ModalWindow.js";
import Cuscomize from "./components/Customize.js"
import WTF from "./components/WTF.js";
import FETCH from "./components/FETCH.js";
import NumberOfItems from "./components/NumberOfItems.js";
import SearchRadio from "./components/SearchRadio.js";
import AddProductForm from "./components/AddProductForm.js";
import DeleteSelectedButton from "./components/DeleteSelectedButton.js";
import addviascsv from "./components/addviacsv.js";
 
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
    await CreateTable(data,ArrKeys);
    await Cuscomize(); 
    await addviascsv(data, ArrKeys); 
});
 
NumberOfItems(ArrKeys);
SearchRadio(ArrKeys);
AddProductForm(); 
DeleteSelectedButton(); 


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


let download_tsv = document.querySelector('#download-tsv')
download_tsv.addEventListener('click', ()=>{window.location.href = '/download_tsv_report'})





// WTF();

//  

// // Function to show the modal and form fields
// function showModal() {
//     const modalOverlay = document.getElementById('modal-overlay');
//     modalOverlay.style.display = 'block';

//     // Show the form fields
//     const addProductForm = document.getElementById('add-product-form');
//     addProductForm.style.display = 'block';
// }

// // Function to hide the modal and form fields
// function hideModal() {
//     const modalOverlay = document.getElementById('modal-overlay');
//     modalOverlay.style.display = 'none';

//     // Hide the form fields
//     const addProductForm = document.getElementById('add-product-form');
//     addProductForm.style.display = 'none';
// }

// // Show the modal when the "Add Product" button is clicked
// document.getElementById('add-product-button').addEventListener('click', showModal);

// // Hide the modal when the close button is clicked
// document.getElementById('close-add-product-modal').addEventListener('click', hideModal);

// // Hide the modal when the form is submitted
// document.getElementById('add-product-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     hideModal();
// });

// Handle form submission
// document.getElementById('add-product-form').addEventListener('submit', function (e) {
//     e.preventDefault();

//     // Get input values
//     const sku = document.getElementById('sku').value;
//     const name = document.getElementById('name').value;
//     const thrLink = document.getElementById('thr-link').value;
//     const wsLink = document.getElementById('ws-link').value;
//     const pricingStrategy = document.getElementById('pricing-strategy').value;
//     const basicHandlingTime = document.getElementById('basic-handling-time').value;
//     const price = document.getElementById('price').value;
//     const medianHT = document.getElementById('median-ht').value;

//     // Send the data to your Flask server using Fetch
//     fetch('/add_product', {
//         method: 'POST',
//         body: JSON.stringify({
//             sku: sku,
//             name: name,
//             thrLink: thrLink,
//             wsLink: wsLink,
//             pricingStrategy: pricingStrategy,
//             basicHandlingTime: basicHandlingTime,
//             price: price,
//             medianHT: medianHT
//             // Add other fields as needed
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => response.json())
//         .then(data => {
//             // Handle the response from the server
//             if (data.success) {
//                 // Close the modal and potentially update the product list
//                 document.getElementById('modal-overlay').style.display = 'none';
//                 // You can update the product list here if needed
//             } else {
//                 // Handle errors, display a message, etc.
//             }
//         });
// });

// JavaScript code
// const menuContainer = document.getElementById('menu-container');
// const addProductButton = document.getElementById('add-product-button');

// // Show the menu when hovering near the top
// window.addEventListener('mousemove', (e) => {
//     if (e.clientY < 50) {
//         menuContainer.style.display = 'block';
//     } else {
//         menuContainer.style.display = 'none';
//     }
// });

// // Hide the menu when clicking the "Add Product" button
// addProductButton.addEventListener('click', () => {
//     menuContainer.style.display = 'none';
// });

// Handle the "Delete Selected" button click
// document.getElementById('delete-selected-button').addEventListener('click', function () {
//     // Get all checkboxes
//     const checkboxes = document.querySelectorAll('input[name="selected_product"]');
//     const selectedIds = [];

//     // Collect IDs of selected items
//     checkboxes.forEach(checkbox => {
//         if (checkbox.checked) {
//             selectedIds.push(checkbox.value);
//         }
//     });

//     if (selectedIds.length === 0) {
//         alert('No items selected for deletion.');
//         return;
//     }

//     // Ask for confirmation
//     const confirmation = confirm(`Are you sure you want to delete ${selectedIds.length} selected items?`);

//     if (confirmation) {
//         // Send an AJAX request to delete selected items
//         fetch('/delete_selected', {
//             method: 'POST',
//             body: JSON.stringify({ selectedIds }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     // Items were successfully deleted, you can update the table or take other actions here
//                     alert(`Deleted ${selectedIds.length} items.`);
//                 } else {
//                     // Handle the case where the deletion was not successful
//                     alert('Failed to delete items.');
//                 }
//             });
//     }
// });



 


    
// // Fetch data function
// function fetchData(page, perPage) {
//     // Make an AJAX request to the server with the page and perPage parameters
//     fetch(`/fetch_data?page=${page}&per_page=${perPage}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Update the table with the new data
//             updateTable(data.items);

//             // Update the current page number and total number of pages
//             updatePagination(data.currentPage, data.totalPages);
//         })
// }

// // Function to update the table with new data
// function updateTable(items) {
//     const table = document.getElementById('table-body');
//     // const tbody = table.getElementById('table-body');

//     // Clear existing table rows
//     table.innerHTML = '';

//     // Loop through the items and add rows to the table
//     // Populate the table rows with data
//     items.forEach(item => {
//         const row = document.createElement('tr');
//         for (const key in item) {
//             if (item.hasOwnProperty(key)) {
//                 const cell = document.createElement('td');
//                 cell.textContent = item[key];
//                 row.appendChild(cell);
//             }
//         }
//         table.appendChild(row);
//     });
// }


// // Function to update the current page number and total number of pages
// function updatePagination(currentPage, totalPages) {
//     const currentPageSpan = document.getElementById('current-page');
//     const totalPagesSpan = document.getElementById('total-pages');

//     // Update the current page number
//     currentPageSpan.textContent = currentPage;

//     // Update the total number of pages
//     totalPagesSpan.textContent = totalPages;
// }
