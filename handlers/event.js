const { readdirSync }= require("fs");

const ascii = require("ascii-table");

let table = new ascii("Eventy");
table.setHeading("Event", "Načítací stav");
module.exports => {
    readdirSync("./events").forEach(dir => {
        const events = readdirSync(`./events/`).filter(file => file.endsWith(".js"));

        for (let file of events) {
            let pull = require(`../events/${file}`);

            if (pull.name) {
                client.events.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌ -> nebylo nalezeno jméno; event nenačten');
            }
        }
    });
}
