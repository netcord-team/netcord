const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const { PermissionFlagsBits, ChannelType } = require("discord-api-types/v10");
const path = require("path");
const fs = require("fs");

const DISABLED = false;

module.exports = {
  data: {
    name: "serverblacklist",
  },
  run: async (client, message, args) => {
    try {
      const serverIdPattern = /(\d{17,19})/g;
      let serverId;

      if (serverIdPattern.test(args[0])) {
        serverId = args[0].match(serverIdPattern)[0];
      } else {
        return message.reply(`❌ | Please specify a valid server ID`);
      }
      
      const staffUsersData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'staffUsers.json'), 'utf8'));

      if (!staffUsersData.staffIDs.includes(message.author.id))
        return message.reply("❌ | You don't have permission to use this command");

      const bannedServersPath = path.join(process.cwd(), 'bannedServers.json');
      const bannedServers = JSON.parse(fs.readFileSync(bannedServersPath, 'utf8'));
      if (bannedServers.bannedIDs.includes(serverId))
        return message.reply(`❌ | Server with ID ${serverId} is already blacklisted`);

      bannedServers.bannedIDs.push(serverId);
      fs.writeFileSync(bannedServersPath, JSON.stringify(bannedServers, null, 2));

      return message.reply(`✅ | Server with ID ${serverId} has been blacklisted.`);

    } catch (error) {
      console.error("Error in blacklist server command:", error);
    }
  },
};

