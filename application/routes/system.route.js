export const SystemRouter = app => {
  app.route("/system/status").get((req, res) => {
    return res.send("ok");
  });
};
