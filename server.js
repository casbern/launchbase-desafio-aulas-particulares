const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")

//* Ativando o Servidor
const server = express()

//* Usando Middleware
server.use(routes)

//* Mostrando arquivos estaticos com CSS
server.use(express.static('public'))

//* Configurando Nunjucks
server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false, //* mostrar o HTML sem as tags
  noCache: true
}) 

//* Iniciando o Servidor
server.listen(5000, function(req, res) {
  console.log("server is running")
})
