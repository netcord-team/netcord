const path = require("path");
const { Store } = require("data-store");

var guilds = new Store({
  path: path.join(process.cwd() + "/guilds.json"),
  debounce: 0
})

module.exports = {
	name: "ready",
	once: true,
	run: (client) => {
		setInterval(() => guilds.load(), 5000);

		setTimeout(() => {
			guilds.save();
		}, 10000)
    // When the client is ready, run this code (only once)
		  console.log('Ready!');
      console.log(`Trusted in ${client.guilds.cache.size} servers!`);

	    client.user.setActivity({
	      name: "Freely connected, finally.",
	      type: "PLAYING"
	    })
	}
}