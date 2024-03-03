var path = path ? path : require("path");
const {Store} = require("data-store");

var guilds = new Store({
  path: path.join(process.cwd() + "/guilds.json"),
  debounce: 0
})

const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const { Readable } = require("node:stream");
const { Buffer } = require("node:buffer");
const { MessageEmbed, Permissions, MessageActionRow, MessageButton, MessageAttachment, PermissionsBitField } = require("discord.js")
const prefix = "nc?"
const ownerId = "1189290335000592506";
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const DefaultEmbedColor = 0x2054C4

module.exports = {
	name: "messageCreate",
	once: false,
	run: async (client, message) => {
    guilds.load()
	
if (message.author.id === "1201104664662396951") return
                                   const userTag = message.author.username;
		if (message.content.startsWith(prefix)) {
			if (message.author.bot) return;
    	const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const command = args.shift().toLowerCase();

			const cmd = client.commands.get(command);

			if (!cmd) return; // If cmd was not found
				cmd.run(client, message, args)
			return;
	  } else {
	    // Ignore messages sent by the bot
	    if (message.author.id === client.user.id) return;

	    if (message.author.bot) return;

				var msg = new Object();
		try {		
		  if (message.channel.id.includes(guilds.get(`${message.guild.id}`).channel)) {

				msg = message;
				message.delete();
		    var array_guild = Object.keys(guilds.data);
				
		    for (const element of array_guild) {
          const channel = guilds.get(`${element}`).channel;
					if (!msg.guild.members.cache.get(client.user.id).permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
          const ircEmbed = new MessageEmbed()
                                          .setColor(DefaultEmbedColor)
		      .setFooter({ text: msg.guild.name, iconURL: msg.guild.iconURL() })
                                          .setDescription(`${msg}`)
		      .setTimestamp()
		      .setAuthor({ name: userTag, iconURL: msg.author.displayAvatarURL() });

                 try {
					client.channels.cache.get(channel)?.send({ embeds: [ircEmbed] })
                 } catch (err) {
                   if (err.code === 'MISSING_PERMISSIONS') {
                     console.log(`No permissions to send message to ${message.guild.name}`);
                     continue; // Ignore this guild and continue with the loop
                   } else {
                     console.error(`Error sending message to ${message.guild.name}:`, err);
                   }
}
						}
		      };
					
					await sleep(25);

	} catch (err) {
                    console.error('An error occurred', err);
}
	}	
}
}