const path = require("path");
const fs = require("fs");
const { MessageEmbed, Permissions } = require("discord.js");
const prefix = "ncb?";

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
      const isVideo = attachment && attachment.url.endsWith('.mp4');
      const isImage = attachment && (attachment.url.endsWith('.png') || attachment.url.endsWith('.jpg') || attachment.url.endsWith('.jpeg') || attachment.url.endsWith('.gif'));
      const videoAttachmentMessage = videoMessage(message.author.id);
      const badge = determineStaffRole(message.author.id, isVideo);
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
      message.delete();
      channel.forEach(async (channel) => {
        if (!channel) return;
        const crossGuildEmbed = new MessageEmbed()
          .setColor(5793266)
          .setFooter({
            text: message.guild.name + " • Netcord Stable",
            iconURL: message.guild.iconURL(),
          })
          .setDescription(message.content + videoAttachmentMessage)
          .setImage(attachmentUrl)
          .setThumbnail(
            "https://cdn.discordapp.com/icons/1213558508398579742/d73f54243a2f8b70389ee671ff138421.webp?size=48"
          )
          .setTimestamp()
          .setAuthor({
            name: message.author.displayName + " (" + username + ")" + badge,
            iconURL: message.author.displayAvatarURL(),
          });
        await channel.send({ embeds: [crossGuildEmbed] });
      });
      return;
    }
    catch (error) {
      console.error("An error occurred in the messageCreate event:", error);
    }
  },
};

function determineStaffRole(userID) {
  if (staffUsers.ownerID.includes(userID)) {
    return " [👑]";
  } else if (staffUsers.teamIDs.includes(userID)) {
    return " [💻]";
  } else if (staffUsers.staffIDs.includes(userID)) {
    return " [🔨]";
  } else {
    return "";
  }
}
function videoMessage(videoURL, isVideo) {
  if (isVideo) {
    return "\n\nThis message contains a video attachment. To view it, download it from";
  } else {
    return "";
  }
}