const Discord = require('discord.js')

module.exports = {
	name: 'kacka',
	description: 'Posle kacku',
	cooldown: 4,
	category: "zabava",
	async execute(client, message, args) {
        const fetch = require("node-fetch")
		var json = await (await fetch("https://random-d.uk/api/v2/random")).json();
		if(!json.url) return;

		var embed = new Discord.MessageEmbed()
             .setColor('#e54918')
			.setImage(json.url)
			.setTitle('🦆')
			.setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
		message.channel.send(embed)
        .catch(error =>
            console.log("Nejaký čurák mi zobral permisie... >:0")
        );
    },
};
