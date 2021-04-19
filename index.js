const fs = require('fs');
const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json');
const db = require("quick.db");
const os = require('os');
const blacklistTable = new db.table("blacklist");

const client = new Client({
	disableMentions: 'everyone'
});

const cooldowns = new Collection();
client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command", "event"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => client.events.get("ready").run());

client.on('message', async(message) => {
	if (message.content === "<@822391645697212416>" || message.content === "<@!822391645697212416>") {
		return message.channel.send("**Ahoj, moje meno je Karot.** <:kt_hey:822468640103202858> \nMôj prefix je `+`. Použí príkaz `+help` ak sa chceš dozvedieť čo všetko dokážem!");
	}
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  	if (blacklistTable.all().filter(datatable => datatable.ID === "users" && datatable.data.blacklisted && datatable.data.blacklisted.includes(message.author.id)).length > 0) {
		const embed = new Discord.MessageEmbed()
			.setColor("#e54918")
			.setAuthor(message.author.tag, message.author.avatarURL({ size: 128, dynamic: true }))
			.setTitle("Zákaz")
			.setDescription("Dostali ste zákaz používať služby Karot. Ak si myslíte, že je tento trest nespravodlivý/chybný, môžete sa odvolať [tu](https://bit.ly/karotodvolanie).")
			.setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
			.setTimestamp();
		return message.author.send(embed);
	}

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

client.on('guildCreate', (guild) => client.events.get("guildCreate").run(guild));

client.on("debug", async info => console.log(info));

client.login(token);
