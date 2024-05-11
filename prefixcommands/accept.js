const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const { PermissionFlagsBits, ChannelType } = require("discord-api-types/v10");
const path = require("path");
const fs = require("fs");

const DISABLED = false;

module.exports = {
  data: {
    name: "accept",
  },
  run: async (client, message, args) => {
    try {
      var channelID = args[0].replace(/<#|>/g, "");
      const staffChannel = "1214248772821848145";
      const channel = await client.channels.fetch(channelID);

      if (!args || args.length === 0) {
        return message.reply("Error: No channel given!");
      }

      if (isNaN(parseFloat(channelID))) {
        return message.reply("❌ | Please specify a valid channel");
      }

      const staffUsersData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'staffUsers.json'), 'utf8'));

      if (!staffUsersData.staffIDs.includes(message.author.id))
        return message.reply("❌ | You don't have permission to use this command");

      const guildsPath = path.join(process.cwd(), 'guild.json');
      const guilds = JSON.parse(fs.readFileSync(guildsPath, 'utf8'));
      const pendingServersPath = path.join(process.cwd(), 'pendingServers.json');
      const pendingServers = JSON.parse(fs.readFileSync(pendingServersPath, 'utf8'));
      const index = pendingServers.channels.indexOf(channelID);
      if (!pendingServers.channels.includes(channelID))
        return message.reply("❌ | Channel with ID ${channelID} has not been requested.");
      if (guilds.channels.includes(channelID))
        return message.reply("❌ | Channel with ID ${channelID} is already accepted");

      guilds.channels.push(channelID);
      fs.writeFileSync(guildsPath, JSON.stringify(guilds, null, 2));
      pendingServers.channels.splice(index, 1);
      fs.writeFileSync(pendingServersPath, JSON.stringify(pendingServers, null, 2));

      const crossGuildEmbed = new MessageEmbed()
        .setColor(5793266)
        .setFooter({
          text: "Netcord Support Server" + " • Netcord Stable",
          iconURL: "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp",
        })
        .setDescription("Hello and welcome to Netcord! We hope you'll enjoy using our bot, however we have some guidelines:" + "\nLast Updated: 13/04/2024 at 16:MM UTC\nMade by Rose1440 & martinezlovesiberia\n\nRule 1: No Harassment\nWe do not tolerate homophobia, transphobia, racism and all kinds of bigotry.\n\nRule 2: No Raiding\nComing to Netcord just to raid will result in a permanent blacklist.\n\nRule 3: No Spamming\nIf you spam in Netcord, you will be warned on first offense, a temporary blacklist on second offense and a permanent blacklist on third offense.\n\nRule 4: No Drama\nIf you keep bringing in old drama to Netcord, regardless if it's in the Netcord Support Server or in another server, you will be warned on first offense, and permanently banned on second offense.\n\nRule 5: No NSFW\nThere are minors here. It will result in a permanent ban.\n\nRule 6: Follow Discord TOS\nThis means that you have to be at least 13 years old or the respective age in your country to use Netcord.\n\nWe hope you enjoy your time cross-chatting!")
        .setThumbnail(
          "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp?size=48"
        )
        .setTimestamp()
        .setAuthor({
          name: "Netcord" + " (" + "netcorddevteam" + ")",
          iconURL: "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp",
        });
      await channel.send({ embeds: [crossGuildEmbed] });
      return message.reply("✅ | Channel with ID ${channelID} has been accepted.");
    } catch (error) {
      console.error("Error in accept command:", error);
    }
  },
};
