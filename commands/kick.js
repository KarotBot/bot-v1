const Discord = require("discord.js")
console.log("Načítvám příkaz pro kickování těch sviní! B)")
module.exports = {
    name: 'kick',
    description: 'Tímhle můžeš kickovat ty svině!',
    async execute(message, args) {
          if(!message.member.hasPermission('KICK_MEMBERS'))
          if(!message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(`<:kt_pain:822491637023899678>︱Nemáš permisie!`)
        
          const user = message.mentions.users.first(); 
           
            if (user) {
           
              const member = message.guild.member(user);
              if(member.user.id === message.author.id) return message.channel.send(`Nemůžeš kicknout sám sebe!`)  
              if(member.user.id === "822391645697212416") return message.channel.send(`Nemôžem kicknúť seba. D:`)
              if (member) {
                member.kick(`${message.author.tag} - ` + args.slice(1).join(" ")).then(() => {
               
                  message.channel.send(`<:kt_pain:822491637023899678>︱**Úspešne** som vyhodil **${user.tag}** z dôvodu: ` + args.slice(1).join(" "))
                }).catch(err => {
                 
                  message.reply('<:kt_pain:822491637023899678>︱Nemám permisie!');
                  
                  console.error(err);
                });
              } else {
               
                message.reply('Tento užívateľ nie je  na serveri!');
              }
         
            } else {
              message.channel.send(`Vyber niekoho koho chceš vyhodiť!`); 
            }
        
        
        }}
