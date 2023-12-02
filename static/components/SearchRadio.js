import FETCH from "./FETCH.js";
import CreateTable from "./CreateTable.js";
import addviascsv from "./addviacsv.js";

function SearchRadio(ArrKeys) {
  let RadioSearch = document.querySelectorAll('input[name="SearchRadio"]');
  let SearchSubmit = document.querySelector("#SearchSubmit");
  let InpSearch = document.querySelector("#InpSearch");
 
  setTimeout(async () => { 
    
    SearchSubmit.disabled = false;
    await SearchSubmit.addEventListener("click", () => {
      RadioSearch.forEach((e) => {
        if (e.checked === true) {
          // На случай, если обработка Search будет на стороне сервера
          // if(InpSearch.value.trim() !== ""){
            FETCH("/all_search" ,{value:InpSearch.value, category: e.title}).then(async (data)=>{
              console.log(data);
              if(data.items.length === 0){
                alert("Not found");
              }else{
              await  CreateTable(data , ArrKeys);
              await  addviascsv(data , ArrKeys);
              }  
            }); 
          // }else{
            InpSearch.value = "";
          // }
        }
      })
    });
  }, 1000);
}

export default SearchRadio;