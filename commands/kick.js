const Discord = require("discord.js")
console.log("Načítvám příkaz pro kickování těch sviní! B)")
module.exports = {
    name: 'kick',
    description: 'Tímhle můžeš kickovat ty svině!',
    async execute(message, args) {
          if(!message.member.hasPermission('KICK_MEMBERS'))
          if(!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(`Nemáš permise!`)
        
          const user = message.mentions.users.first(); 
           
            if (user) {
           
              const member = message.guild.member(user);
              if(member.user.id === message.author.id) return message.channel.send(`Nemůžeš kicknout sám sebe!`)  
              if (member) {
                member.kick(`${message.author.tag} - ` + args.slice(1).join(" ")).then(() => {
               
                  message.channel.send(`**Úspěšně** jsem kicknul **${user.tag}** z důvodu: ` + args.slice(1).join(" "))
                }).catch(err => {
                 
                  message.reply('Nemám permise!');
                  
                  console.error(err);
                });
              } else {
               
                message.reply('Tento uživatel není na serveru!');
              }
         
            } else {
              message.channel.send(`Vyber někoho, koho chceš vyhodit!`); 
            }
        
        
        }}