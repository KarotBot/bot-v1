const Discord = require("discord.js")

module.exports = {
    name: 'kick',
    description: 'Tímhle můžeš kickovat ty svině!',
    category: "moderace",
    async execute(client, message, args) {
          if(!message.member.hasPermission('KICK_MEMBERS'))
          if(!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(`<:kt_pain:822491637023899678> Nemáš permisie!`)
            var reason = args[1]
          const user = message.mentions.users.first();

            if (user) {

              const member = message.guild.member(user);
              var samokick = new Discord.MessageEmbed()
              .setColor('#e54918')
              .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Nemôžeš vyhodiť sám seba.')
              if(member.user.id === message.author.id) return message.channel.send(samokick)
              if(member.user.id === "822391645697212416") return message.channel.send(rip)
              if (member) {
                member.kick(`${message.author.tag} - ` + args.slice(1).join(" ")).then(() => {

                  var embed = new Discord.MessageEmbed()
                  .addField(`<:kt_suhlas:822473993780068393> ${member.user.tag} bol vyhodený.`, `‎‎‎‎‎‎‏‏‎ ‎`)
                  .addField(`**Dôvod:**`,` ${reason || "Nebol uvedený"}`)
                  .setColor('#e54918')
                  message.channel.send(embed)
                }).catch(err => {

                  var errorembed = new Discord.MessageEmbed()
                  .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', err)
                  .setColor('#e54918')
                  message.channel.send(errorembed);

                  console.error(err);
                });
              } else {

                var nenitu = new Discord.MessageEmbed()
                .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Musíš niekoho označiť vo formáte `+kick [človek] [dôvod].`')
                .setColor('#e54918')
                message.channel.send(nenitu);
              }

            } else {
              var nenitu2 = new Discord.MessageEmbed()
              .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Musíš niekoho označiť vo formáte `+kick [človek] [dôvod].`')
              .setColor('#e54918')
              message.channel.send(nenitu2);
            }


        }}

        var rip = new Discord.MessageEmbed()
        .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'Nemôžem vyhodiť seba.')
        .setColor('#e54918')
