const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { prefix } = require("../../config.json");
const Discord = require("discord.js");

module.exports = {
    name: 'help',
    aliases: ['pomoc', 'prikazy', 'príkazy'],
    description: 'Pošle moje príkazy',
    category: "informace",
    async execute(client, message, args) {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor("#e54918")
        .setTitle("<:kt_job:822478953939599390> | List príkazov")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category && cmd.category !== "dev")
            .map(cmd => `\`${cmd.name}\``)
            .join(", ");
    }

    const info = `**Nezařazené** [${commands(undefined).size}] \n${commands(undefined)}` + client.categories
        .filter(cat => cat !== "dev")
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}**[${commands(cat).size}] \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info).setFooter(`karot.xyz - ${Date.now() - message.createdTimestamp}ms`));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `Nebyly nalezeny žádné informace pro příkaz **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Jméno příkazu**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliasy**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Popis**: ${message.translation_strings.commands.descriptions.categories[cmd.category][cmd.name] || cmd.description || "No description defined."}`;
    if (cmd.usage) {
        info += `\n**Použití**: ${cmd.usage}`;
        embed.setFooter(`Syntaxe: <> = povinné, [] = dobrovolné`);
    }
}
