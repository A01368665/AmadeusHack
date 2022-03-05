//implementando chatbot con bard
const {robot} = require("bard-builder")
const flow = require("./flow")

const crear = () => {
    const bot = new robot({name: "dante-denunciante"})
flow(bot)
bot.start()
}

crear()