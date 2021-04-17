const Discord = require("discord.js")
const { prefix } = require("../../config.json");
const db = require("quick.db");
const os = require("os")

module.exports = {
    name: 'info',
    aliases: ['infosky', 'infošky', 'botinfo'],
    description: 'Pošle moje infošky',
    category: "informace",
    async execute(client, message, args) {
        var in_prefix = prefix;
        if (message.guild) {
            if (db.has(message.guild.id)) {
                in_prefix = db.get(message.guild.id);
			}
		}
    const embed = new Discord.MessageEmbed()
    .setColor('#e54918')
    .setTitle('Karot')
    .setDescription('Karot je slovenský Discord bot zameraný na rôzne moderačné, zábavné a informačné príkazy.')
    .addField('Web:', '[www.karot.xyz](https://karot.xyz)')
    .addField('Prefix:', `\`${in_prefix}\``)
    .addField(`Ping`, `${Date.now() - message.createdTimestamp}ms`)
    .addField(`Využitie RAM:`, `${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%)`, true)
    .addField('Oficiálny Discord server:',  '[9Byp7mWfMF](https://discord.com/invite/9Byp7mWfMF)')
    .addField('GitHub', '[KarotBot](https://github.com/KarotBot)')
message.channel.send(embed)
.catch(error =>
    console.log("Nejaký čurák mi zobral permisie... >:0")
);
}}
