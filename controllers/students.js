const fs = require("fs")
const data = require("../data.json")
const { age, date } = require('../utils')
const Intl = require("intl") 

exports.index = function(req, res) {
  return res.render("students/index", { students: data.students })
}

exports.create = function(req, res) {
  return res.render("students/create", 
  { options: {
    high_school: "Ensino Médio Completo",
    higher_education: "Ensino Superior Completo",
    master_degree: "Mestrado",
    doctorate_degree: "Doutorado"  
  } })
}

//show
exports.show = function (req, res) {
  const {
    id
  } = req.params
  const foundStudent = data.students.find(function (student) {
    return student.id == id
  })

  if (!foundStudent) {
    return res.send("Student was not found!")
  }
  
  const student = {
    ...foundStudent,
    age: age(foundStudent.birth),
  }

  return res.render("students/show", {
    student,
    options: {
      high_school: "Ensino Médio Completo",
      higher_education: "Ensino Superior Completo",
      master_degree: "Mestrado",
      doctorate_degree: "Doutorado"
    }
  })
}

//edit
exports.edit = function (req, res) {

  const {
    id
  } = req.params
  const foundStudent = data.students.find(function (student) {
    return student.id == id
  })

  if (!foundStudent) {
    return res.send("Student was not found!")
  }

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).iso,
  }
  
  return res.render("students/edit", { student,
    options: {
      high_school: "Ensino Médio Completo",
      higher_education: "Ensino Superior Completo",
      master_degree: "Mestrado",
      doctorate_degree: "Doutorado"
    } })
}

//create
exports.post = function (req, res) {
  const keys = Object.keys(req.body) //it will be an array of the keys of the object

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
  } = req.body

  birth = Date.parse(req.body.birth)
  const lastStudent = data.students[data.students.length - 1]
  let id

  if (lastStudent) {
    id = lastStudent.id + 1
  } else {
    id = 1
  }

  data.students.push({
    id,
    avatar_url,
    name,
    birth,
    scholarity,
    class_type
  })

  //* Escrevendo o nome professor no data.json
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write file error")
    }
    return res.redirect("/students")
  })
  //return res.send(req.body)
}

//atualizar
exports.put = function (req, res) {
  
  const { id } = req.body
  let index = 0  

  const foundStudent = data.students.find(function (student, foundIndex) {
    if (id == student.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundStudent) {
    return res.send("Student was not found!")
  }

  const student = {
    ...foundStudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.students[index] = student

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write error!")

    return res.redirect(`/students/${id}`)
  })
}

//deletar
exports.delete = function (req, res) {
  const {id} = req.body

  const filteredStudents = data.students.filter(function (student){
    return student.id != id
  })

  data.students = filteredStudents

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write error!")

    return res.redirect("/students")
  })

}