/* (node main) est ce qui active le bot pour se mettre en ligne

/*const Discord = require("discord.js")  /* C'est une Importation de module


/*const bot = new Discord.Client({intents: 3276799}) /* C'est une importation de module


/*const config = require("./config") /* C'est une importation de module

/*bot.login(config.token) /* C'est ce qui va permettre de mettre en ligne le bot

/*bot.on("ready", async () => {  /* C'est un évenement du bot, c'est ce quelque chose qui va se déclencher quand une action sera faites 
    console.log('${bot.user.tag} est bien en ligne !') /* ce qui se trouve entre les {} ca va être le code qui va être exécuté quand le bot sera en ligne 
})  

|| = ou

if(!command.name || typeof command.name !== "string") throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de  nom !`)
= Ca marque une erreur quand une commande n'a pas de nom

/* bot.commands = new Discord.Collection() = Une Collection ces ce qui va permettre de garder des donnée /*



messageCreate.js
const Discord = require("discord.js")

module.exports = async (bot, message) => {

    let prefix = "!";

    let messageArray = message.content.split(" ")
    let commandName = messageArray[0].slice(prefix.length)
    let args = messageArray.slice(1)
    
    if(!message.content.startsWith(prefix)) return;

    let command = require(`../Commandes/${commandName}`) 
    if (!command) return message.reply("Y a pas de commande !")

    command.run(bot, message, args)
}




BAN COMMANDE

module.exports = {

    name: "ban",
    description: "Ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "Le membre à bannir",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du bannissement",
            required: false
        }
    ],

    async run(bot, message, args) {

        await message.reply(`Ban : \`${bot.ws.ban}\``)

    }
}




KICK COMMAND

const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Kick un membre",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "Le membre à kick",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: false
        }
    ],

    async run(bot, message, args) {
        
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre à kick !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre à kick !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie.";

        if(message.user.id === user.id) return message.reply("Essaie pas de te kick !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne kick pas le propriétaire du serveur !")
        if(member && !member.kickable) return message.reply("Je ne peux pas kick ce membre !")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas kick cette personne !")

        try {await user.send(`Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

        await member.kick(reason)
    }
}






KICK COMMANDE 2

const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Kick un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "Le membre à kick",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: false
        }
    ],

    async run(bot, message, args) {

        try {
        
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Pas de membre à bannir")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if(message.user.id === user.id) return message.reply("Essaie pas de te bannir !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne ban pas le propriétaire du serveur !")
            if(member && !member.kickable) return message.reply("Je ne peux pas bannir ce membre !")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir cette personne !")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà ban !")

            try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {

            return message.reply("Pas de membre à bannir !")
        }
    }
}






if(!member) return message.reply("Pas de membre à kick !")

let user = args.getUser("membre")







UNBAN COMMANDE


const Discord = require("discord.js")

module.exports = {

    name: "unban",
    description: "Unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur à débannir",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du débannissement",
            required: false
        }
    ],

    async run(bot, message, args) {
        try {

            let user = await bot.args.getUser("utilisateur")
            if(!user) return message.reply("Pas d'utilisateur !")
            

            let reason = args.getString("raison")
            if(!reason) reason = "Pas de raison fournie.";

            if((await message.guild.bans.fetch(user.id).size <= 0)) return message.reply("Cet utilisateur n'est pas banni !")

            try {await user.send(`Tu as été unban par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}

            await message.reply(`${message.user} a unban ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.members.unban(user, reason)

        } catch (err) {

            return message.reply("Pas d'utilisateur !")
        }
    }
}

const loadDatabase = require("./Loaders/loadDatabase")

(async () => {

bot.db = await loadDatabase()
bot.db = await loadDatabase()



    bot.db.connect(function () {   

        console.log("Base de données connectée avec succès !")
    })
})



let user = args.getUser("membre")

let user = await bot.users.fetch(args._hoistedOptions[0].value)



IMAGE LIEN A RETENIR:


"https://static.wikia.nocookie.net/clashofclans/images/2/2b/Experience_Main_Banner.png/revision/latest?cb=20171115173850"

"https://cdn.supercell.com/supercell.com/221208091344/supercell.com/files/games_thumbnail_clashofclans.jpg"









*BACKUP REACTIONROLE*


const Discord = require("discord.js")


module.exports = {

    name: "reactionrole",
    description: "Envoie le reaction role",
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

            const menu = new Discord.ActionRowBuilder().addComponents(new Discord.SelectMenuBuilder()
            .setCustomId("reactionrole")
            .setMinValues(0)
            .setMaxValues(roles.length)
            .setPlaceholder("Sélectionnez vos rôles")
            .addOptions(options))

            await message.reply({components: [menu]})
        })
    }       
}





StringSelectMenuBuilder











REACTIONROLE CODE:





const Discord = require("discord.js")


module.exports = {

    name: "reactionrole",
    description: "Envoie le reaction role",
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





LIGNE 13 READY JS

if(err) console.log(err)


console.log(`La base de donnée a été connectée.`);
UNBAN COMMAND
if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Cet utilisateur n'est pas banni")