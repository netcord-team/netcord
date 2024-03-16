
module.exports = {
	name: "ready",
	once: true,
	run: (client) => {
    // When the client is ready, run this code (only once)
		  console.log('Ready!');
      console.log(`Trusted in ${client.guilds.cache.size} servers!`);

	    client.user.setActivity({
	      name: "Freely connected, finally.",
	      type: "PLAYING"
	    })
	}
}