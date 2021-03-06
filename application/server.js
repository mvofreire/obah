import "@babel/polyfill/noConflict";
import "./middlewares/database";
import registerRoutes from "./middlewares/register-routes";
import registerSockets from "./middlewares/register-sockets";
import userSession from "./middlewares/user-session";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*"
  })
);

registerSockets(server);
app.use(bodyParser.json());
app.use(userSession);
registerRoutes(app);

const SERVER_PORT = process.env.PORT || 5000;
server.listen(SERVER_PORT, function() {
  console.log(`ESCUTANDO NA PORTA ${SERVER_PORT}!`);
});
