// Require the necessary discord.js classes
const { Discord, Client, Intents, MessageEmbed } = require('discord.js');
// Get the token and load other bot things
const token = process.env['token'];
// Import path and fs (node)
const fs = require("fs");
var path = require("path");
const { Server } = require("socket.io")
const Websocket = require("ws");
const crypto = require("crypto");
const DB = require("./db")
require('dotenv').config()
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const { Store } = require("data-store");

var guilds = new Store({
  path: path.join(process.cwd() + "/guilds.json"),
  debounce: 0
})

console.log("Starting......");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.guildInfo = new Map();

// TODO: Event handling and commands handling
const eventFiles = fs.readdirSync("./events/").filter(f => f.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) client.once(event.name, (...args) => event.run(client, ...args))
	else client.on(event.name, (...args) => event.run(client, ...args));
}

client.commands = new Map();

const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Login to Discord with your client's token

client.formalEmbedColor = 0x2054C4;

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Promise Rejection:', err);
});

 client.login(process.env.token).catch(console.error)

module.exports.commands = client.commands;