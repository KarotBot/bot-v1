const Discord = require('discord.js')
const axios = require("axios")

module.exports = {
  name: 'ratewaifu',
  description: 'Ohodnotí tvou waifu',
  aliases: ['rw'],
  cooldown: 4,
  category: "zabava",
  async execute(client, message, args) {
    // ported from hernikplays/m00n
    let m421 = args.join(" ");
    if (!m421) return message.channel.send("Pokud nemáš waifu, nemůžu ji hodnotit.")
    if (m421.length > 30) return message.channel.send(`Tvoje waifu je moc dlouhá!`)
    let result = Math.floor((Math.random() * 100) + 0);

    const happyrate = new Discord.MessageEmbed()
      .setDescription(`**${m421}** bych rozhodně dal ${result}/100 ❤`)
      .setColor('#e54918')

    const sadembed = new Discord.MessageEmbed()
      .setDescription(`Myslím si, že ${result}/100 je vhodné skóre pro **${m421}**`)
      .setColor('#e54918')

    const idkembed = new Discord.MessageEmbed()
      .setDescription(`**${m421}** si zaslouží ${result}/100, nesuď mě.`)
      .setColor('#e54918')

    const shrugembed = new Discord.MessageEmbed()
      .setDescription(`**${m421}** je jasných ${result}/100`)
      .setColor('#e54918')

    const okembed = new Discord.MessageEmbed()
      .setDescription(`${result}/100 pro **${m421}**`)
      .setColor('#e54918')

    const thumbupembed = new Discord.MessageEmbed()
      .setDescription(`**${m421}** má ${result}/100. Nic víc, nic míň.👍`)
      .setColor('#e54918')

    const eyesembed = new Discord.MessageEmbed()
      .setDescription(`**${m421}** dostane ${result}/100 👀`)
      .setColor('#e54918')

    if (result > 90) return message.channel.send(happyrate)
    if (result < 30) return message.channel.send(sadembed)
    if (result > 40) return message.channel.send(idkembed)
    if (result > 50) return message.channel.send(shrugembed)
    if (result > 60) return message.channel.send(okembed)
    if (result > 70) return message.channel.send(thumbupembed)
    if (result > 80) return message.channel.send(eyesembed)
  }
} 
