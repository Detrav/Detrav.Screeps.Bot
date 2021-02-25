let spawnName = Object.keys(Game.spawns)[0];
let room = Game.spawns[spawnName].room;

var sources = room.find(FIND_SOURCES);
var targets = room.find(FIND_STRUCTURES, {
  filter: (structure) => {
    return (
      (structure.structureType == STRUCTURE_EXTENSION ||
        structure.structureType == STRUCTURE_SPAWN) &&
      structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    );
  },
});

module.exports = {
  init: function (spawn) {
    var creeps = _.filter(Game.creeps, (creep) => creep.name[0] == "h");
    if (creeps.length < 2) {
      var newName = "h-" + Game.time;
      Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName);
    }
  },
  step: function (creep) {
    if (creep.store.getFreeCapacity() > 0) {
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: "#ffffff" },
          });
        }
      }
    }
  },
};
