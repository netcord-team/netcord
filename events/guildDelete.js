const discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "guildDelete",
    once: false,
    run: (client, guild) => {
        // Left a server
        console.log("Left a guild: " + guild.name + " " + guild.id);

       /*
        let guildData = {};
        try {
            guildData = JSON.parse(fs.readFileSync("guild.json"));
        } catch (error) {
            console.error("Error reading guild data:", error);
        }

        delete guildData[guild.id];

        fs.writeFileSync("guild.json", JSON.stringify(guildData, null, 2)); */
    }
};