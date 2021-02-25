module.exports = {
  init: function (spawn) {
    var creeps = _.filter(Game.creeps, (creep) => creep.name[0] == "u");
    if (creeps.length < 1) {
      var newName = "u-" + Game.time;
      Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName);
    }
  },
  step: function (creep) {
    switch (creep.memory.mode) {
      case "upgrade":
        if (
          creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(creep.room.controller, {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
        if (creep.store[RESOURCE_ENERGY] == 0) {
          creep.memory.mode = "harvest";
        }
        break;
      default:
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0], {
            visualizePathStyle: { stroke: "#ffaa00" },
          });
        }
        if (creep.store.getFreeCapacity() == 0) {
          creep.memory.mode = "upgrade";
        }
        break;
    }
  },
};
