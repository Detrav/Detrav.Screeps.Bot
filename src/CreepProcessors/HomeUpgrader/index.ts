export const PROCESSOR_NAME = "home-upgrader";

interface CreepMemoryHomeUpgrader extends CreepMemory {
  role?: "upgrade";
  containerId?: Id<StructureContainer>;
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
  priority: 0,
  config: function () {},
  room: function (roomName: string) {},
  scan: function (creepName: string) {},
  spawn: function (spawnName: string) {
    const spawn = Game.spawns[spawnName];

    if (spawn) {
      const containers = spawn.room.find(FIND_STRUCTURES, {
        filter: m => m.structureType === STRUCTURE_CONTAINER
      });

      if (containers.length) {
        const count = containers.length;
        for (let i = 0; i < count; i++) {
          const creepName = PROCESSOR_NAME + "-" + i;
          const creep = Game.creeps[creepName];

          if (!creep) {
            spawn.spawnCreep(getCreepPowerByCapacity(spawn), creepName, {
              memory: <CreepMemoryHomeUpgrader>{
                processor: PROCESSOR_NAME,
                containerId: containers[i].id
              }
            });
          }
        }
      }
    }
  },
  step: function (creepName: string) {
    const creep = Game.creeps[creepName];

    if (!creep) return;
    const memory = creep.memory as CreepMemoryHomeUpgrader;
    switch (memory.role) {
      case "upgrade":
        {
          const controller = creep.room.controller;
          if (controller) {
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(controller, { visualizePathStyle: { stroke: "#ffffff" } });
            }
          }

          if (creep.store[RESOURCE_ENERGY] === 0) {
            memory.role = undefined;
          }
        }
        break;
      default:
        {
          if (memory.containerId) {
            const storage = Game.getObjectById(memory.containerId);
            if (storage) {
              if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {
                  visualizePathStyle: { stroke: "#ffffff" }
                });
              }
            }

            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
              memory.role = "upgrade";
            }
          }
        }
        break;
    }
  }
};

export const processors: CreepProcessor[] = [processor];
