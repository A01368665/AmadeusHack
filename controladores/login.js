const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Denuncia = require("../modelos/denuncia")

loginRouter.post('/', async (request, response) => {
  const { folio, contra } = request.body

  const denuncia = await Denuncia.findOne({ folio })

  //buscamos que contrasena sea corecta
  //validamos entrada
  const correcto = denuncia === null
    ? false
    : await bcrypt.compare(contra, denuncia.passwordHash)

  if (!(user && correcto)) {
    return response.status(401).json({
      error: "usuario o contraseña invalidos."
    })
  }

  //anadimos un webtoken
  const usuarioToken = {
    username: denuncia.folio,
    id: denuncia._id,
  }

  const token = jwt.sign(usuarioToken, process.env.SECRET)

  response.status(200).send({ token, username:denuncia.folio})
})

module.exports = loginR