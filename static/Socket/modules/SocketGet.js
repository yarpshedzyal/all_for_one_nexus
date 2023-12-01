function SocketGet(socket, value) { 
  return new Promise((resolve, reject) => { 
    socket.on(value, async (res) => { 
      await resolve(res);
    }); 
  });
}

export default SocketGet;