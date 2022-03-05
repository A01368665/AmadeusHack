const rutasL = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require("../utilidades/config")
const Denuncia = require("../modelos/denuncia")

rutasL.post('/', async (request, response) => {
  const { folio, contra } = request.body

  const denuncia = await Denuncia.findOne({ folio })

  //buscamos que contrasena sea corecta
  //validamos entrada
  const correcto = denuncia === null
    ? false
    : await bcrypt.compare(contra, denuncia.contraHash)

  if (!(denuncia && correcto)) {
    return response.status(401).json({
      error: "usuario o contraseña invalidos."
    })
  }

  //anadimos un webtoken
  const usuarioToken = {
    folio: denuncia.folio,
    id: denuncia._id,
   
  }

  const token = jwt.sign(usuarioToken, config.SECRET,  { expiresIn: 60*60 })

  response.status(200).send({ token, folio: denuncia.folio})
})

module.exports = rutasL