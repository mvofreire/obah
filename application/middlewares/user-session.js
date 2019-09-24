import jwt from "jsonwebtoken";
// import Usuario from "../models/Usuario";
import appConfig from "../config/main";
import { User } from "../models";

const isExpired = expire => {
  const now = new Date().getTime() / 1000;
  if (now > expire) {
    throw "Tempo de sessão foi expirado";
  }
};

const isAllowed = req => {
  const testUrl = req.url;
  const allowed = appConfig.publicRoutes.indexOf(testUrl) > -1;
  return allowed;
};

export default async (req, res, next) => {
  if (isAllowed(req)) {
    next();
  } else if (req.headers && req.headers.authorization) {
    try {
      let authorization = req.headers.authorization;
      const [type, token] = authorization.split(" ");
      const decoded = jwt.verify(token, appConfig.tokenSecret, {
        ignoreExpiration: false
      });

      isExpired(decoded.exp);
      var userId = decoded.id;
      const usuario = await User.findByPk(userId);

      req.appContext = {
        userSession: usuario
      };
      next();
    } catch (e) {
      console.log(e);

      if (!isAllowed(req)) {
        return res.status(401).send("unauthorized");
      } else {
        next();
      }
    }
  }
};
