const db = require("quick.db");
const blacklistTable = new db.table("blacklist");
const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "blacklist",
    description: "Add a user or bot to blacklist.",
    category: "dev",
    usage: "blacklist <guild | user> [list | add | remove] [id]",
    execute: async (client, message, args) => {
        if (!["403500416631046145", "747786245840830496"].includes(message.author.id)) return;

        if (!args[0] && args[0] !== "guild" && args[0] !== "user") {
            return message.reply("Neplatná možnost");
        }
        if (!args[1] || args[1] === "list") {
            getList(client, message, args);
        } else if (args[1] === "add" && args[0] === "user") {
            await add(client, message, args);
        } else if (args[1] === "add" && args[0] === "guild") {
            await addGuild(client, message, args);
        } else if (args[1] === "remove") {
            await remove(client, message, args);
        } else {
            return message.reply("Neplatná možnost");
        }
    }
}
function getList(client, message, input) {
    var enlisted;
    if (input[0] === "guild") {
        enlisted = blacklistTable.all().filter(table => table.ID === "guilds");
        if (!enlisted[0]) {
            enlisted = [];
        } else {
        	enlisted = enlisted[0].data.blacklisted;
        	enlisted = enlisted.reduce((prev, curr) => prev + "\n" + curr);
        }
        //enlisted = enlisted.data.blacklisted[0].data.blacklisted.reduce((prev, curr) => prev + "\n" + curr);
        //console.log(enlisted.data.blacklisted[0]);
    } else if (input[0] === "user") {
        enlisted = blacklistTable.all().filter(table => table.ID === "users");
        if (!enlisted[0]) {
            enlisted = [];
        } else {
        	enlisted = enlisted[0].data.blacklisted;
        	enlisted = enlisted.reduce((prev, curr) => prev + "\n" + curr);
        }
    }
    const embed = new MessageEmbed()
        .setColor("#e54918")
        .setAuthor(message.author.tag, message.author.avatarURL({ size: 128, dynamic: true }))
        .setDescription("Blacklisted " + input[0] + "s: \n" + enlisted)
        .setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`)
        .setTimestamp();
    message.channel.send(embed).then(msg => msg.delete({timeout: 5000}));
}
async function add(client, message, input) {
    var id = input[2];
    try {
        parseInt(id);
    } catch (e) {
        message.channel.send("Došlo k chybě: " + e);
    }
    id.toString();
    if (blacklistTable.all().filter(datatable => datatable.ID === "users" && datatable.data.blacklisted && datatable.data.blacklisted.includes(id)).size > 0) {
        return message.channel.send("Tento uživatel je na blacklistu.");
    }
    const msg = await message.channel.send(`Opravdu chcete přidat <@${id}> na blacklist?`);
    const reaction = await promptMessage(msg, message.author, 30000, ["✅", "❌"]);
    if (reaction === "✅") {
        msg.delete();
        blacklistTable.push(`users.blacklisted`, id);
        message.channel.send(`Uživatel <@${id}> byl přidán na blacklist!`).then(msg => msg.delete({timeout: 5000}))
    } else {
        msg.delete();
        return;
    }
}
async function addGuild(client, message, input) {
    var id = input[2];
    try {
        parseInt(id);
    } catch (e) {
        message.channel.send("Došlo k chybě: " + e);
    }
    id.toString();
    if (blacklistTable.all().filter(datatable => datatable.ID === "guilds" && datatable.data.blacklisted && datatable.data.blacklisted.includes(id)).size > 0) {
        return message.channel.send("Tento server je na blacklistu.");
    }
    var guild;
    try {
        guild = await client.guilds.fetch(id);
    } catch (e) {
        message.channel.send("Došlo k chybě" + e);
    }
    console.log(guild);
    const msg = await message.channel.send(`Opravdu chcete přidat ${guild.name} (${guild.id}) na blacklist?`);
    const reaction = await promptMessage(msg, message.author, 30000, ["✅", "❌"]);
    if (reaction === "✅") {
        msg.delete();
        blacklistTable.push(`guilds.blacklisted`, id);
        message.channel.send(`Server ${guild.name} (${guild.id}) byl přidán na blacklist!`).then(msg => msg.delete({timeout: 5000}))
    } else {
        msg.delete();
        return;
    }
}
async function remove(client, message, input) {
    if (input[0] === "guild") {
        var id = input[2];
        try {
            parseInt(id);
        } catch (e) {
            message.channel.send("Došlo k chybě: " + e);
        }
        id.toString();
        if (blacklistTable.all().filter(datatable => datatable.ID === "guilds" && datatable.data.blacklisted && datatable.data.blacklisted.includes(id)).size < 1) {
            return message.channel.send("Tento server není na blacklistu.");
        }
        const blacklistedGuilds = blacklistTable.all().filter(datatable => datatable.ID === "guilds");
        var guild;
        try {
            guild = await client.guilds.fetch(id);
        } catch (e) {
            message.channel.send("Došlo k chybě" + e);
        }
        const msg = await message.channel.send(`Opravdu chcete odebrat ${guild.name} (${guild.id}) z blacklistu?`);
        const reaction = await promptMessage(msg, message.author, 30000, ["✅", "❌"]);
        if (reaction === "✅") {
            msg.delete();
            const filtered = blacklistedGuilds.filter(guild => guild !== id);
            blacklistTable.set("guilds.blacklisted", filtered);
            message.channel.send(`Server ${guild.name} (${guild.id}) byl odebrán z blacklistu!`).then(msg => msg.delete({timeout: 5000}))
        } else {
            msg.delete();
            return;
        }
    } else if (input[0] === "user") {
        var id = input[2];
        try {
            parseInt(id);
        } catch (e) {
            message.channel.send("Došlo k chybě: " + e);
        }
        id.toString();
        if (blacklistTable.all().filter(datatable => datatable.ID === "users" && datatable.data.blacklisted && datatable.data.blacklisted.includes(id)).size < 1) {
            return message.channel.send("Tento uživatel není na blacklistu.");
        }
        const blacklistedUsers = blacklistTable.all().filter(datatable => datatable.ID === "users");
        const msg = await message.channel.send(`Opravdu chcete odebrat <@${id}> z blacklistu?`);
        const reaction = await promptMessage(msg, message.author, 30000, ["✅", "❌"]);
        if (reaction === "✅") {
            msg.delete();
            const filtered = blacklistedUsers.filter(user => user !== id);
            blacklistTable.set("users.blacklisted", filtered);
            message.channel.send(`Uživatel <@${id}> byl odebrán z blacklistu!`).then(msg => msg.delete({timeout: 5000}))
        } else {
            msg.delete();
            return;
        }
    }
}
