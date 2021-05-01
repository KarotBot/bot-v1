const Discord = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "number",
    description: "Sends a random number",
    run: async(client, slash, message) => {
        var embed = new Discord.MessageEmbed()
            .setColor('#e54918')
            .setDescription(Math.floor(Math.random()*10001))
            .setTitle('Random number')
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