const Discord = require("discord.js")
const { prefix } = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: 'kick',
    description: 'Tímhle můžeš kickovat ty svině!',
    usage: "kick <user> [reason]",
    category: "moderace",
    async execute(client, message, args) {
            var in_prefix = prefix;
            if (db.has(message.guild.id)) {
                in_prefix = db.get(message.guild.id);
            }
          if(!message.member.hasPermission('KICK_MEMBERS'))
          if(!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(`<:kt_pain:822491637023899678> You don't have permissions!`)
            var reason = args.slice(1).join(" ");
            const user = message.mentions.users.first();

            if (user) {

              const member = message.guild.member(user);
              var samokick = new Discord.MessageEmbed()
              .setColor('#e54918')
              .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', 'I cannot ban myself.')
              if(member.user.id === message.author.id) return message.channel.send(samokick)
              if(member.user.id === "822391645697212416") return message.channel.send(rip)
              if (member) {
                member.kick(`${message.author.tag} - ` + args.slice(1).join(" ")).then(() => {

                  var embed = new Discord.MessageEmbed()
                  .addField(`<:kt_suhlas:822473993780068393> ${member.user.tag} was kicked.`, `‎‎‎‎‎‎‏‏‎ ‎`)
                  .addField(`**Reason::**`,` ${reason || "Wasn't specified"}`)
                  .setColor('#e54918')
                  message.channel.send(embed)
                }).catch(err => {

                  var errorembed = new Discord.MessageEmbed()
                  .addField('<:kt_nesuhlas:822475199755583488> Something went wrong...', err)
                  .setColor('#e54918')
                  message.channel.send(errorembed);

                  console.error(err);
                });
              } else {

                var nenitu = new Discord.MessageEmbed()
                .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', `You must mention someone in the format \`${in_prefix}${client.commands.get("kick").usage}.\``)
                .setColor('#e54918')
                message.channel.send(nenitu);
              }

            } else {
              var nenitu2 = new Discord.MessageEmbed()
              .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', `You must mention someone in the format \`${in_prefix}${client.commands.get("kick").usage}.\``)
              .setColor('#e54918')
              message.channel.send(nenitu2);
            }


        }}

        var rip = new Discord.MessageEmbed()
        .addField('<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo', 'I cannot kick myself.')
        .setColor('#e54918')
