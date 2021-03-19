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
    .setDescription('Už čoskoro...')
message.channel.send(embed)
.catch(error =>
    console.log("Nejaký čurák mi zobral permisie... >:0")
);
}}
