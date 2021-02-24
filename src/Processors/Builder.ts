const PROCESSOR_NAME = "builder";

const builder_count = 2;

const processor: CreepProcessor = {
  scan: function (spawnName: string) {},
  spawn: function (spawnName: string) {
    const creeps = _.filter(
      Game.creeps,
      creep => creep.memory.processor == PROCESSOR_NAME && creep.memory.spawn == spawnName
    );
    const spawn = Game.spawns[spawnName];
    //const sources = spawn.room.find(FIND_SOURCES);
    if (creeps.length < builder_count) {
      spawn.spawnCreep([WORK, CARRY, MOVE], "Harvester" + Game.time, {
        memory: {
          processor: PROCESSOR_NAME,
          spawn: spawnName
        }
      });
    }
  },
  step: function (creep: Creep) {
    switch (creep.memory.role) {
      case "building":
        {
          var targets = _.sortBy(creep.room.find(FIND_CONSTRUCTION_SITES), m => m.progressTotal - m.progress);
          if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
            }
          } else {
            //repair
            var repairTargets = _.sortBy(
              creep.room.find(FIND_STRUCTURES, { filter: m => m.hits < m.hitsMax }),
              m => m.hits / m.hitsMax
            );

            if (repairTargets.length) {
              if (creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repairTargets[0], { visualizePathStyle: { stroke: "#ffffff" } });
              }
            }
          }

          if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.role = undefined;
          }
        }
        break;
      default:
        {
          var storage = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
              return (
                (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.store[RESOURCE_ENERGY] > 0
              );
            }
          });

          if (storage.length) {
            if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storage[0], {
                visualizePathStyle: { stroke: "#ffffff" }
              });
            }
          }

          if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.role = "building";
          }
        }
        break;
    }
  }
};
const processors: CreepProcessors = {};
processors[PROCESSOR_NAME] = processor;

export default processors;
