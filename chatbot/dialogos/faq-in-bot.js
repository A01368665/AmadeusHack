const preguntas = require("preguntas")

const incoming = () => {
    return [
(sesion, course) => {
    const entrada =session.getMessage().data
    if(!(entrada && entrada.length)){
        return course.next()
    }

    const respuesta = preguntas[entrada.tolowerCase()]
    if (respuesta){
        session.storage.set("respuesta", respuesta)
        return course.replace("faq")
    }
    return course.next()
}

    ]
}

module.exports = incoming