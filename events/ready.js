module.exports = {
    name: "ready",
    run: (client) => {
        const activities_list = [
            `${client.guilds.cache.size} guild | +help`,
            "www.karot.xyz | +help",
            "#KarotGang | +help",
        	"cc panda | +help",
        	"Kekega | +help",
        	"https://youtu.be/dQw4w9WgXcQ | +help",
        	"som zemiak | +help",
        	"help me im stuck in a discord bot and i wanna go home | +help",
        	"im big chungusfortnite420 | +help",
        	"a dostanem nytro???!!1!1!????? | +help",
        	"i want to chug jug with you | +help",
            ];
        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
            client.user.setActivity(activities_list[index], { type: 'WATCHING' });
        }, 10000);
    }
}
