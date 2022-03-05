const rutas = require("./dialogos/ruta-bot");
const faq = require("./dialogos/faq-bot");
const bye = require("./dialogos/bye-bot");
const intent = require("./dialogos/faq-in-bot");

//flow dirige al chatbot, son caminos.

const flow = (bot)  => {
    
    const d = {};
    //opcion de dependencias

    //conectamos al bot a cada ruta.
    bot.trailing("ruta", rutas(d));
    bot.trailing("faqs", faq(d));
    bot.trailing("bye", bye(d));
    bot.incoming("intencion", intent(d));
}

module.exports = flow