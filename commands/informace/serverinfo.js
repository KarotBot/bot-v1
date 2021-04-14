const Discord = require("discord.js")

module.exports = {
    name: 'serverinfo',
    aliases: ['server', 'srvrinfo', 'guild'],
	description: 'Pošle infošky o serveri na ktorom je.',
    category: "informace",
	async execute(client, message, args) {
		const embed = new Discord.MessageEmbed()
            .setColor('#e54918')
			.setThumbnail(message.guild.iconURL({dynamic:true}))
			.addField("Názov servera", message.guild.name, true)
			.addField("ID", message.guild.id, true)
			.addField("Počet členov", message.guild.members.cache.size, true)
			.addField("Majiteľ", message.guild.owner, true)
			.addField("Role", message.guild.roles.cache.size, true)
			.addField("Emoji", message.guild.emojis.cache.size, true)
			.setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
		message.channel.send(embed)
        .catch(error =>
              console.log("Nejaký čurák mi zobral permisie... >:0")
          );
    },
};
//console.log('Hah načítavam príkaz na infošky o tvojom serveri. ▄︻̷̿┻̿═━一')
