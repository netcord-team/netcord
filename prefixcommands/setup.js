const { MessageEmbed, Permissions } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { ChannelType } = require("discord-api-types/v10");

const pendingServersFilePath = path.join(process.cwd(), "pendingServers.json");
const guildsFile = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "guild.json"), "utf8")
);
const bannedServersPath = path.join(process.cwd(), 'bannedServers.json');
const bannedServers = JSON.parse(fs.readFileSync(bannedServersPath, 'utf8'));

const DISABLED = false;

module.exports = {
  data: {
    name: "setup",
  },
  run: async (client, message, args) => {
    try {
      if (DISABLED) {
        return message.reply(
          "Command disabled for further use. Ask the administrators or owners of this bot to add your server until we fix some bugs with this command."
        );
      }
      if (!args || args.length === 0) {
        return message.reply("Error: No channel given!");
      }

      var channelID = args[0].replace(/<#|>/g, "");
      const channel = await client.channels.fetch(message.channel.id);
      const staffChannelID = "1214248772821848145";
      const staffChannel = await client.channels.fetch(staffChannelID);

      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
        return message.reply({
          content: "You are not allowed to use this command",
        });

      if (isNaN(parseFloat(channelID)))
        return message.reply({ content: "That isn't a valid channel." }); 

      if (guildsFile.channels.includes(channelID)) {
        return message.reply({ content: "Your server is already set up!" });
      }

      if (bannedServers.bannedIDs.includes(channelID)) {
        return message.reply({ content: "Your server is banned!" });
      }

      let pendingServersData = {};
      try {
        pendingServersData = JSON.parse(
          fs.readFileSync(pendingServersFilePath, "utf8")
        );
      } catch (error) {
        console.error("Error reading pendingServers.json:", error);
      }

      if (!pendingServersData.channels) {
        pendingServersData.channels = [];
      }
      pendingServersData.channels.push(channelID);

      fs.writeFileSync(
        pendingServersFilePath,
        JSON.stringify(pendingServersData, null, 2),
        "utf8"
      );

      const setupEmbed = new MessageEmbed()
        .setColor(5793266)
        .setFooter({
          text: message.guild.id + " • Netcord Stable",
          iconURL: message.guild.iconURL(),
        })
        .setDescription(
          "The server " +
          message.guild.name +
          " has attempted to get access to Netcord! Use nc?accept " +
          channelID +
          " or nc?deny " +
          channelID
        )
        .setThumbnail(
          "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp?size=48"
        )
        .setTimestamp()
        .setAuthor({
          name: message.guild.name,
          iconURL: message.guild.iconURL(),
        });

      await staffChannel.send({ embeds: [setupEmbed] });
      
      return message.reply({ content: ":white_check_mark: Your Netcord setup request in <#${channelID}> has been sent."});
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
