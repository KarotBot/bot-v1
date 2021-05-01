const Discord = require("discord.js")

module.exports = {
    name: 'serverinfo',
    aliases: ['server', 'srvrinfo', 'guild'],
	description: 'Pošle infošky o serveri na ktorom je.',
    category: "informace",
	async execute(client, message, args) {
		const embed = new Discord.MessageEmbed()
            .setColor('#e54918')
            .setTitle(message.guild.name)
			.setThumbnail(message.guild.iconURL({dynamic:true}))
        	.addField("Owner:", message.guild.owner, true)
			.addField("Members:", message.guild.members.cache.size, true)
			.addField("Roles:", message.guild.roles.cache.size, true)
			.addField("Emoji:", message.guild.emojis.cache.size, true)
			.setFooter(`Server ID: ${message.guild.id} | karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
		message.channel.send(embed)
        .catch(error =>
              console.log("Nejaký čurák mi zobral permisie... >:0")
          );
    },
};
