export default {
  tokenSecret: "<2xt4>gTwdsSG*O",
  tokenTimeExpiration: "7d",
  refreshTokenSecret: "hn7%a@EW~.f}u6^FFcqx!6!9e|?YsF",
  refreshTokenTimeExpiration: "30d",
  publicRoutes: ["/", "/login", "/register", "/token", "/system/status"],

  database: {
    dev: {
      DB_PROTOCOL: "mongodb://",
      DB_HOST: "localhost",
      DB_USER: "obah_username",
      DB_PASSWORD: "obah_pwd",
      DB_DATABASE: "admin",
      DB_PORT: ":27017",
      DB_OPTIONS: ""
    },
    production: {
      DB_PROTOCOL: "mongodb+srv://",
      DB_HOST: "cluster0-ohv4h.mongodb.net",
      DB_USER: "obah-user",
      DB_PASSWORD: "tke3QWSrPg19cy2X",
      DB_DATABASE: "test",
      DB_PORT: "",
      DB_OPTIONS: "retryWrites=true&w=majority"
    }
  }
};
