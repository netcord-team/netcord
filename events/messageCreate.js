const path = require("path");
const fs = require("fs");
const { MessageEmbed, Permissions } = require("discord.js");
const prefix = "nc?";

const bannedUsers = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "bannedUsers.json"), "utf8")
);
const staffUsers = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "staffUsers.json"), "utf8")
);
const guildsFile = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "guild.json"), "utf8")
);
const bannedServersPath = path.join(process.cwd(), 'bannedServers.json');
const bannedServers = JSON.parse(fs.readFileSync(bannedServersPath, 'utf8'));

module.exports = {
  name: "messageCreate",
  once: false,
  run: async (client, message) => {
    try {
      if (bannedUsers.bannedIDs.includes(message.author.id)) {
        await message.author.send(
          "You have been banned from Netcord. If you think you have been unjustly banned, you can appeal in our ban appeal server: https://discord.gg/DFAApNkuZA"
        );
        return;
      }
      if (bannedServers.bannedIDs.includes(message.guild.id)) {
        await message.author.send(
          "Your server that you are sending this message from has been from Netcord. Contact the server owner to appeal in our ban appeal server: https://discord.gg/DFAApNkuZA"
        );
        return;
      }

      if (message.content.startsWith(prefix)) {
        if (message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        cmd.run(client, message, args);
        return;
      }

      if (message.author.bot) return;
      if (message.author.id === client.user.id) return;
      const channelID = message.channel.id;
      const attachment = message.attachments.first();
      const attachmentUrl = attachment ? attachment.url : null;
      if (!guildsFile.channels.includes(channelID)) return;
      if (message.reference && message.reference.messageID) {
        const repliedMessage = await message.channel.messages.fetch(message.reference.messageID); // reply test can someone get this to work
      } else {
        const repliedMessage = "BLANK";
      }

      const channel = guildsFile.channels.map((channelId) =>
        client.channels.cache.get(channelId)
      );

      console.log("Message recieved!");
      const username = message.author.username;
      message.delete();
      if (staffUsers.ownerID.includes(message.author.id)) { // Bit of a hacky solution for badges, this should be changed, also make sure to update every one when the embed code gets changed
        channel.forEach(async (channel) => {
          if (!channel) return;
          const crossGuildEmbed = new MessageEmbed()
            .setColor(5793266)
            .setFooter({
              text: message.guild.name + " • Netcord Stable",
              iconURL: message.guild.iconURL(),
            })
            .setDescription(message.content)
            .setImage(attachmentUrl)
            .setThumbnail(
              "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp?size=48"
            )
            .setTimestamp()
            .setAuthor({
              name:
                message.author.displayName + " (" + username + ")" + " [👑]",
              iconURL: message.author.displayAvatarURL(),
            });
          await channel.send({ embeds: [crossGuildEmbed] });
        });
        return;
      }
      if (staffUsers.teamIDs.includes(message.author.id)) {
        channel.forEach(async (channel) => {
          if (!channel) return;
          const crossGuildEmbed = new MessageEmbed()
            .setColor(5793266)
            .setFooter({
              text: message.guild.name + " • Netcord Stable",
              iconURL: message.guild.iconURL(),
            })
            .setDescription(message.content)
            .setImage(attachmentUrl)
            .setThumbnail(
              "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp?size=48"
            )
            .setTimestamp()
            .setAuthor({
              name:
                message.author.displayName + " (" + username + ")" + " [💻]",
              iconURL: message.author.displayAvatarURL(),
            });
          await channel.send({ embeds: [crossGuildEmbed] });
        });
        return;
      }
      if (staffUsers.staffIDs.includes(message.author.id)) {
        channel.forEach(async (channel) => {
          if (!channel) return;
          const crossGuildEmbed = new MessageEmbed()
            .setColor(5793266)
            .setFooter({
              text: message.guild.name + " • Netcord Stable",
              iconURL: message.guild.iconURL(),
            })
            .setDescription(message.content)
            .setImage(attachmentUrl)
            .setThumbnail(
              "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp?size=48"
            )
            .setTimestamp()
            .setAuthor({
              name:
                message.author.displayName + " (" + username + ")" + " [🔨]",
              iconURL: message.author.displayAvatarURL(),
            });
          await channel.send({ embeds: [crossGuildEmbed] });
        });
        return; 
      } else {
        channel.forEach(async (channel) => {
          if (!channel) return;
          const crossGuildEmbed = new MessageEmbed()
            .setColor(5793266)
            .setFooter({
              text: message.guild.name + " • Netcord Stable",
              iconURL: message.guild.iconURL(),
            })
            .setDescription(message.content)
            .setImage(attachmentUrl)
            .setThumbnail(
              "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp?size=48"
            )
            .setTimestamp()
            .setAuthor({
              name: message.author.displayName + " (" + username + ")",
              iconURL: message.author.displayAvatarURL(),
            });
          await channel.send({ embeds: [crossGuildEmbed] });
        });
        return;
      }
    } catch (error) {
      console.error("An error occurred in the messageCreate event:", error);
    }
  },
};
