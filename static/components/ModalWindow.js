function ModalWindow() {
   let modalW = document.querySelectorAll(".modalW");
   let btnModal = document.querySelectorAll(".btnModal");

   btnModal.forEach((btn) =>{
    btn.addEventListener("click",(event)=>{
     
      modalW.forEach((modal) =>{ 
         if(btn.dataset.targetmodal === modal.dataset.targetmodal){
          modal.classList.toggle("show");
          setTimeout(()=>{ 
            if(modal.classList.contains("dBlock") === true){ 
              modal.classList.remove("dBlock");
              modal.classList.add("dNone"); 
            }else{
              modal.classList.remove("dNone");
              modal.classList.add("dBlock");
            }
             
          },100)
         }
      });
    });
   });
}

export default ModalWindow;