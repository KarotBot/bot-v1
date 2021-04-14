const fs = require('fs');
const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json');
const db = require("quick.db");
const os = require('os');
const blacklistTable = new db.table("blacklist");

const client = new Client({
	disableMentions: 'everyone';
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
	if (message.content === "<@822391645697212416>" || message.content === "<@!822391645697212416>") {
		return message.channel.send("**Ahoj, moje meno je Karot.** <:kt_hey:822468640103202858> \nMôj prefix je +. Použí príkaz +help ak sa chceš dozvedieť čo všetko dokážem!");
	}
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  	if (blacklistTable.all().filter(datatable => datatable.ID === "users" && datatable.data.blacklisted && datatable.data.blacklisted.includes(message.author.id)) > 0) {
		const embed = new Discord.MessageEmbed()
			.setColor("#e54918")
			.setAuthor(message.author.tag, message.author.avatarURL({ size: 128, dynamic: true }))
			.setTitle("Údržba")
			.setDescription("KarotBot momentálně není dostupný a kvůli vašemu zneužívání byly všechny jeho příkazy smazány. Pokud si myslíte, že jste bota nezneužívali, klikněte [tu](https://bit.ly/karotodvolanie).")
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

client.on('guildCreate', (guild) => {
	const webhook = new Discord.WebhookClient("abc", "abc"); // Webhook

	var whem = new Discord.MessageEmbed() // Embed
	.setColor('#e54918')
	.setThumbnail(guild.iconURL({dynamic:true}))
	.addField("Názov servera", guild.name, true)
	.addField("ID", guild.id, true)
	.addField("Počet členov", guild.memberCount, true)
	.addField("Počet použivaťelov", guild.members.cache.filter(member => !member.user.bot).size)
	.addField("Počet botov", guild.members.cache.filter(member => member.user.bot).size)
	.addField("Majiteľ", guild.owner, true)
	.addField("Počet rolí", guild.roles.cache.size, true)
	.addField("Počet e;moji", guild.emojis.cache.size, true)

	webhook.send('<:kt_hey:822468640103202858> Nový server!',{
		username: 'Nový server',
		avatarURL: 'https://cdn.discordapp.com/emojis/822468640103202858.png?v=1',  // Posielanie
		embeds: [whem]
	}

	)
	if (blacklistTable.all().filter(datatable => datatable.ID === "guilds" && datatable.data.blacklisted && datatable.data.blacklisted.includes(guild.id)).size > 0) {
		guild.leave();
		const owner = guild.owner;
		owner.send("Dostali ste zákaz používať služby Karot na Vašom Discord serveri " + guild.name + ". Ak si myslíte, že je tento trest nespravodlivý/chybný, môžete sa odvolať [tu](https://bit.ly/karotodvolanie).");
	}
});

client.on("debug", async info => console.log(info));

client.login(token);
