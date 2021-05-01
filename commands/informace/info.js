const Discord = require("discord.js")
const os = require("os")
const { prefix } = require("../../config.json")
const db = require("quick.db");

module.exports = {
    name: 'info',
    aliases: ['infosky', 'infošky', 'botinfo'],
    description: 'Pošle moje infošky',
    category: "informace",
    async execute(client, message, args) {
        var in_prefix = prefix;
        if (db.has(message.guild.id)) {
            in_prefix = db.get(message.guild.id);
        }
    const embed = new Discord.MessageEmbed()
    .setColor('#e54918')
    .setTitle('Karot')
    .setDescription('Karot is a Slovak Discord bot that has a lot of fun, moderation & informational commands.')
    .addField('Web:', '[www.karot.xyz](https://karot.xyz)')
    .addField('Prefix:', `\`${in_prefix}\``)
    .addField(`Ping:`, `${Date.now() - message.createdTimestamp}ms`)
    .addField(`RAM Usage:`, `${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%)`, true)
    .addField('Official Discord server:',  '[9Byp7mWfMF](https://discord.com/invite/9Byp7mWfMF)')
    .addField('GitHub', '[KarotBot](https://github.com/KarotBot)')
message.channel.send(embed)
.catch(error =>
    console.log("Nejaký čurák mi zobral permisie... >:0")
);
}}
