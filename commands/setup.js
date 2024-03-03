const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js")
const { PermissionFlagsBits, ChannelType } = require("discord-api-types/v10")
const path = require("path");
const { Store } = require("data-store");

const DISABLED = false;

var guilds = new Store({
  path: path.join(process.cwd() + "/guilds.json"),
  debounce: 0
})

setInterval(() => guilds.load(), 1000);
var guilds = require('data-store')({ path: process.cwd() + '/guilds.json' });

module.exports = {
	name: "setup",
	run: (client, message, args) => {
    if (DISABLED) {
      return message.reply("Command disabled for further use. Ask the administrators or owners of this bot to add your server until we fix some bugs with this command.")
    }
		if (!args || args.length === 0) return message.reply("Error: No channel given!")
		var channelID = args[0].replace("<#", "").replace(">", "").replace("undefined", "");
		var serverCode = args[1]
		if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({ content: "You are not allowed to use this command" })
		if (!serverCode) {
			message.channel.send(`Server Name required.`)
		} else {
			if (isNaN(parseFloat(channelID))) return message.reply({ content: "That's not a valid channel." })
			guilds.set(`${message.guild.id}`, { code: `${serverCode}`, channel: channelID, servers: [] });
                                                      const SetupChannelID = guilds.get(`${message.guild.id}`).channel
                                                      message.channel.send(`:white_check_mark: Successfully set up Netcord in <#${SetupChannelID}>.`);
		}
	},
}