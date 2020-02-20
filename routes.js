const express = require("express")
const routes = express.Router() //! Vai ser responsavel pelas rotas

module.exports = routes //! Vai exportar as rotas para o server.js

routes.get("/", function(req, res) {
  res.render("layout")
})