import jwt from "jsonwebtoken";
import socketIO from "socket.io";
import appConfig from "../config/main";

const loadUser = token => {
  return jwt.verify(token, appConfig.tokenSecret, {
    ignoreExpiration: false
  });
};

class Client {
  sockets = {};
  user = null;

  constructor(socket, user) {
    this.user = user;
    this.addSocket(socket);
  }

  get id() {
    return this.user.id;
  }

  get socketListIds() {
    return Object.keys(this.sockets);
  }

  addSocket(socket) {
    this.sockets[socket.id] = socket;
    this.send("app.session.change", this.socketListIds.length);
  }

  removeSocket(socket) {
    delete this.sockets[socket.id];
    this.send("app.session.change", this.socketListIds.length);
  }

  send(name, args = []) {
    this.socketListIds.forEach(id => this.sockets[id].emit(name, args));
  }
}
class SocketClients {
  constructor() {
    this.clients = {};
  }

  getClient(socket) {
    const token = socket.handshake.query.token || null;
    if (token) {
      const user = loadUser(token);
      return this.clients[user.id]||null;
    }
    return false;
  }

  addClient(socket) {
    let client = this.getClient(socket);
    if (!client) {
      client = new Client(socket, user);
      this.clients[client.id] = client;
    }
    client.addSocket(socket);
  }

  removeClient(socket) {
    const client = this.getClient(socket);
    if (!!client) {
      client.removeSocket(socket);
    }
  }
}

export default server => {
  const io = socketIO(server);
  const clients = new SocketClients();

  io.on("connection", socket => {
    clients.addClient(socket);

    socket.on("app.logout", () => {
      clients.removeClient(socket);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return io;
};
