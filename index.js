const config = require("./utilidades/config")
console.log(config)
const express = require("express")
const app = express()
const cors = require("cors")
const rutas = require("./controladores/denuncias")
const mongoose = require("mongoose")


console.log("CONECTANDOME A ", config.MONGODB_URI)

//esta primer connexion sera la prueba de que 
// la base funcione correctamente
mongoose.connect("mongodb+srv://altoalacorrupcion:w6FB2zN6prhH1f6l@cluster0.q0iuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then( ( ) => console.log("Conexión a base de datos exitosa"))
.catch( error => console.log("ha habido un problema con la base de datos: " + error))


app.use(cors)
app.use(express.json())

app.get("/", (req, res) => {
    console.log("hola sip")
res.send("<h1>HOLA SI SIRVO</h1>")
})

app.use("/api/denuncias", rutas)

const PORT = 3001
app.listen(PORT, () => {
    console.log("El servidor esta online!" + 3001)
})


