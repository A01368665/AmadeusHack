require("dotenv").config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
// agregamos el puerto y la clave secreta de mongodb
module.exports = {
    MONGODB_URI,
    PORT,
    SECRET
}