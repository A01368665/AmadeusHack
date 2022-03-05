const RutasDenuncia = require("express").Router()
const bcrypt = require('bcrypt')
const Denuncia = require("../modelos/denuncia")
//utilizamos nuestro modelo de denuncia

RutasDenuncia.get("/", async (req, res) => {
   const denuncias = await Denuncia.find({})
   res.json(denuncias)
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
codigo: body.codigo,
folio: folio,
contra: contraHash
})

const salvar = await entrada.save()
if (salvar) res.status(201).json(salvar)
})


//modelo preliminar de cada denuncia
//a definir en futuro

module.exports = RutasDenuncia