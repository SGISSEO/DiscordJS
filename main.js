const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config")



bot.commands = new Discord.Collection()
bot.color = "#ffffff";
bot.function = {
    createId: require("./Fonctions/createId"),
    generateCaptcha: require("./Fonctions/generateCaptcha"),
    searchSpam: require("./Fonctions/searchSpam")
}

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)





