function Connection(socket) {
  let ConnectionMessage = document.querySelector("#ConnectionMessage");
 
  socket.once("ConnectionMessage", async (res) => {
    console.log(res)
    res.forEach(element => {
      ConnectionMessage.insertAdjacentHTML("beforeend", ` 
    <p>${element.data}</p>
    `); 
    });
} );
}

export default Connection;