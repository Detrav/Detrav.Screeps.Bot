var phase1 = require("phase1.main");

var currentPhase = phase1;

module.exports.loop = function () {
  currentPhase.loop();
};
