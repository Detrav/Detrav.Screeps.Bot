export const PROCESSOR_NAME = "home-filler";

enum FillerRole {
  SearchSource = 1,
  PullFromSource = 2,
  SearchTarget = 3,
  PushToTarget = 4
}

interface CreepMemoryHomeFiller extends CreepMemory {
  role: FillerRole;
  pid?: string;
  pause?: number;
}

function getCreepPowerByCapacity(spawn: StructureSpawn): BodyPartConstant[] | void {
  if (spawn.room.energyCapacityAvailable >= 500) {
    return [WORK, CARRY, CARRY, CARRY, MOVE];
  }
}

const fillerCount = 1;

const processor: CreepProcessor = {
  processorName: PROCESSOR_NAME,
  priority: 0,
  config: function () {},
  room: function (roomName: string) {},
  scan: function (creepName: string) {},
  spawn: function (spawnName: string) {
    const spawn = Game.spawns[spawnName];

    if (spawn) {
      for (let i = 0; i < fillerCount; i++) {
        const creepName = PROCESSOR_NAME + "-" + i;
        const creep = Game.creeps[creepName];

        if (!creep) {
          const power = getCreepPowerByCapacity(spawn);
          if (power) {
            spawn.spawnCreep(power, creepName, {
              memory: <CreepMemoryHomeFiller>{
                role: FillerRole.SearchSource
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
    const memory = creep.memory as CreepMemoryHomeFiller;

    if (memory.pause) {
      memory.pause--;
      if (memory.pause < 0) {
        delete memory.pause;
      }
    }

    switch (memory.role) {
      case FillerRole.PushToTarget:
        {
          const storage = Game.getObjectById(<Id<StructureExtension>>memory.pid);
          if (storage) {
            switch (creep.transfer(storage, RESOURCE_ENERGY)) {
              case ERR_NOT_IN_RANGE:
                creep.moveTo(storage, {
                  visualizePathStyle: { stroke: "#ffffff" }
                });
                break;
              case OK:
                break;
              default:
                memory.role = FillerRole.SearchTarget;
                break;
            }
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
              memory.role = FillerRole.SearchSource;
            }
          } else {
            memory.role = FillerRole.SearchTarget;
          }
        }
        break;
      case FillerRole.SearchTarget: {
        const storages = creep.room.find(FIND_STRUCTURES, {
          filter: m => m.structureType === STRUCTURE_EXTENSION && m.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        const storage = creep.pos.findClosestByRange(storages);
        if (storage) {
          memory.pid = storage.id;
        } else {
          memory.pause = 11;
        }
      }
      case FillerRole.PullFromSource:
        {
          const container = Game.getObjectById(<Id<StructureContainer>>memory.pid);
          if (container) {
            switch (creep.withdraw(container, RESOURCE_ENERGY)) {
              case ERR_NOT_IN_RANGE:
                creep.moveTo(container, {
                  visualizePathStyle: { stroke: "#ffffff" }
                });
                break;
              case OK:
                break;
              default:
                memory.role = FillerRole.SearchSource;
                break;
            }
            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
              memory.role = FillerRole.SearchTarget;
            }
          } else {
            memory.role = FillerRole.SearchSource;
          }
        }
        break;
      case FillerRole.SearchSource:
      default:
        {
          const containers = creep.room.find(FIND_STRUCTURES, {
            filter: m => m.structureType === STRUCTURE_CONTAINER && m.store.getCapacity(RESOURCE_ENERGY) > 200
          });
          const container = creep.pos.findClosestByRange(containers);
          if (container) {
            memory.pid = container.id;
          } else {
            memory.pause = 11;
          }
        }
        break;
    }
  }
};

export const processors: CreepProcessor[] = [processor];
