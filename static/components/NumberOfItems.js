import FETCH from "./FETCH.js";
import CreateTable from "./CreateTable.js";

function NumberOfItems() {
  let BtnNumberOfItems = document.querySelector("#BtnNumberOfItems"); 
  let InpNumberOfItems = document.querySelector("#InpNumberOfItems"); 
 
  BtnNumberOfItems.addEventListener("click", () => {
    const url = "/NumberOfItems";
    const data = { currentPage: 1, itemsPerPage: Number(InpNumberOfItems.value) };
    FETCH(url, data).then(async (data) => { 
      await CreateTable(data);
    })
  })
}

export default NumberOfItems;