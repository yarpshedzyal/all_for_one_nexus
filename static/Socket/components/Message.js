function Message(socket) {
  let ModalMessage = document.querySelector("#ModalMessage");
  let MessageContent = document.querySelector("#MessageContent");
  let closeWMessage = document.querySelectorAll(".closeWMessage");
  closeWMessage.forEach((thisbtn) => {
    thisbtn.addEventListener("click", () => {  
      ModalMessage.classList.remove("show");
          setTimeout(() => {
            if (ModalMessage.classList.contains("dBlock") === true) {
              ModalMessage.classList.remove("dBlock");
              ModalMessage.classList.add("dNone");
              MessageContent.innerHTML="";
            }
          }, 100);
    });
  });

  socket.on("message", async (res) => {
    if (ModalMessage.classList.contains("show") === false) {
      ModalMessage.classList.add("show");
      setTimeout(() => {
        if (ModalMessage.classList.contains("dNone") === true) {
          ModalMessage.classList.remove("dNone");
          ModalMessage.classList.add("dBlock");
        }
      }, 100);
    } 
    MessageContent.insertAdjacentHTML("beforeend", `
    <p>${res.message || res.error}</p>
    `); 
    console.log(res);
  });
}

export default Message;