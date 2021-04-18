const Discord = require('discord.js')
const axios = require("axios")

module.exports = {
  name: 'status',
  description: 'Posle meme',
  cooldown: 4,
  category: "zabava",
  async execute(client, message, args) {
    axios.get("https://sheri.bot/api/yiff/?format=json").then(r => {
      let e = new Discord.RichEmbed()
        .setTitle(`Tady máš!`)
        .setImage(result.data.url)
        .setColor("#AE090D")
        .setFooter(`Vyžádal ${message.author.username}`, "https://images.emojiterra.com/twitter/v12/512px/1f51e.png")
      message.channel.send(e);
    })


  }
}