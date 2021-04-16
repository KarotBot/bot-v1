const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const {token, prefix} = require("../../config.json");

module.exports = {
	name: "config",
  	aliases: ["configuration", "konfigurace"],
  	description: "Nastaví custom funkce bota (logs, prefix)",
  	category: "konfigurace",
  	usage: "config",
	guildOnly: true,
  	execute: async (client, message, args) => {
		if (message.deletable) message.delete();
		if (!message.member.hasPermission("MANAGE_GUILD", {checkAdmin: true, checkOwner: true})) return;
		const init_embed = new MessageEmbed()
			.setColor("#e54918")
			.setAuthor(message.author.tag, message.author.avatarURL({ size: 128, dynamic: true }))
			.setTitle("Configuration")
			.setDescription("Čo chceš nastaviť?")
			.addField("\u200b", "\u200b")
			.addField("`prefix`", "**Začne nastavenie prefixu.**")
			.addField("\u200b", "\u200b")
			.setFooter(`karot.xyz`)
			.setTimestamp();
		const init_msg = await message.channel.send(init_embed);
		const filter = m => m.author.id === message.author.id;
		const coll_mes = await message.channel.awaitMessages(filter, { time: 30000, max: 1});
		const m = coll_mes.first();
		/*var collector_start = Date.now();
		for (var i = 0; collector_start + 30000 < Date.now(); i++) {
			const cont_init_embed = new MessageEmbed()
				.setColor("#e54918")
				.setAuthor(message.author.tag, message.author.avatarURL({ size: 128, dynamic: true }))
				.setTitle("Configuration")
				.setDescription("What do you want to config?")
				.addField("\u200b", "\u200b")
				.addField("`logs` - **Start a log setup __(not inherited)__**")
				.addField("`prefix` - **Start a prefix setup**")
				.addField("\u200b", "\u200b")
				.setFooter(`karot.xyz - ${Math.round((-(collector_start - Date.now()))/1000)}s`)
				.setTimestamp();
			await init_msg.edit(cont_init_embed);
		}*/
			if (m.content.toLowerCase() !== "prefix") {
				return msg.edit("❌ | Příkaz zrušen", {embed: null});
			}
			message.channel.send("<@" + messsage.author.id + ">, " + "Tell me a prefix you want to set.");
			const col_msgs = await message.channel.awaitMessages({ max: 1, time: 30000});
			const new_prefix = col_msgs.first();
			if (new_prefix.content.toLowerCase() === "default" || new_prefix.content.toLowerCase() === prefix) return db.delete(message.guild.id);
			db.set(message.guild.id, new_prefix.content.toLowerCase());
	}
}
