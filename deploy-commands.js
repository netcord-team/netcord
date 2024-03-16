const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier

const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	//client.commands.set(command.name, command);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

        console.log(commands);
		// The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

		console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);   
	}
})();
