const Discord = require("discord.js")
const { prefix } = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: 'embed',
    description: 'Pošle message embed',
    usage: "embed <title> [description]",
    category: "konfigurace",
    async execute(client, message, args) {
      if(!message.member.hasPermission("MANAGE_MESSAGES"))
      if(!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send('<:kt_pain:822491637023899678>You need the `MANAGE_MESSAGES` permission for this command.')
    
        if(!args[0]) {
            return message.channel.send('You must specify the title and description of the embed you want to create! `<title> [description]`')
        }
      var description = args.slice(1).join(" ");
         
        var argsembed = new Discord. MessageEmbed()
         .setColor('#e54918')
         .setFooter('karot.xyz')
         .setTitle(args[0])
         .setDescription(description)
        message.channel.send(argsembed)}}