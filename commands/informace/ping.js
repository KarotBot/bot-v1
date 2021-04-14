const Discord = require("discord.js")

module.exports = {
    name: 'ping',
    discription: 'Pošle môj "perfektný" ping',
    category: "informace",
    async execute(client, message, args) {
        var embed = new Discord.MessageEmbed()
        .setTitle('<:kt_hey:822468640103202858>︱Môj ping')
        .setColor('#e54918')
        .setDescription(`${Date.now() - message.createdTimestamp}ms`)
        .setFooter('karot.xyz')
        message.channel.send(embed)
        .catch(error =>
            console.log("Nejaký čurák mi zobral permisie... >:0")
        );
    }
}
//console.log("Načítavam merač mojej latencioš. ~(˘▾˘~)")
