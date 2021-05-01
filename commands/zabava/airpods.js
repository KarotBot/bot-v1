const Discord = require('discord.js')

module.exports = {
	name: 'airpods',
	description: 'Engraves your custom air pods.',
    aliases: ['apple', 'ap'],
	cooldown: 4,
	category: "zabava",
    	async execute(client, message, args) {
            
        if(!args[0]) {
            var specifypls = new Discord.MessageEmbed()
           .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'You **must** specify your text/engraving.')
           .setColor('#e54918')
           .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
            return message.channel.send(specifypls)
        }
            
        if(args[1]) {
            var toomuch = new Discord.MessageEmbed()
           .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'You **cannot** have a space in the engraving.')
           .setColor('#e54918')
           .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
            return message.channel.send(toomuch)
        }
            
         if(args[0].length > 13) {
         var max = new Discord.MessageEmbed()
         .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', `The engraving **cannot** be longer than 14 characters!`)
         .setColor('#e54918')
         .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
         return message.channel.send(max)
                  .catch(error =>
            console.log("Nejaký čurák mi zobral permisie... >:0")
        );
    }
        
          var embed = new Discord.MessageEmbed()
            .setImage(`https://www.apple.com/shop/preview/engrave/PRXJ2AM/A?th=${args[0]}&s=1&f=mixed`)
            .setColor('#e54918')
            .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
         message.channel.send(embed)
         .catch(err =>
            console.log(err)
        );
    }}
