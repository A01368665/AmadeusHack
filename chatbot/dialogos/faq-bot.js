const faq = (d) => {
    return[
        (session, course) => {
            const hay_respuesta = session.storage.get("respuesta")
            if( hay_respuesta) {
                return course.next()
            }
            //si hay respuesta mandas directo a respuesta
session.send("¿Cómo te puedo apoyar?")
//si no hay respuesta incluye dialogo y espera respuesta
return course.wait()
            
        },
        (session, course) =>{
            const hay_respuesta = session.storage.get("answer")
            if(!hay_respuesta){
            session.send("Te ofrezco una disculpa, no entiendo tu pregunta.")
            return course.replace("bye")
            }
           
        //cuando la respuesta existe, es enviada
        //reseteamos el storage
        session.send(hay_respuesta)
        session.storage.set("respuesta", null)
        return course.next()

        },
        (session, course) => {
            session.send("¿Deseas hacer otra pregunta?")
            return course.wait()
        },
        (session, course)=>{
            const res = session.getMessage().data
            if (response != "si"){
                session.send("Éxito en tus denuncias.")
                return course.replace("bye")
            }
            return course.replace("faq")
        }
    ]
}

module.exports = faq