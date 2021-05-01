const db = require("quick.db");
const Discord = require('discord.js')
const {token, prefix} = require("../../config.json");

module.exports = {
	name: "prefix",
  	aliases: ["configuration", "konfigurace"],
  	description: "Nastaví prdfix bota ohh jeah 696969696599696969420",
  	category: "konfigurace",
  	usage: "prefix <prefix>",
	guildOnly: true,
  	execute: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_GUILD", {checkAdmin: true, checkOwner: true})) {
            var permisie = new Discord.MessageEmbed()
            .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'You do not have permission for this action!')
            .setColor('#e54918')
            .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
            return message.channel.send(permisie)
        }
     if(!args[0]) {
         var kurvaspecifikujtenjeblyprefixtykokotzamrdany = new Discord.MessageEmbed()
         .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'You must specify the prefix!')
         .setColor('#e54918')
         .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
         return message.channel.send(kurvaspecifikujtenjeblyprefixtykokotzamrdany)
     }

     if (args.join(" ").toLowerCase() === "default" || args.join(" ").toLowerCase() === prefix) return db.delete(message.guild.id);
     db.set(message.guild.id, args.join(" "));
     message.channel.send('<:kt_suhlas:822473993780068393> The prefix was set!')
}}
