function Connection(socket) {
  let ConnectionMessage = document.querySelector("#ConnectionMessage");
 
  socket.on("ConnectionMessage", async (res) => {
    ConnectionMessage.insertAdjacentHTML("beforeend", ` 
    <p>${res.data}</p>
    `); 
} );
}

export default Connection;