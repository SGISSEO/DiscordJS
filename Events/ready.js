const Discord = require("discord.js")
const DBD = require("discord-dashboard")
const Theme = require("dbd-capriham-theme")
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const config = require("../config")


module.exports = async bot => {

    bot.db = await loadDatabase()
    bot.db.connect(function (err) {
        if(err) console.log(err)
        console.log("Base de données connectée !")
    })

    await loadSlashCommands(bot)

    let allcommands = [];
    await bot.commands.forEach(command => allcommands.push({commandName: command.name, commandUsage: command.utilisation, commandDescription: command.description}))

    console.log(`${bot.user.tag} est bien en ligne !`)

    await DBD.useLicense(config.license)
    DBD.Dashboard = DBD.UpdatedClass()

    const Dashboard = new DBD.Dashboard({

        port: 8080,
        client: {
            id: bot.user.id,
            secret: config.secret
        },
        redirectUri: "http://localhost:8080/discord/callback",
        domain: "http://localhost",
        useCategorySet: true,
        minimalizedConsoleLogs: true,
        acceptPrivacyPolicy: true,
        bot: bot,
        theme: Theme({
            websiteName: "RebornOfLegends",
            iconURL: "https://cdn.supercell.com/supercell.com/221208091344/supercell.com/files/games_thumbnail_clashofclans.jpg",
            index: {
                card: {
                    title: "RebornOfLegends, un robot qui a tout pour plaire",
                    description: "ajoute le stp",
                },
                information: {
                    title: "informations",
                    description: "description"
                },
                feeds: {
                    title: "Feeds",
                    list: [
                        {
                            icon: "fa fa-house",
                            text: "New user registered",
                            timeText: "Just now",
                            bg: "bg-light-info"
                        },
                        {
                            icon: "fa fa-server",
                            text: "Server issues",
                            timeText: "3 minutes ago",
                            bg: "bg-light-danger"
                        }
                    ]
                }
            },
            commands: {
                pageTitle: "Commandes",
                table: {
                    title: "Toutes les commandes",
                    subTitle: "A voir",
                    list: allcommands
                }
            }
        }),
        settings: [
            {
                categoryId: "admin",
                categoryName: "Administration",
                categoryDescription: "Gère le module d'administration",
                getActualSet: async ({guild}) => {
                    const antiraid = new Promise((resolve, reject) => {
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                            (req[0].antiraid === "true") ? resolve(true) : resolve(false)     
                        })
                    })
                    const antispam = new Promise((resolve, reject) => {
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                            (req[0].antispam === "true") ? resolve(true) : resolve(false)     
                        })
                    })
                    const captcha = new Promise((resolve, reject) => {
                        bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                            (req[0].antispam === "captcha") ? resolve(null) : resolve(req[0].captcha)     
                        })
                    })
                    return await [{optionId: "antiraid", data: await antiraid}, {optionId: "antispam", data: await antispam}, {optionId: "captcha", data: await captcha}]
                },
                setNew: async({guild, data}) => {
                    for(let i = 0; i < data.length; i++) {
                        bot.db.query(`UPDATE server  SET ${data[i].optionId} = '${data[i].data === "" ? false : data[i].data}' WHERE guild = ${guild.id}`)
                    }
                },
                categoryOptionsList: [
                    {
                        optionId: "antiraid",
                        optionName: "Antiraid",
                        optionDescription: "Active ou désactive l'antiraid",
                        optionType: DBD.formTypes.switch(false)
                    }, {
                        optionId: "antispam",
                        optionName: "Antispam",
                        optionDescription: "Active ou désactive l'antispam",
                        optionType: DBD.formTypes.switch(false)
                    }, {
                        optionId: "captcha",
                        optionName: "Captcha",
                        optionDescription: "Active ou désactive le captcha",
                        optionType: DBD.formTypes.channelsSelect(false, [Discord.ChannelType.GuildText])
                    }
                ]
            }   
        ]
    })

    Dashboard.init()
}