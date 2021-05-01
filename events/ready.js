const db = require("quick.db");
const blacklistTable = new db.table("blacklist");
const { MessageEmbed } = require("discord.js");
const { GCommands } = require("gcommands");

module.exports = {
    name: "ready",
    run: (client) => {

        new GCommands(client, {
            cmdDir: "slash",
            errorMessage: "Error :(",
            slash: {
               slash: 'true',
                prefix: '.'
            },
            cooldown: {
                default: 3
            }
        })

        const activities_list = [
            `www.karot.xyz | !help`,
            `${client.guilds.cache.size} Guilds | !help`,
            `${client.users.cache.size} Users | !help`,
            ];
        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
            client.user.setActivity(activities_list[index], { type: 'WATCHING' });
            client.guilds.cache.forEach(guild => {
               if (blacklistTable.all().filter(datatable => datatable.ID === "guilds" && datatable.data.blacklisted && datatable.data.blacklisted.includes(guild.id)).length > 0) {
                   guild.leave();    
                   const owner = guild.owner;
                   const embed = new MessageEmbed()
                   		.setColor("#e54918")
                   		.setAuthor(owner.user.tag, owner.user.avatarURL({ size: 128, dynamic: true }))
                   		.setTitle("Banned")
                        .addField("Your guild " + guild.name + " was banned from using the services of Karot.", "If you think that this punishment is false, you can appeal the decission [here](https://forms.gle/vBra2ZnmGvG88wDo9).")
                        .addField("Please review the TOS", "You were most likely banned for a violation of the terms of service of Karot.\nPlease read them [here](https://karot.xyz/terms)")
                   		.setFooter("karot.xyz")
                   		.setTimestamp();
                   owner.send(embed);
               } 
            });
        }, 30000);
    }
}
