const Discord = require("discord.js")

module.exports = {
    name: 'invite',
    aliases: ['pozvánka', 'pozvanka'],
    description: 'Pošle můj invite',
    category: "informace",
    async execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
    .setColor('#e54918')
    .setTitle('Thanks! :D')
    .setDescription('[Click here!](https://discord.com/oauth2/authorize?client_id=822391645697212416&permissions=388166&redirect_uri=https%3A%2F%2Fauth.karot.xyz&response_type=code&scope=bot%20applications.commands) <3')
message.channel.send(embed)
.catch(error =>
    console.log("Nejaký čurák mi zobral permisie... >:0")
);
}}
