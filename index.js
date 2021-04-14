DisTube = require('distube');
const fs = require('fs');
const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json');
const os = require('os');

const client = new Client({
	disableMentions: 'everyone'
});

const cooldowns = new Collection();
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});


const activities_list = [
    `${client.guilds.cache.size} guild ☰ +help`,
    "www.karot.xyz ☰ +help",
    `${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%) RAM`,
	"https://youtu.be/dQw4w9WgXcQ ☰ +help",
	"help me im stuck in a discord bot and i wanna go home ☰ +help",
	"im big chungusfortnite420 ☰ +help",
	"a dostanem nytro???!!1!1!????? ☰ +help",
	"i want to chug jug with you ☰ +help",
    ];

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index], { type: 'WATCHING' });
    }, 10000);
});

client.on('guildCreate', (guild) => {
	const webhook = new Discord.WebhookClient("abc", "abc"); // Webhook

	var whem = new Discord.MessageEmbed() // Embed
	.setColor('#e54918')
	.setThumbnail(guild.iconURL({dynamic:true}))
	.addField("Názov servera", guild.name, true)
	.addField("ID", guild.id, true)
	.addField("Počet členov", guild.members.cache.size, true)
	.addField("Majiteľ", guild.owner, true)
	.addField("Role", guild.roles.cache.size, true)
	.addField("Emoji", guild.emojis.cache.size, true)

	webhook.send('<:kt_hey:822468640103202858> Nový server!',{ 
		username: 'Nový server',
		avatarURL: 'https://cdn.discordapp.com/emojis/822468640103202858.png?v=1',  // Posielanie
		embeds: [whem]
	}

	)
	
})

client.on('message', async(message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

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
			return message.reply(`Počkaj ${timeLeft.toFixed(1)} pred použitím príkazu \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	}catch{
		console.log('Error ¯\_(ツ)_/¯');
	}
});

client.on("debug", async info => console.log(info));

client.login(token);
