const { Client } = require("guilded.js");
// import { Client } from "guilded.js";
const client = new Client({ token: "gapi_1smLYF0mY4m8g0gum1e/SzHMvZv+nsrlpzFPLvQgdIDZZlzkqCquHRL0pbXc4Rdw7MtKDkG5WJLgXFuY6L8fKg==" });
const { readdir } = require("fs/promises");
const { join } = require("path");
const { Collection } = require("@discordjs/collection");
const prefix = ("nc?");
const commands = new Collection();
console.log ("Guilded part is successfully started!!")
client.on("ready", () => console.log(`Bot is successfully logged in into guilded!!`));
client.on("messageCreated", (message) => {
    if (message.content === "test") {
        return message.reply("test indeed");
    }
});
client.on("messageCreated", async (msg) => {
    if (!msg.content.startsWith(prefix)) return;
    let [commandName, ...args] = msg.content.slice(prefix.length).trim().split(/ +/);
    commandName = commandName.toLowerCase();

    const command = commands.get(commandName) ?? commands.find((x) => x.aliases?.includes(commandName));
    if (!command) return;

    try {
        await command.execute(msg, args);
    } catch (e) {
        void client.messages.send(msg.channelId, "There was an error executing that command!");
        void console.error(e);
    }
});

void (async () => {
    // read the commands dir and have the file extensions.
    const commandDir = await readdir(join(__dirname, "commands"), { withFileTypes: true });

    // go through all the files/dirs scanned from the readdir, and make sure we only have js files
    for (const file of commandDir.filter((x) => x.name.endsWith(".js"))) {
        console.log(file.name);
        const command = require(join(__dirname, "commands", file.name));
        commands.set(command.name, command);
    }

    client.login();
})();
