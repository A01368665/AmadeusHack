const mongoose = require("mongoose")

const DenunciaSchema = new mongoose.Schema({

    titulo: String,
    denunciado: String,
    caracteristicas: String,

})

DenunciaSchema.set("toJSON", {
    transform:(document, r) => {
        r.id = r._id.toString()
        delete r._id
        delete r.__v
    }
})


module.exports = mongoose.model("Denuncia", DenunciaSchema)