import { User } from "models";
import jwt from "jsonwebtoken";
import appConfig from "../config/main";

const tokenList = {};
const doLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findUserWithRolesAuthenticate(email, password);

    const token = jwt.sign({ id: usuario.id }, appConfig.tokenSecret, {
      expiresIn: appConfig.tokenTimeExpiration
    });
    const refreshToken = jwt.sign(
      { id: usuario._id },
      appConfig.refreshTokenSecret,
      {
        expiresIn: appConfig.refreshTokenTimeExpiration
      }
    );

    const response = {
      id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      saved: usuario.saved,
      token,
      refreshToken
    };
    tokenList[refreshToken] = response;
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const doLoginFacebook = async (req, res) => {
  res.status(500).send("not implemented");
};

const refreshToken = (req, res) => {
  // refresh the damn token
  const postData = req.body;
  // if refresh token exists
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const decoded = jwt.verify(
      postData.refreshToken,
      appConfig.refreshTokenSecret
    );
    const token = jwt.sign({ id: decoded.id }, appConfig.tokenSecret, {
      expiresIn: appConfig.tokenTimeExpiration
    });
    const response = {
      token: token
    };
    // update the token in the list
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
};

const doRegister = async (req, res) => {
  const data = req.body;

  try {
    const usuario = await User.createNewUser(data);
    return res.status(200).send(usuario);
  } catch (e) {
    console.log(e);

    res.status(500).send("Erro ao criar usuario");
  }
};
const doRegisterFacebook = async (req, res) => {
  res.status(500).send("not implemented");
};

export default {
  doLogin,
  doLoginFacebook,
  doRegister,
  doRegisterFacebook,
  refreshToken
};
