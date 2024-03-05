const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const path = require("path");
const fs = require("fs");

module.exports = {
  name: "unban",  
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

      if (!staffUsersData.bannedIDs.includes(message.author.id))
        return message.reply("❌ | You don't have permission to use this command");

      const bannedUsersPath = path.join(process.cwd(), 'bannedUsers.json');
      const bannedUsers = JSON.parse(fs.readFileSync(bannedUsersPath, 'utf8'));

      const index = bannedUsers.bannedIDs.indexOf(userId);
      if (index === -1)
        return message.reply(`❌ | User with ID ${userId} is not blacklisted`);

      bannedUsers.bannedIDs.splice(index, 1);
      fs.writeFileSync(bannedUsersPath, JSON.stringify(bannedUsers, null, 2));

      return message.reply(`✅ | User with ID ${userId} has been unbanned.`);

    } catch (error) {
      console.error("Error in unban command:", error);
    }
  },
};
