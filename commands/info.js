const Discord = require("discord.js")
console.log("Načítavam pičovinky pre infošky o mne... 🥕")
module.exports = {
    name: 'info',
    aliases: ['infosky', 'infošky', 'botinfo'],
    description: 'Pošle moje infošky',
    async execute(message, args) {
    const embed = new Discord.MessageEmbed()
    .setColor('#e54918')
    .setTitle('Karot')
    .setDescription('Karot je slovenský Discord bot zameraný na rôzne moderačné, zábavné a informačné príkazy.')
    .addField('Web:', '[www.karot.xyz](https://karot.xyz)')
    .addField('Prefix:', '`+`')
    .addField(`Ping`, `${Date.now() - message.createdTimestamp}ms`)
    .addField('Oficiálny Discord server:',  '[9Byp7mWfMF](https://discord.com/invite/9Byp7mWfMF)')
    .addField('GitHub', '[KarotBot](https://github.com/KarotBot)')
message.channel.send(embed)
.catch(error =>
    console.log("Nejaký čurák mi zobral permisie... >:0")
);
}}
