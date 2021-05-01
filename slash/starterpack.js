const Discord = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "starterpack",
    description: "Sends a Starter Pack",
    run: async(client, slash) => {
            var buff = (await axios({
            url: new URL("https://api.hyrousek.tk/useless/reddit?reddit=starterpacks").toString(),
            responseType: "json"
        })).data;
        
        var embed = new Discord.MessageEmbed()
            .setColor('#e54918')
            .setImage(buff.url)
            .setColor('#e54918')
            .setURL(buff.link)
            .setTitle(buff.title)
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