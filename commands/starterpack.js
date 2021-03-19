const Discord = require('discord.js')
const axios = require("axios")
console.log('Načítavam faňi starterpack command')
module.exports = {
	name: 'starterpack',
	description: 'Posle meme',
	cooldown: 4,
    	async execute(message, args) {
        var buff = (await axios({
            url: new URL("https://api.hyrousek.tk/useless/reddit?reddit=starterpacks").toString(),
            headers: {"Authorization":"nie lol"},
            responseType: "json"
        })).data;

          var embed = new Discord.MessageEmbed()
            .setImage(buff.url)
            .setColor('#e54918')
            .setURL(buff.link)
            .setTitle(buff.title)
            .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
         message.channel.send(embed) 
    }}