const Discord = require("discord.js")


module.exports = {

    name: "reactionrole",
    description: "Envoie le reaction role",
    utilisation: "!reactionrole",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "Administration",
    options: [],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM server WHERE guild = '${message.guildId}'`, async (err, req) => {

            let roles = req[0].reactionrole.split(" ")
            
            if(roles.length <= 0) return message.reply("Pas de rôle")

            let options = [];
            for(let i = 0; i < roles.length; i++) {
                let role = message.guild.roles.cache.get(roles[i])
                if(!role) return;
                await options.push({label: `@${role.name}`, value: role.id})
            }

            let Embed = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle("Reaction Role")
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription("Réagir avec les réactions pour obtenir un rôle !")
                .setTimestamp()
                .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})

            const menu = new Discord.ActionRowBuilder().addComponents(new Discord.StringSelectMenuBuilder()
                .setCustomId("reactionrole")
                .setMinValues(0)
                .setMaxValues(roles.length)
                .setPlaceholder("Sélectionnez vos rôles")
                .addOptions(options))

                await message.reply({embeds: [Embed], components: [menu]})
        })
    }       
}