const { MessageEmbed } = require("discord.js")
var path = path ? path : require("path");
const {Store} = require("data-store");
var guilds = new Store({
  path: path.join(process.cwd() + "/guilds.json"),
  debounce: 0
})

module.exports = {
	name: "guildDelete",
	once: false,
	run: (client, guild) => {
		console.log('Removed a Guild ID which has kicked the bot')
  		guilds.del(guild.id);
  		guilds.save();
	}
}