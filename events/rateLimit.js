const { spawn } = require("child_process")

module.exports = {
	name: "rateLimit",
	once: false,
	run: (client) => {
		console.log("Bot is being rate limited!");
    console.log("The bot has been ratelimited!")
	}
}