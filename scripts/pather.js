const { resolve } = require("path");

exports.Pather = class Pather {
  static resolve(path) {
    return resolve(__dirname, "..", path);
  }
};
