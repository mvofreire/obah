import "@babel/polyfill/noConflict";
import initDatabase from "./middlewares/database";
import registerRoutes from "./middlewares/route";
import userSession from "./middlewares/user-session";
import express from "express";
import bodyParser from "body-parser";

initDatabase();
const app = express();

app.use(bodyParser.json());
app.use(userSession);
registerRoutes(app);

const SERVER_PORT = process.env.PORT || 5000;
app.listen(SERVER_PORT, function() {
  console.log(`ESCUTANDO NA PORTA ${SERVER_PORT}!`);
});
