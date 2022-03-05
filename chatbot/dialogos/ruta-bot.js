
const ruta = (deps) => {
return [
    (session, course) => {

        const conocido = session.storage.get("conocido")

        let saludos = "¡Hola! Soy Dante denunciante y estoy aquí para ayudarte."

        if(conocido) saludos = "¡Hola otra vez denunciante!"

        session.send(saludos)

        session.storage.set("conocido", true)

        return course.replace("preguntas")
    }
]
}




module.exports = ruta