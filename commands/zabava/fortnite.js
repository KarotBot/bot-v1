const Discord = require('discord.js')
const axios = require("axios")

module.exports = {
	name: 'fortnite',
	description: 'Posle meme',
  aliases: ['fn'],
	cooldown: 4,
	category: "zabava",
    	async execute(client, message, args) {
        var buff = (await axios({
            url: new URL("https://api.hyrousek.tk/useless/reddit?reddit=fortnitebr").toString(),
            headers: {"Authorization":"čo si si myslel?"},
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
          console.log("Nejaký čurák mi zobral permisie... >:0")
      );
    }}
