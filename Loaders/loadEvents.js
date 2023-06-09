const fs = require("fs")

module.exports = async(bot) => {

    fs.readdirSync("./Events").filter(f => f.endsWith(".js")).forEach(async file => {

        console.log(file)
        const events = require(`../Events/${file}`);
        bot.on(file.split(".js").join(""), events.bind(null, bot))
        console.log(`Evènement ${file} chargé avec succès !`)
    })
}