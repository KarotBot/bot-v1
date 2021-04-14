const Discord = require('discord.js')
const axios = require("axios")

module.exports = {
	name: 'reddit',
	description: 'Posle meme',
  aliases: ['r/'],
	cooldown: 4,
	category: "zabava",
    	async execute(client, message, args) {
            var reddit = args[0]
            var noargs = new Discord.MessageEmbed()
            .setColor('#e54918')
            .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Musíš špecifikovať Sub-Reddit. (napr. r/discordapp)')
            .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
            if(!args[0]) return message.channel.send(noargs)
        var buff = (await axios({
            url: new URL(`https://api.hyrousek.tk/useless/reddit?reddit=${reddit}`).toString(),
            headers: {"Authorization":"r/apikeys nie je v cene"},
            responseType: "json"
        })).data;
          var embed = new Discord.MessageEmbed()
            .setImage(buff.url)
            .setColor('#e54918')
            .setURL(buff.link)
            .setTitle(buff.title)
            .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
            message.channel.send(embed)
            .catch(error =>
                console.log(err)
            );
        }}
