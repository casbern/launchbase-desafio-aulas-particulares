const express = require("express")
const routes = express.Router() //! Vai ser responsavel pelas rotas

const teachers = require("./teachers")


routes.get("/", function(req, res) {
  return res.redirect("/teachers")
})

routes.get("/teachers", teachers.index)

routes.get("/teachers/create", teachers.create)

routes.get("/teachers/:id", teachers.show)

routes.post("/teachers", teachers.post)

routes.get("/teachers/:id/edit", teachers.edit)

routes.put("/teachers", teachers.put)

routes.delete("/teachers", teachers.delete)


module.exports = routes //! Vai exportar as rotas para o server.js