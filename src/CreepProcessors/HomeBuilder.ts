const PROCESSOR_NAME = "home-builder";

let builder_count = 2;

interface CreepMemoryHomeBuilder extends CreepMemory {
  role?: string;
}

function getCreepPowerByCapacity(spawn: StructureSpawn): BodyPartConstant[] {
  if (spawn.room.energyCapacityAvailable >= 500) {
    return [WORK, WORK, CARRY, CARRY, MOVE];
  } else {
    return [WORK, CARRY, MOVE];
  }
}

const processor: CreepProcessor = {
  processorName: PROCESSOR_NAME,
  priority: 5,
  config: function () {},
  room: function (roomName: string) {},
  scan: function (creepName: string) {},
  spawn: function (spawnName: string) {
    const spawn = Game.spawns[spawnName];

    for (let i = 0; i < builder_count; i++) {
      const creepName = PROCESSOR_NAME + "-" + i;
      const creep = Game.creeps[creepName];

      if (!creep) {
        spawn.spawnCreep(getCreepPowerByCapacity(spawn), creepName, {
          memory: {
            processor: PROCESSOR_NAME
          }
        });
      }
    }
  },
  step: function (creepName: string) {
    const creep = Game.creeps[creepName];

    if (!creep) return;
    const memory = creep.memory as CreepMemoryHomeBuilder;
    switch (memory.role) {
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
            memory.role = undefined;
          }
        }
        break;
      default:
        {
          var storage = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
              return (
                (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
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
            memory.role = "building";
          }
        }
        break;
    }
  }
};
export const processors: CreepProcessor[] = [processor];
