const fs = require('fs');
const { GCommands } = require("gcommands");
const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json');
const db = require("quick.db");
const os = require('os');
const blacklistTable = new db.table("blacklist");
const express = require('express');
var app = express()

app.get('/', async (req, res) => { // stats.karot.xyz
     res.header("Access-Control-Allow-Origin", "*");
    res.json({
        status: '200',
        guilds: `${client.guilds.cache.size}`,
        users: `${client.users.cache.size}`,
        channels: `${client.channels.cache.size}`
    })
})
    
app.listen(3000);

const client = new Client({
	disableMentions: 'everyone'
});

const cooldowns = new Collection();
client.ncommands = new Collection();
client.events = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

require(`./handlers/command`)(client);
require(`./handlers/event`)(client);

client.on('ready', () => client.events.get("ready").run(client));

client.on('message', async(message) => {
    if (["bot", "boti", "botovi"].some(ms => message.content.toLowerCase().includes(ms.toLowerCase()))) {
        await message.react("<:kt_hey:822468640103202858>");
    }
	var in_prefix = prefix;
    console.log(in_prefix)
	if (message.guild && db.has(message.guild.id)) {
		in_prefix = db.get(message.guild.id);
	}
    
             if (message.content === "<@822391645697212416>" || message.content === "<@!822391645697212416>") {
		return message.channel.send(`**Hi, my name is Karot!** <:kt_hey:822468640103202858> \nMy prefix is \`${in_prefix}\`. Use the \`${in_prefix}help\` command if you want to find out what I can do!`);
	}
    
  if (!message.content.startsWith(in_prefix) || message.author.bot) return;
  	if (blacklistTable.all().filter(datatable => datatable.ID === "users" && datatable.data.blacklisted && datatable.data.blacklisted.includes(message.author.id)).length > 0) {
		const embed = new Discord.MessageEmbed()
			.setColor("#e54918")
			.setAuthor(message.author.tag, message.author.avatarURL({ size: 128, dynamic: true }))
			.setTitle("Banned")
			.addField("You were banned from using the services of Karot.", "If you think that this punishment is false, you can appeal the decission [here](https://forms.gle/vBra2ZnmGvG88wDo9).")
            .addField("Please review the TOS", "You were most likely banned for a violation of the terms of service of Karot.\nPlease read them [here](https://karot.xyz/terms)")
			.setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
			.setTimestamp();
		return message.author.send(embed);
	}

 
	const args = message.content.slice(in_prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.ncommands.get(commandName)
		|| client.ncommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    console.log(command, commandName)

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return;
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const time = timestamps.get(message.author.id) + cooldownAmount;

		if (now < time) {
			const timeLeft = (time - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} before using the command \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 
    if(command.requiredRole) {
                        if(!message.member._roles.includes(command.requiredRole)) {
                            return;
                        }
                    }
    
	try {
		command.execute(client, message, args);
	}catch(e){
        console.log(e)
		console.log('Error ¯\_(ツ)_/¯');
	}
});

client.on('guildCreate', (guild) => client.events.get("guildCreate").run(guild));

client.on("debug", async info => console.log(info));

client.login(token);
