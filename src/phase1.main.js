const proc = {
  h: require("phase1.harvester"),
  u: require("phase1.upgrader"),
};

let spawnName = Object.keys(Game.spawns)[0];

module.exports.loop = function () {
  if (Game.time % 5 == 0) {
    for (var procName in proc) {
      proc[procName].init(Game.spawns[spawnName]);
    }
  }

  for (var name in Game.creeps) {
    proc[name[0]].step(Game.creeps[name]);
  }
};
