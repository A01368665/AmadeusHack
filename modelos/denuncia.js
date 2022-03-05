
const mongoose = require("mongoose")

const DenunciaSchema = new mongoose.Schema({

    titulo: String,
    denunciado: String,
    caracteristicas: String,
    folio: String,
    contra: String,

})

DenunciaSchema.set("toJSON", {
    transform:(document, r) => {
        r.id = r._id.toString()
        delete r._id
        delete r.__v
        delete r.passwordHash
    }
})


module.exports = mongoose.model("Denuncia", DenunciaSchema)