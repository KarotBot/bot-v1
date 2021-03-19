const Discord = require("discord.js")
console.log("Načítám příkaz na banování těch sviní! :)")
module.exports = {
    name: 'ban',
    description: 'Zabanuje nějakýho kokota, kterej dělá píčoviny.',
    async execute(message, args) {
      if(!message.member.hasPermission("BAN_MEMBERS")) 
      if(!message.member.hasPermission("ADMINISTRATOR")) 
      return message.channel.send(`Nemáš permise!`)
      
      const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]);
      
      if(!member) return message.channel.send(`Musíš označit uživatele!`)
      
      var reason = args[1]
      if(!reason) reason = 'Nebyl uveden důvod banu.'
      
      if(member.user.id === message.author.id) return message.channel.send(`Nemůžeš zabanovat sám sebe!`)
      
      if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Nemôžeš zabanovať väčšiu rolu ako máš ty/takú istú ako máš ty!`)
      
      var msg = await message.channel.send(`**Úspěšně** jsem zabanoval **${member.user.tag}** z důvodu: `+args.slice(1).join(" "))
      
      message.guild.members.ban(member, {reason: message.author.tag+" - "+args.slice(1).join(" ")}).catch(err => {
        return msg.edit(`Nemám permise!`)
      })
    }}