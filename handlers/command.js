const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Příkazy");
table.setHeading("Příkaz", "Načítací stav");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            let commandStructure = { named: false, categorized: false, descriptioned: false, haveUsage: false };

            if (pull.name) {
                commandStructure.named = true;
            }
            if (pull.category) {
                commandStructure.categorized = true;
            }
            if (pull.description) {
                commandStructure.descriptioned = true;
            }
            if (pull.usage) {
                commandStructure.haveUsage = true;
            }
            if (!client.commands.has(pull.name)) {
                if (commandStructure.named && commandStructure.categorized && commandStructure.descriptioned && commandStructure.haveUsage) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '✅');
                } else if (commandStructure.named && commandStructure.categorized && commandStructure.descriptioned && !commandStructure.haveUsage) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '⚠ -> nebylo nalezeno použití.');
                } else if (commandStructure.named && commandStructure.categorized && !commandStructure.descriptioned && !commandStructure.haveUsage) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '⚠ -> nebylo nalezeno použití, ani popis.');
                } else if (commandStructure.named && commandStructure.categorized && !commandStructure.descriptioned && commandStructure.haveUsage) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '⚠ -> nebyl nalezen popis.');
                } else if (commandStructure.named && !commandStructure.categorized && !commandStructure.descriptioned && !commandStructure.haveUsage) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '⚠ -> nebylo nalezeno použití, popis, ani kategorie.');
                } else if (commandStructure.named && !commandStructure.categorized && !commandStructure.descriptioned && commandStructure.haveUsage) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '⚠ -> nebyl nalezen popis, ani kategorie.');
                } else if (commandStructure.named && !commandStructure.categorized && commandStructure.descriptioned && !commandStructure.haveUsage) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '⚠ -> nebylo nalezeno použití, ani kategorie.');
                } else if (commandStructure.named && !commandStructure.categorized && commandStructure.descriptioned && commandStructure.haveUsage) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '⚠ -> nebyla nalezena kategorie.');
                } else if (!commandStructure.named && !commandStructure.categorized && !commandStructure.descriptioned && !commandStructure.haveUsage) {
                    table.addRow(file, '❌ -> nebylo nalezeno použití, popis, kategorie, ani jméno; příkaz nenačten.');
                } else if (!commandStructure.named && !commandStructure.categorized && !commandStructure.descriptioned && commandStructure.haveUsage) {
                    table.addRow(file, '❌ -> nebyl nalezen popis, kategorie, ani jméno; příkaz nenačten.');
                } else if (!commandStructure.named && !commandStructure.categorized && commandStructure.descriptioned && !commandStructure.haveUsage) {
                    table.addRow(file, '❌ -> nebylo nalezeno použití, kategorie, ani jméno; příkaz nenačten.');
                } else if (!commandStructure.named && !commandStructure.categorized && commandStructure.descriptioned && commandStructure.haveUsage) {
                    table.addRow(file, '❌ -> nebyla nalezena kategorie, ani jméno; příkaz nenačten.');
                } else if (!commandStructure.named && commandStructure.categorized && commandStructure.descriptioned && commandStructure.haveUsage) {
                    table.addRow(file, '❌ -> nebylo nalezeno jméno; příkaz nenačten.');
                } else {
                    table.addRow(file, '❌ -> jiná chyba; příkaz nenačten');
                }
            } else {
                table.addRow(file, '❌ -> tento příkaz již existuje; příkaz nenačten');
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}
// const Discord = require("discord.js")
// const { play } = require("../../include/play");
// const { YOUTUBE_API_KEY } = require("../../config.json");
// const ytdl = require("ytdl-core");
// const YouTubeAPI = require("simple-youtube-api");
// const youtube = new YouTubeAPI("");


// module.exports = {
//     name: "play",
//     aliases: ["play", "p"],
//     category: "music",
//     usage: "",
//     run: async (client, message, args, client.queue [To client.queue musí být aj v indexe]) => {
//     const { channel } = message.member.voice;

//     if (!args.length) return message.reply(":x: Please write song name or url").catch(console.error);
//     if (!channel) return message.reply(":x: You need to join a voice channel first!").catch(console.error);

//     const permissions = channel.permissionsFor(message.client.user);
//     if (!permissions.has("CONNECT"))
//       return message.reply(":x: Cannot connect to voice channel, missing permissions");
//     if (!permissions.has("SPEAK"))
//       return message.reply(":x: I cannot speak in this voice channel, make sure I have the proper permissions!");

//     const search = args.join(" ");
//     const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
//     const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
//     const url = args[0];
//     const urlValid = videoPattern.test(args[0]);

//     if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
//       return message.channel.send(":x: Please write song name or url")
//     }

//     const serverQueue = message.client.queue.get(message.guild.id); - tu mi hádže že get is undefined keď v indexe ja mám že client.queue = new Map(); a tuto mi hádže proste get undefined lebo to moje vlastne tam to je ako ta collection na commans že client.commands = new DIscord.Collection(); skusim to
//     const queueConstruct = {
//       textChannel: message.channel,
//       channel,
//       connection: null,
//       songs: [],
//       loop: false,
//       volume: 100,
//       playing: true
//     };

//     let songInfo = null;
//     let song = null;

//     if (urlValid) {
//       try {
//         songInfo = await ytdl.getInfo(url);
//         song = {
//           title: songInfo.title,
//           url: songInfo.video_url,
//           duration: songInfo.length_seconds
//         };
//       } catch (error) {
//         if (error.message.includes("copyright")) {
//           return message
//             .reply("⛔ The video could not be played due to copyright protection ⛔")
//             .catch(console.error);
//         } else {
//           console.error(error);
//         }
//       }
//     } else {
//       try {
//         const results = await youtube.searchVideos(search, 1);
//         songInfo = await ytdl.getInfo(results[0].url);
//         song = {
//           title: songInfo.title,
//           url: songInfo.video_url,
//           duration: songInfo.length_seconds
//         };
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     if (serverQueue) {
//       serverQueue.songs.push(song);
//       return serverQueue.textChannel
//         .send(`✅ **${song.title}** has been added to the queue by ${message.author}`)
//         .catch(console.error);
//     } else {
//       queueConstruct.songs.push(song);
//     }

//     if (!serverQueue) message.client.queue.set(message.guild.id, queueConstruct);

//     if (!serverQueue) {
//       try {
//         queueConstruct.connection = await channel.join();
//         play(queueConstruct.songs[0], message);
//       } catch (error) {
//         console.error(`:x: Could not join voice channel: ${error}`);
//         message.client.queue.delete(message.guild.id);
//         await channel.leave();
//         return message.channel.send(`:x: Could not join the channel: ${error}`).catch(console.error);
//       }
//     }
//   }
// };
