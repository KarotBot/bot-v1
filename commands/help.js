const Discord = require("discord.js")
console.log("Pošle moje príkazy")
module.exports = {
    name: 'help',
    aliases: ['pomoc', 'prikazy', 'príkazy'],
    description: 'Pošle moje príkazy',
    async execute(message, args) {
    const embed = new Discord.MessageEmbed()
    .setColor('#ed9121')
    .setTitle('<:kt_job:822478953939599390>︱List príkazov')
    .setDescription('List všetkých príkazov Karot.')
    .addField('Informačné', '`info`, `ping`, `help`, `serverinfo`')
    .addField('Zábavné', '`cislo`')
    .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
message.channel.send(embed)
.catch(error =>
    console.log("Nejaký čurák mi zobral permisie... >:0")
);
}}
