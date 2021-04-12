const Discord = require('discord.js')
const axios = require("axios")
console.log('Načítavam reddit command')
module.exports = {
	name: 'reddit',
	description: 'Posle meme',
  aliases: ['r/'],
	cooldown: 4,
    	async execute(message, args) {
            var reddit = args[0]
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