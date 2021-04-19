const Discord = require('discord.js')
const axios = require("axios")

module.exports = {
  name: 'slots',
  description: 'Hraci automat',
  aliases: ['sl'],
  cooldown: 4,
  category: "zabava",
  async execute(client, message, args) {
    // ported from hernikplays/m00n
    let slots = ["🍋", "🍌", "🍒", "🍓", "🍈", "🍑"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));

    if (slots[result1] === slots[result2] && slots[result2] === slots[result3]) {
      let wEmbed = new Discord.MessageEmbed()
        .setFooter("Vyhrál jsi!", message.author.displayAvatarURL)
        .setTitle(':slot_machine:Slots:slot_machine:')
        .addField('Výsledek:', slots[result1] + slots[result2] + slots[result3], true)
        .setColor('#e54918');
      message.channel.send(wEmbed);
    } else {
      let embed = new Discord.MessageEmbed()
        .setFooter('Prohrál jsi!', message.author.displayAvatarURL)
        .setTitle(':slot_machine:Slots:slot_machine:')
        .addField('Výsledek', slots[result1] + slots[result2] + slots[result3], true)
        .setColor('#e54918')
      message.channel.send(embed);
    }
  }
}
