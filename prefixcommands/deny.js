const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = {
  data: {
    name: "deny",  
  },
  run: async (client, message, args) => {
    try {
      var channelID = args[0].replace(/<#|>/g, "");
      const staffChannel = "1214248772821848145";

      if (!args || args.length === 0) {
        return message.reply("Error: No channel given!");
      }

      if (isNaN(parseFloat(channelID))) {
        return message.reply(`❌ | Please specify a valid channel`);
      }
      
      const staffUsersData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'staffUsers.json'), 'utf8'));

      if (!staffUsersData.staffIDs.includes(message.author.id))
        return message.reply("❌ | You don't have permission to use this command");

      const guildsPath = path.join(process.cwd(), 'guild.json');
      const guilds = JSON.parse(fs.readFileSync(guildsPath, 'utf8'));
      const pendingServersPath = path.join(process.cwd(), 'pendingServers.json');
      const pendingServers = JSON.parse(fs.readFileSync(pendingServersPath, 'utf8'));
      const bannedServersPath = path.join(process.cwd(), 'bannedServers.json');
      const bannedServers = JSON.parse(fs.readFileSync(bannedServersPath, 'utf8'));
      const index = pendingServers.channels.indexOf(channelID);
      if (index === -1)
        return message.reply(`❌ | Channel with ID ${channelID} has not been requested, or has already been accepted.`);

      bannedServers.bannedIDs.splice(index, 1);
      fs.writeFileSync(bannedServersPath, JSON.stringify(bannedServers, null, 2));

      return message.reply(`✅ | Channel with ID ${channelID} has been denied.`);

    } catch (error) {
      console.error("Error in deny command:", error);
    }
  },
};
