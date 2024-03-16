const fs = require("fs");
const discord = require("discord.js");

module.exports = {
    name: "guildCreate",
    once: false,
    run: (client, guild) => {
        // Log the joined guild
        console.log("Joined a new guild: " + guild.name + " " + guild.id);

        /*
        const guildData = {
            [guild.id]: {
                name: guild.name,
                channel: ""
            }
        };

        let existingData = {};
        try {
            existingData = JSON.parse(fs.readFileSync("guild.json"));
        } catch (error) {
            console.error("Error reading guild data:", error);
        }

        const updatedData = { ...existingData, ...guildData };

        fs.writeFile("guild.json", JSON.stringify(updatedData, null, 2), err => {
            if (err) {
                console.error("Error writing guild data:", err);
            }
        }); */
    }
};
