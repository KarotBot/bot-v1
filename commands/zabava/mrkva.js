
const Discord = require('discord.js')
const axios = require("axios")

module.exports = {
	name: 'mrkva',
	description: 'Posle meme',
  aliases: ['karot', 'karotka', 'carot', 'mrkvicka'],
	cooldown: 4,
	category: "zabava",
    	async execute(client, message, args) {
        var buff = (await axios({
            url: new URL("https://api.hyrousek.tk/useless/reddit?reddit=carrots").toString(),
            headers: {"Authorization":"čo tu robíš?"},
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
    }
}
