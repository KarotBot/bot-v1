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
    if (!m421) return message.channel.send("If you don't have a waifu, I can't rate her.")
    if (m421.length > 30) return message.channel.send(`Your waifu is too long! <:kt_pain:822491637023899678>`)
    let result = Math.floor((Math.random() * 100) + 0);

    const happyrate = new Discord.MessageEmbed()
      .setDescription(`I would give **${m421}** a ${result}/100 ❤`)
      .setColor(`GREEN`)

    const sadembed = new Discord.MessageEmbed()
      .setDescription(`I think that ${result}/100 is a good score for **${m421}**.`)
      .setColor(`GREEN`)

    const idkembed = new Discord.MessageEmbed()
      .setDescription(`**${m421}** deserves a ${result}/100, don't judge me.`)
      .setColor(`GREEN`)

    const shrugembed = new Discord.MessageEmbed()
      .setDescription(`**${m421}** is a clear ${result}/100`)
      .setColor(`GREEN`)

    const okembed = new Discord.MessageEmbed()
      .setDescription(`${result}/100 for **${m421}**`)
      .setColor(`GREEN`)

    const thumbupembed = new Discord.MessageEmbed()
      .setDescription(`**${m421}** gets a ${result}/100. Nothing more, nothing less! 👍`)
      .setColor(`GREEN`)

    const eyesembed = new Discord.MessageEmbed()
      .setDescription(`**${m421}** gets ${result}/100 👀`)
      .setColor(`GREEN`)

    if (result > 90) return message.channel.send(happyrate)
    if (result < 30) return message.channel.send(sadembed)
    if (result > 40) return message.channel.send(idkembed)
    if (result > 50) return message.channel.send(shrugembed)
    if (result > 60) return message.channel.send(okembed)
    if (result > 70) return message.channel.send(thumbupembed)
    if (result > 80) return message.channel.send(eyesembed)
  }
} 
