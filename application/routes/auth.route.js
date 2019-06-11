import AuthController from "../controllers/auth.controller";

export const AuthRouter = app => {
  app.route("/login").post(AuthController.doLogin);
  app.route("/register").post(AuthController.doRegister);
  app.route("/token").post(AuthController.refreshToken);
};
