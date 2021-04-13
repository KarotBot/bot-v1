const fs              = require('fs');
const Discord         = require('discord.js');
const {prefix, token} = require('./config.json');
const client          = new Discord.Client();
client.commands       = new Discord.Collection();
const commandFiles    = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns       = new Discord.Collection();
const os              = require('os');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const activities_list = [
    `${client.guilds.cache.size} guild ☰ +help`, 
    "www.karot.xyz",
    "#KarotGang", 
    `${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%) RAM`,
	"Vyrobil s ❤️ Slenky",
	"🥕🍎🥔G A N G",
	"Seasickova Farťnite montáž",
	"JA NECHCEM DO POLIEVKY :(",
	"cc panda",
	"Kekega",
	"peepeepoopoo",
	"https://youtu.be/dQw4w9WgXcQ",
	"yes",
	"sus",
	"som zemiak",
	"help me im stuck in a discord bot and i wanna go home",
	"im big chungusfortnite420",
	"a dostanem nytro???!!1!1!?????",
	"i want to chug jug with you",
    ];

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index], { type: 'WATCHING' });
    }, 10000); 
});

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

client.login(token);
