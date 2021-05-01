const Discord = require('discord.js');

module.exports = {
	name: 'eval',
	description: 'Eval command',
  	aliases: ['js'],
	category: "dev",
	cooldown: 4,
    	async execute(client, message, args) {
    if (!["403500416631046145", "492012102245154827", "747786245840830496"].includes(message.author.id)) return;

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
        .addField('Vstup:', `${code}`)
        .addField('Výstup:', `${evaled}`)
        message.channel.send(embed).then(() => {
            message.channel.send(evaled, {
                code: "js",
                split: "\n"
            });
        })
    } catch (err) {
        var errorcatch = new Discord.MessageEmbed()
        .setTitle('Eval')
        .setColor('#e54918')
        .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
        .addField('Vstup:', `${args.join(" ")}`)
        .addField('Výstup:', `${err.stack}`)
        message.channel.send(errorcatch);
    }

}
};
