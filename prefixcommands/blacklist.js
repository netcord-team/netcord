const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const { PermissionFlagsBits, ChannelType } = require("discord-api-types/v10");
const path = require("path");
const fs = require("fs");
const { Store } = require("data-store");

const DISABLED = false;

module.exports = {
  data: {
  name: "blacklist",  
  },
  run: async (client, message, args) => {
    try {
      const userIdPattern = /(\d{17,19})/g;
      let userId;
      let member;

      if (message.mentions.members.size > 0) {
        member = message.mentions.members.first();
        userId = member.id;
      } else if (userIdPattern.test(args[0])) {
        userId = args[0].match(userIdPattern)[0];
      } else {
        return message.reply(`❌ | Please specify a valid user mention or ID`);
      }
      
      const staffUsersData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'staffUsers.json'), 'utf8'));

      if (!staffUsersData.staffIDs.includes(message.author.id))
        return message.reply("❌ | You don't have permission to use this command");

      const bannedUsersPath = path.join(process.cwd(), 'bannedUsers.json');
      const bannedUsers = JSON.parse(fs.readFileSync(bannedUsersPath, 'utf8'));
      if (bannedUsers.bannedIDs.includes(userId))
        return message.reply(`❌ | User with ID ${userId} is already blacklisted`);

      bannedUsers.bannedIDs.push(userId);
      fs.writeFileSync(bannedUsersPath, JSON.stringify(bannedUsers, null, 2));

      return message.reply(`✅ | User with ID ${userId} has been blacklisted.`);

    } catch (error) {
      console.error("Error in blacklist command:", error);
    }
  },
};
