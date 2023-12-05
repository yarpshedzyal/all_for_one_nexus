function Connection(socket) {
  let ConnectionMessage = document.querySelector("#ConnectionMessage");
 
  socket.once("ConnectionMessage", async (res) => {
    console.log(res)
    res.forEach(element => {
      ConnectionMessage.insertAdjacentHTML("beforeend", ` 
      <p class="mb-1">${element.title}:<b class="ps-1">${element.time}</b></p>
    `); 
    });
} );
}

export default Connection;