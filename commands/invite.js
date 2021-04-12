const Discord = require("discord.js")
console.log("Načítavam pozvanky")
module.exports = {
    name: 'invite',
    aliases: ['infosky', 'infošky', 'botinfo'],
    description: 'Pošle moje infošky',
    async execute(message, args) {
    const embed = new Discord.MessageEmbed()
    .setColor('#e54918')
    .setTitle('Karot')
    .setDescription('Ďakujeme za tvoj záujem o bota. Invite nájdeš na našom webe.')
    .addField('Web:', '[www.karot.xyz](https://karot.xyz)')
message.channel.send(embed)
.catch(error =>
    console.log("Nejaký čurák mi zobral permisie... >:0")
);
}}
