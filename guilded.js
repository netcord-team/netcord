const { Client } = require("guilded.js");
// import { Client } from "guilded.js";
const client = new Client({ token: "gapi_1smLYF0mY4m8g0gum1e/SzHMvZv+nsrlpzFPLvQgdIDZZlzkqCquHRL0pbXc4Rdw7MtKDkG5WJLgXFuY6L8fKg==" });

client.on("ready", () => console.log(`Bot is successfully logged in`));
client.on("messageCreated", (message) => {
    if (message.content === "test") {
        return message.reply("test indeed");
    }
});

client.login();
