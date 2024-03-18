const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = {
  data: {
    name: "unserverblacklist",
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

      const index = bannedServers.bannedIDs.indexOf(serverId);
      if (index === -1)
        return message.reply(`❌ | Server with ID ${serverId} is not blacklisted`);

      bannedServers.bannedIDs.splice(index, 1);
      fs.writeFileSync(bannedServersPath, JSON.stringify(bannedServers, null, 2));

      return message.reply(`✅ | Server with ID ${serverId} has been unblacklisted.`);

    } catch (error) {
      console.error("Error in unblacklist server command:", error);
    }
  },
};
