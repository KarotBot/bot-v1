const Discord = require("discord.js")
const { prefix } = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: 'ban',
    description: 'Zabanuje nějakýho kokota, kterej dělá píčoviny.',
    usage: "ban <user> [reason]",
    category: "moderace",
    async execute(client, message, args) {
      if(!message.member.hasPermission("BAN_MEMBERS"))
      if(!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(`<:kt_pain:822491637023899678> You don't have permissions!`)

      const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);


      if(!member) return message.channel.send(nenitu)

      var reason = args.slice(1).join(" ");
      if(!reason) reason = 'Not specified'

      if(member.user.id === message.author.id) return message.channel.send(samokick)

      if(member.user.id === "822391645697212416") return message.channel.send(rip)

      if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(errorembed)

      var embed = new Discord.MessageEmbed()
      .addField(`<:kt_suhlas:822473993780068393> ${member.user.tag} was banned.`, `‎‎‎‎‎‎‏‏‎ ‎`)
      .addField(`**Reason:**`,` ${reason || "Not specified"}`)
      .setColor('#e54918')
      .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
      var msg = await message.channel.send(embed)

      message.guild.members.ban(member, {reason: message.author.tag+" - "+args.slice(1).join(" ")}).catch(err => {
        var errorembed = new Discord.MessageEmbed()
        .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', err)
        .setColor('#e54918')
        .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
        message.channel.send(errorembed);
        return msg.channel.send(errorembed)
      })
    }}

    var rip = new Discord.MessageEmbed()
    .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'I cannot ban my self!')
    .setColor('#e54918')

    var nenitu = new Discord.MessageEmbed()
    .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'You must mention someone. `<user> [reason]`')
    .setColor('#e54918')

    var samokick = new Discord.MessageEmbed()
    .setColor('#e54918')
    .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'You cannot ban yourself!')

    var rip = new Discord.MessageEmbed()
    .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'I cannot ban my self!')
    .setColor('#e54918')

    var errorembed = new Discord.MessageEmbed()
    .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...')
    .setColor('#e54918')
