import FETCH from "./FETCH.js";
import CreateTable from "./CreateTable.js";
import addviascsv from "./addviacsv.js";

function SearchRadio(ArrKeys) {
  let RadioSearch = document.querySelectorAll('input[name="SearchRadio"]');
  let SearchSubmit = document.querySelector("#SearchSubmit");
  let InpSearch = document.querySelector("#InpSearch");

  let newData = { items: [] };
  // нужно чтобы FETCH получал от App.py все элементы.
  setTimeout(async () => {

    // Пределать на запрос AllItems FETCH("/AllItems")
    FETCH("/all_items").then(async (data) => { 
      newData = data;
    });
    SearchSubmit.disabled = false;
    await SearchSubmit.addEventListener("click", () => {
      RadioSearch.forEach((e) => {
        if (e.checked === true) {
          // На случай, если обработка Search будет на стороне сервера 
          // FETCH("/AllItems" ,{value: InpSearch.value, category:e.title}).then(async (data)=>{
          //   await CreateTable(data);
          // });  
          let RadioKey = e.title;
          let sortedData = { items: [] };
          console.log(newData.items);

          newData.items.map((element, index) => { 
            if (String(element[RadioKey]).toLowerCase().includes(String(InpSearch.value).toLowerCase()) === true) {
              sortedData.items.push(element);
            }
          })
          if (sortedData.items.length === 0) {
            alert("Not found");
          } else {
            CreateTable(sortedData , ArrKeys);
            addviascsv(sortedData , ArrKeys);
          } 
        }
      })
    });
  }, 1000);
}

export default SearchRadio;