const express = require("express")
const routes = express.Router() //! Vai ser responsavel pelas rotas

const teachers = require("./teachers")


routes.get("/", function(req, res) {
  return res.redirect("/teachers")
})

routes.get("/teachers", function(req, res) {
  return res.render("teachers/index")
})

routes.get("/teachers/create", function(req, res) {
  return res.render("teachers/create.njk")
})

routes.get("/teachers/:id", teachers.show)


routes.post("/teachers", teachers.post)

routes.get("/teachers/:id/edit", teachers.edit)


module.exports = routes //! Vai exportar as rotas para o server.js