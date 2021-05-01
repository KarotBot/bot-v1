const Discord = require("discord.js")

module.exports = {
    name: "duck",
    description: "Sends a cute ducky \ (•◡•) /",
    run: async(client, slash) => {
        const fetch = require("node-fetch")
		var json = await (await fetch("https://random-d.uk/api/v2/random")).json();
		if(!json.url) return;
        
		var embed = new Discord.MessageEmbed()
            .setColor('#e54918')
			.setImage(json.url)
			.setFooter(`karot.xyz`)
    
        client.api.interactions(slash.id, slash.token).callback.post({
            data: {
                type: 4,
                data: await createAPIMessage(slash, embed)
            }
        })
        
        async function createAPIMessage(interaction, content) {
            const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
            .resolveData()
            .resolveFiles();
            
            return { ...apiMessage.data, files: apiMessage.files };
        }
  }
};