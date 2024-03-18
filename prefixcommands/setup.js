const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const { PermissionFlagsBits, ChannelType } = require("discord-api-types/v10");
const fs = require("fs");
const path = require("path");
const { Store } = require("data-store");
const guildsFilePath = path.join(process.cwd(), "guild.json");
const guildsFile = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "guild.json"), "utf8")
);

const DISABLED = false;

module.exports = {
  data: {
    name: "setup",
  },
  run: (client, message, args) => {
    if (DISABLED) {
      return message.reply(
        "Command disabled for further use. Ask the administrators or owners of this bot to add your server until we fix some bugs with this command."
      );
    }
    if (!args || args.length === 0)
      return message.reply("Error: No channel given!");
    var channelID = args[0]
      .replace("<#", "")
      .replace(">", "")
      .replace("undefined", "");
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
      return message.reply({
        content: "You are not allowed to use this command",
      });
    else {
      if (isNaN(parseFloat(channelID)))
        return message.reply({ content: "That's not a valid channel." });
      if (guildsFile.channels.includes(message.channel.id) == channelID) {
        return message.reply({ content: "Your server is already set up!" });
      }
      // Read guilds data from the file
      let guildsData = {};
      try {
        guildsData = JSON.parse(fs.readFileSync(guildsFilePath, "utf8"));
      } catch (error) {
        console.error("Error reading guild.json:", error);
      }
      
      // Update channels array in guildsData with the new channel ID
      if (!guildsData.channels) {
        guildsData.channels = [];
      }
      guildsData.channels.push(channelID);
      
      // Write the updated guildsData back to guild.json
      try {
        fs.writeFileSync(
          guildsFilePath,
          JSON.stringify(guildsData, null, 2),
          "utf8"
        );
      } catch (error) {
        console.error("Error writing guild.json:", error);
      }

      message.channel.send(
        `:white_check_mark: Successfully set up Netcord in <#${channelID}>.`
      );
    }
  },
};
