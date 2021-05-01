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
        .setFooter("You won!", message.author.displayAvatarURL)
        .setTitle(':slot_machine:Slots:slot_machine:')
        .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
        .setColor("#fcec14");
      message.channel.send(wEmbed);
    } else {
      let embed = new Discord.MessageEmbed()
        .setFooter('You lost!', message.author.displayAvatarURL)
        .setTitle(':slot_machine:Slots:slot_machine:')
        .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
        .setColor("#fc1414");
      message.channel.send(embed);
    }
  }
}