const Discord = require("discord.js")

module.exports = {
    name: 'ban',
    description: 'Zabanuje nějakýho kokota, kterej dělá píčoviny.',
    category: "moderace",
    async execute(client, message, args) {
      if(!message.member.hasPermission("BAN_MEMBERS"))
      if(!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(`<:kt_pain:822491637023899678> Nemáš permisie!`)

      const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);


      if(!member) return message.channel.send(nenitu)

      var reason = args[1]
      if(!reason) reason = 'Nebol uvedený dôvod banu.'

      if(member.user.id === message.author.id) return message.channel.send(samokick)

      if(member.user.id === "822391645697212416") return message.channel.send(rip)

      if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(errorembed)

      var embed = new Discord.MessageEmbed()
      .addField(`<:kt_suhlas:822473993780068393> ${member.user.tag} bol zabanovaný.`, `‎‎‎‎‎‎‏‏‎ ‎`)
      .addField(`**Dôvod:**`,` ${reason || "Nebol uvedený"}`)
      .setColor('#e54918')
      .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
      var msg = await message.channel.send(embed)

      message.guild.members.ban(member, {reason: message.author.tag+" - "+args.slice(1).join(" ")}).catch(err => {
        var errorembed = new Discord.MessageEmbed()
        .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', err)
        .setColor('#e54918')
        .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
        message.channel.send(errorembed);
        return msg.channel.send(errorembed)
      })
    }}

    var rip = new Discord.MessageEmbed()
    .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Nemôžem vyhodiť seba.')
    .setColor('#e54918')

    var nenitu = new Discord.MessageEmbed()
    .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Musíš niekoho označiť vo formáte `+ban [človek] [dôvod].`')
    .setColor('#e54918')

    var samokick = new Discord.MessageEmbed()
    .setColor('#e54918')
    .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Nemôžeš zabanovať sám seba.')

    var rip = new Discord.MessageEmbed()
    .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Nemôžem zabanovať seba.')
    .setColor('#e54918')

    var errorembed = new Discord.MessageEmbed()
    .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo')
    .setColor('#e54918')
