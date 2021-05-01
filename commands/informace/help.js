const Discord = require('discord.js')

module.exports = {
	name: 'help',
	description: 'Experimental help command',
    aliases: ['sos', 'commands', 'prikazy', 'pomoc'],
	cooldown: 4,
	category: "informace",
    	async execute(client, message, args) {

    var embed = new Discord.MessageEmbed()
	.setColor("#e54918")
    .setURL("https://karot.xyz")
	.setTitle('Karot Commands')
	.addFields(
		{ name: '<:kt_hey:822468640103202858> Informational', value: '`help`, `info`, `invite`, `ping`, `serverinfo`', inline: true },
        { name: '<:kt_suhlas:822473993780068393> Configuration', value: '`prefix`, `embed`', inline: true },
        { name: '<:kt_job:822478953939599390> Moderation', value: '`ban`, `kick`', inline: true },
		{ name: '<:kt_pepega:822475395281715250> Fun', value: '`meme`, `reddit`, `dog`, `cat`, `duck`, `furret`, `slots`, `ratewaifu`, `starterpack`, `number`, `airpods`, `status`, `carrot`, `pewdiepie`, `duklock`, `siryakari`, `status`, `rocketleague`, `minecraft`, `fortnite`, `roblox`', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Links', value: '[Support server](https://discord.com/invite/9Byp7mWfMF) - [Add the Bot](https://discord.com/oauth2/authorize?client_id=822391645697212416&permissions=388166&redirect_uri=https%3A%2F%2Fauth.karot.xyz&response_type=code&scope=bot%20applications.commands) - [Website](https://karot.xyz) - [GitHub](https://github.com/KarotBot)'},
	)
    .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`);
         message.channel.send(embed)
         .catch(error =>
            console.log("Nejaký čurák mi zobral permisie... >:0")
        );
    }}
