const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController")
const JobController = require("./controllers/JobController")

//const views = __dirname + "/views/"; Refatoração setada o views em server.js
// O EJS já entende por padrão a pasta views, porém como ela está dentro da pasta 'src', preciso colocar este path

// Object Literal : Ao criar um objeto, já terá sua propriedades definidas na escrita do codigo.

// *Request / Response* //
routes.get("/", JobController.index);
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
// Para renderizar o objeto 'profile', é preciso passá-lo como segundo parametro
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;
