const config = require("./utilidades/config")
const express = require("express")
const app = express()
const cors = require("cors")
const rutasD = require("./controladores/denuncias")

const mongoose = require("mongoose")


console.log("CONECTANDOME A ", config.MONGODB_URI)

//esta primer connexion sera la prueba de que 
// la base funcione correctamente

mongoose.connect("mongodb+srv://altoalacorrupcion:w6FB2zN6prhH1f6l@cluster0.q0iuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then( ( ) => console.log("Conexión a base de datos exitosa"))
.catch( error => console.log("ha habido un problema con la base de datos: " + error))

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
res.send("<h1>Conectado al backend correctamente.</h1>")
})

app.use("/api/denuncias", rutasD)
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

app.listen(3001, () => {
    console.log("El servidor esta online! " + 3001)
})


