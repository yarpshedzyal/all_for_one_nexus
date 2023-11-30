function SocketPost(socket, value, data) {
  return new Promise((resolve, reject) => {
    socket.emit(value, data);
    resolve(); // Разрешаем промис без передачи значения
  });
}

export default SocketPost;

 