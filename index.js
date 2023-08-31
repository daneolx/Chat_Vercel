var PORT = process.env.PORT || 3000;
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname));

server.listen(PORT, function (err) {
  if (err) throw err;
  console.log('Servidor Corriendo');
});

//
// Eventos de sockets
//

// Cuando un socket se conecta.
io.on('connection', function (socket) {

  console.log('Usuario conectado.');

  // Cuando el socket conectado se desconecta.
  socket.on('disconnect', function () {
    console.log('Usuario desconectado.');
  });

  // Al recibir el evento 'new:message' del socket, el cual representa
  // un nuevo mensaje del usuario.
  socket.on('new:message', function (data) {

    const { username, value } = data;

    // Reenviamos el mensaje a todos los demás conectados emitiendoles
    // el evento 'new:message' con los datos.
    socket.broadcast.emit('new:message', data);

    console.log(`Nuevo mensaje: Usuario="${username}", Contenido="${value}".`);
  });
});
