const Discord = require("discord.js")
console.log("Načítavam príkaz na vypnutie... D:")
module.exports = {
    name: 'stop',
    aliases: ['vypni', 'vypnut'],
    description: 'Vypne ma D:',
    async execute(message, args) {
        if (message.author.id !== '403500416631046145') {
            return message.channel.send(`**Nemôžeš použiť tento príkaz.**`)
        }
        var embed = new Discord.MessageEmbed()
        .setColor('#660000')
        .setDescription('<:kt_pain:822491637023899678>︱Vypínam sa...')
        await message.channel.send(embed);
        console.log("Vypínam sa... D:")
        process.exit();
        }}
