const db = require("quick.db");
const Discord = require('discord.js')
const {token, prefix} = require("../../config.json");

module.exports = {
	name: "prefix",
  	aliases: ["configuration", "konfigurace"],
  	description: "Nastaví prdfix bota ohh jeah 696969696599696969420",
  	category: "konfigurace",
  	usage: "prefix",
	guildOnly: true,
  	execute: async (client, message, args) => {
		if (!message.member.hasPermission("MANAGE_GUILD", {checkAdmin: true, checkOwner: true})) {
            var permisie = new Discord.MessageEmbed()
            .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Na túto akciu nemáš právo.')
            .setColor('#e54918')
            .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
            return message.channel.send(permisie)
        }
     if(!args[0]) { 
         var kurvaspecifikujtenjeblyprefixtykokotzamrdany = new Discord.MessageEmbed()
         .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Musíš špecifikovať prefix.')
         .setColor('#e54918')
         .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
         return message.channel.send(kurvaspecifikujtenjeblyprefixtykokotzamrdany)
     }

     if(args[1]) {
        var menejpls = new Discord.MessageEmbed()
        .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', `V prefixe nemôže byť medzera!`)
        .setColor('#e54918')
        .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
        return message.channel.send(menejpls) 
     }

     if(args[0].length > 1) {
         var medzera = new Discord.MessageEmbed()
         .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', `Prefix nemôže byť dlhší ako 1 znak!`)
         .setColor('#e54918')
         .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
         return message.channel.send(medzera)
     }

     if (args[0] === "default" || args[0] === prefix) return db.delete(message.guild.id);
     db.set(message.guild.id,args[0]);
     message.channel.send('<:kt_suhlas:822473993780068393> Prefix bol úspešne nastavený!')
}}
