const { Store } = require("data-store");
const fs = require("fs")

module.exports = class DB extends Store {
  get(...args) {
    this.load();
    return super.get(...args);
  }

  set(...args) {
    this.load();
    return super.set(...args);
  }

  del(...args) {
    this.load();
    return super.del(...args);
  }

  hasOwn(...args) {
    this.load();
    return super.hasOwn(...args);
  }

  clone(...args) {
    this.load();
    return super.clone(...args);
  }
}

var data, path = process.cwd() + "/guilds.json";

module.exports.guilds = {
	path: process.cwd() + "/guilds.json",
	data: fs.readFileSync(path, { encoding: "utf-8" }),
	get: (id) => {
		if (!data) data = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }))
		return data[String(id)] ?? undefined;
	},
	set: (id, value) => {
		data[String(id)] = value;
		return fs.writeFileSync(path, JSON.stringify(data), { encoding: "utf-8" })
	}
}