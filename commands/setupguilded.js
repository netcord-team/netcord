module.exports = {
	name: "setup_guilded",
	execute: (client, message, args) => {
        if (!args.length) return msg.send("You must give me a argument! Do it like this: ?nc setup #netcord Server Name");
        msg.send(args.join(" "));
    },
}
