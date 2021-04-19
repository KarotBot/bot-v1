module.exports = {
    name: "guildCreate",
    run: async (guild) => {
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
    	.addField("Počet emoji", guild.emojis.cache.size, true)

    	webhook.send('<:kt_hey:822468640103202858> Nový server!',{
    		username: 'Nový server',
    		avatarURL: 'https://cdn.discordapp.com/emojis/822468640103202858.png?v=1',  // Posielanie
    		embeds: [whem]
    	}

    	)
    	if (blacklistTable.all().filter(datatable => datatable.ID === "guilds" && datatable.data.blacklisted && datatable.data.blacklisted.includes(guild.id)).length > 0) {
    		guild.leave();
    		const owner = guild.owner;
    		owner.send("Dostali ste zákaz používať služby Karot na Vašom Discord serveri " + guild.name + ". Ak si myslíte, že je tento trest nespravodlivý/chybný, môžete sa odvolať [tu](https://bit.ly/karotodvolanie).");
    	}
    }
}
