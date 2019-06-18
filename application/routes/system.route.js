export const SystemRouter = app => {
  
  app.route("/").get((req, res) => res.send("obah api works"));
  app.route("/system/status").get((req, res) => res.send("ok"));
  
};
