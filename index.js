// Require the necessary discord.js classes
const { Discord, Client, Collection, Intents, MessageEmbed, Events, GatewayIntentBits } = require('discord.js');
// Get the token and load other bot things
const token = process.env['token'];
// Import path and fs (node)
const fs = require("fs");
var path = require("path");
require('dotenv').config()

console.log("Starting......");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });


client.commands = new Map();

//client.guildInfo = new Map();

// Change event & command code as soon as possible
const eventFiles = fs.readdirSync("./events/").filter(f => f.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) client.once(event.name, (...args) => event.run(client, ...args))
	else client.on(event.name, (...args) => event.run(client, ...args));
}

/*const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);
	}
}
*/

const commandFiles = fs.readdirSync("./prefixcommands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./prefixcommands/${file}`);
	client.commands.set(command.data.name, command);
}

// Login to Discord with your client's token

client.formalEmbedColor = 0x2054C4;

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Promise Rejection:', err);
});

client.login(process.env.token).catch(console.error)

module.exports.commands = client.commands;