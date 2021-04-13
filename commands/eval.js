const Discord = require('discord.js')
console.log('Načítavam faňi fortnite command')
module.exports = {
	name: 'eval',
	description: 'Eval commandy',
  aliases: ['js'],
	cooldown: 4,
    	async execute(message, args) {
    if (!["403500416631046145"].includes(message.author.id)) return;

    try {
        var code = args.join(" ");
        let evaled = await eval(code);
        evaled = await (evaled);
        if (typeof evaled !== "string") {
            evaled = require("util").inspect(evaled);
        }
        var embed = new Discord.MessageEmbed()
        .setTitle('Eval')
        .setColor('#e54918')
        .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
        .addField('Vstup:', args[0])
        .addField('Výstup:', `evaled`)
        message.channel.send(embed).then(() => {
            message.channel.send(evaled, {
                code: "js",
                split: "\n"
            });
        })
    } catch (err) {
        message.channel.send(`\\<:kt_nesuhlas:822475199755583488> Niečo sa pokazilo\`\`\`js\n${err.stack}\n\`\`\``);
    }

}
};
