const fs = require("fs");
const path = require("path");
const { Router } = require("express");

const start = (app) => {
  const router = Router();
  app.use(router);

  const directory = path.resolve("./src/routes/");
  const filelist = fs.readdirSync(directory);

  for (let i = 0; i < filelist.length; i++) {
    const file = filelist[i];
    const routes = require(directory + "/" + file);
    routes(router);
  }

  const route = "/:route";
  const api = require("../api/template");
  const auth = require("../api/auth");
  router
    .route(route)
    .all((req, res, next) => {
      if (req.params.route === "user") {
        return next(); // Pula o middleware de autenticação se a rota for '/user'
      }
      auth.validate(req, res, next); // Aplica a autenticação nas outras rotas
    })
    .get(api.get)
    .post(api.insert);
  router
    .route(`${route}/:id`)
    .all(auth.validate)
    .patch(api.update)
    .delete(api.remove);

  router.route("*").all((req, res) => {
    res.status(404).send("Erro, rota não encontrada.");
  });
};

module.exports = { start };
