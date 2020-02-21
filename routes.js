const express = require("express")
const routes = express.Router() //! Vai ser responsavel pelas rotas

module.exports = routes //! Vai exportar as rotas para o server.js

routes.get("/", function(req, res) {
  return res.redirect("/teachers")
})

routes.get("/teachers", function(req, res) {
  return res.render("teachers/index")
})

routes.get("/students", function(req, res) {
  return res.send("students")
})
