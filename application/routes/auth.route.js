import AuthController from "../controllers/auth.controller";

export const AuthRouter = app => {
  app.route("/login").post(AuthController.doLogin);
  app.route("/login-facebook").post(AuthController.doLoginFacebook);
  app.route("/register").post(AuthController.doRegister);
  app.route("/register-facebook").post(AuthController.doRegisterFacebook);
  app.route("/token").post(AuthController.refreshToken);
};
