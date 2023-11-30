 
function ModalWindow() {
 
    let modalW = document.querySelectorAll(".modalW");
    let closeW = document.querySelectorAll(".closeW");
    let openW = document.querySelectorAll('.openW');

    closeW.forEach((thisbtn) => {
      thisbtn.addEventListener("click", () => {
        modalW.forEach((modal) => {
          if (thisbtn.dataset.targetmodal === modal.dataset.targetmodal) {
            modal.classList.remove("show");
            setTimeout(() => {
              if (modal.classList.contains("dBlock") === true) {
                modal.classList.remove("dBlock");
                modal.classList.add("dNone");
              }
            }, 100)
          }
        });
      });
    });

    openW.forEach((thisbtn) => {
      thisbtn.addEventListener("click", () => {
        modalW.forEach((modal) => {
          if (thisbtn.dataset.targetmodal === modal.dataset.targetmodal) {
            modal.classList.add("show");
            setTimeout(() => {
              if (modal.classList.contains("dNone") === true) {
                modal.classList.remove("dNone");
                modal.classList.add("dBlock");
              }
            }, 100)
          }
        });
      });
    });
  }
 

export default ModalWindow;