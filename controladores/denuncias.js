const RutasDenuncia = require("express").Router()

const Denuncia = require("../modelos/denuncia")
//utilizamos nuestro modelo de denuncia

RutasDenuncia.get("/", (req, res) => {
    Denuncia.find({})
    .then( denuncias => {
        res.json(denuncias)
    }).catch( error => console.log(error))
})
//esto no debe existir en documento final
//solo es para verificar su funcionameinto


RutasDenuncia.post("/", (req, res) => {
    const body = req.body
const entrada = new Denuncia({titulo: body.titulo,
denunciado: body.denunciado, 
caracteristicas: body.caracteristicas})
entrada.save()
.then(entr => res.status(201).json(entr))
.catch( error => console.log(error))
})


//modelo preliminar de cada denuncia
//a definir en futuro

module.exports = RutasDenuncia