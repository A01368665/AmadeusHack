require("dotenv").config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
// agregamos el puerto y la clave secreta de mongodb
module.exports - {
    MONGODB_URI,
    PORT
}