const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors)
const rutas = require("./controladores/denuncias")

app.get("/", (req, res) => {
res.send("<h1>HOLA SI SIRVO</h1>")
})
const PORT = 3001
app.listen(PORT, () => {
    console.log("El servidor esta online!")
})


