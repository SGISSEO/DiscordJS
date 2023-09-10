const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Affiche la latence",
    utilisation: "!ping",
    permission: "Aucune",
    dm: true,
    category: "Informations",

    async run(bot, message, args) {

        await message.reply(`Ping : \`${bot.ws.ping}\``)
    }
       
}