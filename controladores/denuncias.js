const RutasD = require("express").Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const config= require("../utilidades/config")
const Denuncia = require("../modelos/denuncia")


//utilizamos nuestro modelo de denuncia
const getToken = req => {
  const autorizacion = req.get('authorization')
  if (autorizacion && autorizacion.toLowerCase().startsWith('bearer ')) {
    return autorizacion.substring(7)
    //regresa el token web
    //tomado del auth heather
    //
  }
  return null
}

RutasD.get("/", async (req, res) => {
   const denuncias = await Denuncia.find({})
   res.json(denuncias)
})

//solo pueden acceder usuarios a su propia solicitud.

RutasD.get("/:folio", async (req, res) => {
 
const folio = req.params.folio
const token = getToken(req)
try{
  const comparaToken = jwt.verify(token, config.SECRET)
} catch(err) {
return res.status(401).json({error: err})
}


if(!(token ||comparaToken.id)){
return res.status(401).json({error: "no existe el token solicitado."})
  }
  
  const den = await Denuncia.findOne({folio})
  if(den) {
  
    res.json(den.toJSON())
  } else {
    res.status(404).end()
  }
  
  //regresamos la nota encontrada
})

RutasD.post("/",async (req, res) => {
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

module.exports = RutasD