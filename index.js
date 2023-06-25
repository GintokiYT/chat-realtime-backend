// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: '*'
});

const PORT = process.env.PORT || 3000;

// const staticPath = path.join(__dirname, 'dist');

// app.use(express.static(staticPath));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(staticPath, 'index.html'));
// });

io.on('connection', socket => {
  console.log('Client connected');
  console.log(socket.id);

  socket.on('client:message', body => {
    console.log(body);
    socket.broadcast.emit('server:message', {
      body,
      from: socket.id.slice(6),
    });
  });
});

server.listen(PORT, () => {
  console.log('Server on port', PORT);
});
