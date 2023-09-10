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









module.exports = {

    name: "leaderboard",
    description: "Donne le classement de l'expérience du serveur",
    utilisation: "!ban",
    permission: "Aucune",
    dm: false,
    category: "Expérience",
    options: [],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err, req) => {

            if(req.length < 1) return message.reply("Personne n'a de l'xp !")

            await message.deferReply()

            const calculXp = (xp, level) => {
                let xptotal = 0;
                for(let i = 0; i < level + 1; i++) xptotal += i * 1000
                xptotal += xp;
                return xptotal;
            }

            let leaderboard = await req.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))

            const Leaderboard = await new Canvas.Leaderboard()
            .setBot(bot)
            .setGuild(message.guild)
            .setBackground("https://cdn.supercell.com/supercell.com/221208091344/supercell.com/files/games_thumbnail_clashofclans.jpg")
            .setColorFont("#ffffff")

            for(let i = 0; i < (req.length > 10 ? 10 : req.length); i++) {

                await Leaderboard.addUser(await bot.users.fetch(leaderboard[i].user), parseInt(leaderboard[i].level), parseInt(leaderboard[i].xp), (parseInt(leaderboard[i].level) + 1) * 1000)
            }

            const Image = await Leaderboard.toLeaderboard()

            await message.followUp({files: [new Discord.AttachmentBuilder(Image.toBuffer(), {name: "leaderboard.png"})]})
        })

    }
}










const Discord = require("discord.js")

module.exports = {

    name: "lock",
    description: "Lock un salon",
    utilisation: "!ban",
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le salon à lock",
            required: true,
            autocomplete: false
        }, {
            type: "role",
            name: "role",
            description: "Le role à lock",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon")
        if(channel.type !== Discord.Constants.ChannelTypes.GUILD_TEXT && channel.type !== Discord.Constants.ChannelTypes.GUILD_PUBLIC_THREAD&& channel.type !== Discord.Constants.ChannelTypes.GUILD_PRIVATE_THREAD) return message.reply("Envoyer un salon textuel")
        
        let role = args.getRole("role")
        if(role && !message.guild.roles.cache.get(role.id)) return message.reply("Pas de role")
        if(!role) role = message.guild.roles.everyone;

        if(channel.permissionOverwrites.cache.get(role.id)?.deny.toArray(false).includes("SendMessages")) return message.reply(`Le rôle \`${role.name}\` est déjà lock dans le salon ${channel}`)

        if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: false})
        else await channel.permissionOverwrites.create(role.id, {SendMessages: false})

        await message.reply(`Le rôle \`${role.name}\` a bien été lock dans le salon ${channel}`)
    }
}











const Discord = require("discord.js")

module.exports = {

    name: "lock",
    description: "Lock un salon",
    utilisation: "!ban",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le salon à lock",
            required: true,
            autocomplete: false
        }, {
            type: "role",
            name: "role",
            description: "Le role à lock",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon")
        if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.GuildPublicThread && channel.type !== Discord.ChannelType.GuildPrivateThread) return message.reply("Envoyer un salon textuel");
        
        let role = args.getRole("role")
        if(role && !message.guild.roles.cache.get(role.id)) return message.reply("Pas de role")
        if(!role) role = message.guild.roles.everyone;

        if(channel.permissionOverwrites.cache.get(role.id)?.deny.toArray(false).includes("SendMessages")) return message.reply(`Le rôle \`${role.name}\` est déjà lock dans le salon ${channel}`)

        if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: false})
        else await channel.permissionOverwrites.create(role.id, {SendMessages: false})

        await message.reply(`Le rôle \`${role.name}\` a bien été lock dans le salon ${channel}`)
    }
}













const { Client, Intents } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

    bot.once('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
  
  // Mettre le bot en mode "ne pas déranger"
  bot.user.setPresence({
    status: 'dnd',
    activity: {
      name: 'En mode ne pas déranger',
      type: 'PLAYING', // Vous pouvez également utiliser 'STREAMING', 'LISTENING' ou 'WATCHING'
    },
  });
});










const Discord = require("discord.js")

module.exports = {

    name: "setstatus",
    description: "Change le status du bot",
    utilisation: "!ban",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "string",
            name: "activité",
            description: "Activité du bot",
            required: true,
            autocomplete: true
        }, {
            type: "string",
            name: "status",
            description: "Status du bot",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "lien",
            description: "URL du stream",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let activity = args.getString("activité")
        if(activity !== "Listening" && activity !== "Playing" && activity !== "Competing" && activity !== "Watching" && activity !== "Streaming") return message.reply("Merci de suivre l'autocomplete")

        let status = args.getString("status")

        if(activity === "Streaming" && args.getString("lien") === null) return message.reply("Indiquer une URL")
        if(activity === "Streaming" && !args.getString("lien").match(new RegExp(/^(?:https?:\/\/)?(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/))) return message.reply("Indiquer une URL Twitch")

        if(activity === "Streaming") await bot.user.setActivity(status, {type: Discord.ActivityType[activity], url: args.getString("lien")})
        else await bot.user.setActivity(status, {type: Discord.ActivityType[activity]})
        await message.reply("Status mis à jour !")
    }
}















name: "setstatus",
    description: "Change le status du bot",
    utilisation: "!setstatus",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "STRING",
            name: "activity",
            description: "Activité du bot",
            required: true,
            options: [
                {
                    name: "Listening",
                    value: "LISTENING"
                },
                {
                    name: "Playing",
                    value: "PLAYING"
                },
                {
                    name: "Competing",
                    value: "COMPETING"
                },
                {
                    name: "Watching",
                    value: "WATCHING"
                },
                {
                    name: "Streaming",
                    value: "STREAMING"
                }
            ]
        },
        {
            type: "STRING",
            name: "status",
            description: "Status du bot",
            required: true,
            options: [
                {
                    name: "En ligne",
                    value: "ONLINE"
                },
                {
                    name: "Ne pas déranger",
                    value: "dnd"
                },
                {
                    name: "Invisible",
                    value: "INVISIBLE"
                },
            ]
        },
        {
            type: "STRING",
            name: "url",
            description: "URL du stream",
            required: false
        }
    ],




    const Discord = require('discord.js');

module.exports = {
    name: "addlevel",
    description: "Donne du level à un membre",
    utilisation: "!addlevel",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Administration",
    options: [
        {
            type: "user",
            name: "member",
            description: "Le membre à qui donner du level",
            required: true,
        },
        {
            type: "integer",
            name: "level",
            description: "Le nombre de level",
            required: true,
        },
    ],

    async run(bot, message, args, db) {

        let user;
        if(args.getUser("utilisateur")) {
            user = args.getUser("utilisateur")
            if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("Pas de membre !")

        } else user = message.user;

        db.query(`SELECT * FROM  xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            db.query(`SELECT * FROM  xp WHERE guild = '${message.guildId}'`, async (err, all) => {

                if(req.length < 1) return message.reply("Ce membre n'a pas d'xp !")

                await message.deferReply()

                const calculXp = (xp, level) => {
                    let xptotal = 0;
                    for(let i = 0; i < level + 1; i++) xptotal += i * 1000
                    xptotal += xp;
                    return xptotal;
                }
            
            })
        })
}
}