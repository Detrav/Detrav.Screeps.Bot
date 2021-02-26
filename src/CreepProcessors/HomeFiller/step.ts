import { CreepMemoryHomeFiller, FillerRole } from "./types";

export const step = function (creep: Creep) {
  const memory = creep.memory as CreepMemoryHomeFiller;

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
          if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            memory.role = FillerRole.SearchSource;
          }
        } else {
          memory.role = FillerRole.SearchTarget;
        }
      }
      break;
    case FillerRole.SearchTarget:
      {
        const storages = creep.room.find(FIND_STRUCTURES, {
          filter: m =>
            (m.structureType === STRUCTURE_EXTENSION || m.structureType === STRUCTURE_SPAWN) &&
            m.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        const storage = creep.pos.findClosestByRange(storages);
        if (storage) {
          memory.role = FillerRole.PushToTarget;
          memory.pid = storage.id;
        } else {
          memory.pause = 11;
        }
      }
      break;
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
          filter: m => m.structureType === STRUCTURE_CONTAINER && m.store.getUsedCapacity(RESOURCE_ENERGY) > 200
        });
        const container = creep.pos.findClosestByRange(containers);
        if (container) {
          memory.pid = container.id;
          memory.role = FillerRole.PullFromSource;
        } else {
          memory.pause = 11;
        }
      }
      break;
  }
};
