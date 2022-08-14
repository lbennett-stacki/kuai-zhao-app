const dotAccess = require("dot-access");
const { resolve } = require("path");
const merge = require("deepmerge");

exports.CapturerDatabase = class CapturerDatabase {
  db = null;

  constructor(db = null) {
    console.info("CapturerDatabase#constructor");
    this.db = db;
  }

  async init() {
    console.info("CapturerDatabase#init");
    const { Low, JSONFile } = await import("lowdb");
    this.db =
      this.db ||
      new Low(
        new JSONFile(resolve(__dirname, "../../../dbdata/capturer.json"))
      );
    await this.read();

    await this.write(
      merge(this.db.data, {
        window: {
          plot: {
            width: 800,
            height: 400,
            x: 0,
            y: 0,
          },
        },
      })
    );
  }

  async read() {
    console.info("CapturerDatabase#read");
    return await this.db.read();
  }

  async write(data) {
    console.info("CapturerDatabase#write");
    this.db.data = merge(this.db.data, data);
    await this.db.write();
    await this.db.read();
  }

  async set(path, value) {
    console.info("CapturerDatabase#set", path);
    this.db.data = dotAccess.set(this.db.data, path, value);
    return await this.db.write();
  }

  get(path) {
    console.info("CapturerDatabase#get", path);
    return dotAccess.get(this.db.data, path);
  }
};
