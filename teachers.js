const fs = require("fs")
const data = require("./data.json")

//create
exports.post = function (req, res) {
  const keys = Object.keys(req.body)

  //* Checando se todos os campos estão preenchidos
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all the gaps")
    }
  }

  //* Desestruturação de dados
  let {
    avatar_url,
    name,
    birth,
    scholarity,
    class_type,
    services
  } = req.body

  birth = Date.parse(req.body.birth)
  const created_at = Date.now()
  const id = Number(data.teachers.length + 1)

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    scholarity,
    class_type,
    services,
    created_at
  })

  //* Escrevendo o nome professor no data.json
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write file error")
    }
    return res.redirect("/teachers")
  })
  //return res.send(req.body)
}

//show
exports.show = function (req, res) {
  const { id } = req.params
  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id
  })

  if (!foundTeacher) {
    return res.send("Teacher was not found!")
  }

  //return res.send(foundTeacher) 
  return res.render("teachers/show", { teacher: foundTeacher})
}