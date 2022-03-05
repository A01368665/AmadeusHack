const config = require("./utilidades/config")
const express = require("express")
const app = express()
app.use(express.static('build'));
const cors = require("cors")
const rutasD = require("./controladores/denuncias")
const rutasL = require("./controladores/login")
const middleware  =require('./utilidades/middleware')
const mongoose = require("mongoose")

console.log("CONECTANDOME A ", config.MONGODB_URI)

//esta primer connexion sera la prueba de que 
// la base funcione correctamente

mongoose.connect("mongodb+srv://altoalacorrupcion:w6FB2zN6prhH1f6l@cluster0.q0iuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then( ( ) => console.log("Conexión a base de datos exitosa"))
.catch( error => console.log("ha habido un problema con la base de datos: " + error))

app.use(cors())
app.use(express.json())


app.use("/api/denuncias", rutasD)
app.use("/api/login", rutasL)

app.use(middleware.unknownEndpoint)
app.use(middleware.ErrorHandler)

app.listen(config.PORT, () => {
    console.log("El servidor esta online! " + config.PORT)
})


