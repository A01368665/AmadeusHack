const RutasDenuncia = require("express").Router()

const Denuncia = require("../modelos/denuncia")

RutasDenuncia.get("/", (req, res) => {
    Denuncia.find({})
    .then( denuncias => {
        res.json(denuncias)
    }).catch( error => console.log(error))
})

RutasDenuncia.post("/", (req, res) => {
const entrada = new Denuncia("Prueba")
entrada.save()
.then(entr => res.status(201).json(entr))
.catch( error => console.log(error))
})


module.exports = RutasDenuncia