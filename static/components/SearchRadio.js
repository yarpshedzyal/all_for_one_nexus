import FETCH from "./FETCH.js";
import CreateTable from "./CreateTable.js";

function SearchRadio() {
  let RadioSearch = document.querySelectorAll('input[name="SearchRadio"]');
  let SearchSubmit = document.querySelector("#SearchSubmit");
  let InpSearch = document.querySelector("#InpSearch");
  
  SearchSubmit.addEventListener("click",()=>{
      RadioSearch.forEach((e)=>{
          if(e.checked === true){ 
              // FETCH("/AllItems" ,{value: InpSearch.value, category:e.title}).then(async (data)=>{
              //   await CreateTable(data);
              // });
 
              FETCH("/NumberOfItems", { currentPage: 1, itemsPerPage: 200 }).then(async (data) => { 
                let newData = {items:[]};
                let RadioKey = e.title;
                data.items.map((element) =>{ 
                  if(element[RadioKey].toLowerCase().includes(InpSearch.value.toLowerCase()) === true){ 
                    newData.items.push(element);
                  }
                })
                if(newData.items.length === 0){
                  alert("Not found");
                }else{
                  await CreateTable(newData);
                }
                 
              })
          }  
      }) 
  });
}

export default SearchRadio;