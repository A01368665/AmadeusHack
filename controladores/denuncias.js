const RutasDenuncia = require("express").Router()
const bcrypt = require('bcrypt')
const {SECRET} = require("./utilidades/config")
const jwt = require('jsonwebtoken')
const Denuncia = require("../modelos/denuncia")
const { response } = require("express")
//utilizamos nuestro modelo de denuncia
const getToken = req => {
  const autorizacion = req.get('authorization')
  if (autorizacion && autorizacion.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
    //regresa el token web
    //tomado del auth heather
    //
  }
  return null
}

RutasDenuncia.get("/", async (req, res) => {
   const denuncias = await Denuncia.find({})
   res.json(denuncias)
})

RutasDenuncia.get("/:folio", async (req, res) => {
  const body = req.body
  const folio = req.params.folio
  const token = getToken(req)
  const comparaToken = jwt.verify(token,SECRET )
  if(!comparaToken.id){
return response.status(401).json({error: "no existe el token solicitado."})
  }
  
  const respuesta = await Denuncia.findOne({folio})
  res.json(respuesta)
  //regresamos la nota encontrada
})
RutasDenuncia.post("/", async (req, res) => {
const body = req.body
const { folio, contra } = body

const existe = await Denuncia.findOne({ folio })
if(existe) {
    return res.status(400).json({
      error: 'el folio no es unico'
    })
}

const seguridad = 10
  const contraHash = await bcrypt.hash(contra, seguridad)

const entrada = new Denuncia({
    titulo: body.titulo,
denunciado: body.denunciado, 
caracteristicas: body.caracteristicas,
folio: folio,
contraHash: contraHash
})

const salvar = await entrada.save()
if (salvar) res.status(201).json(salvar)
})


//modelo preliminar de cada denuncia
//a definir en futuro

module.exports = RutasDenuncia