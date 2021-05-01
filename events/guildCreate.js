const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "guildCreate",
    run: async (guild) => {
        const blacklistTable = new db.table("blacklist");
    	const webhook = new Discord.WebhookClient("ID", "TOKEN"); // Webhook

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
    		const embed = new Discord.MessageEmbed()
                   		.setColor("#e54918")
                   		.setAuthor(owner.user.tag, owner.user.avatarURL({ size: 128, dynamic: true }))
                   		.setTitle("Banned")
            			.addField("Your guild " + guild.name + " was banned from using the services of Karot.", "If you think that this punishment is false, you can appeal the decission [here](https://forms.gle/vBra2ZnmGvG88wDo9).")
                        .addField("Please review the TOS", "You were most likely banned for a violation of the terms of service of Karot.\nPlease read them [here](https://karot.xyz/terms)")
                   		.setFooter("karot.xyz")
                   		.setTimestamp();
                   owner.send(embed);
    	}
    }
}
