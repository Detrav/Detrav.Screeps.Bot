import { CreepMemoryHomeUpgrader, UpgraderRole } from "./types";

export const step = function (creepName: string) {
  const creep = Game.creeps[creepName];

  if (!creep) return;
  const memory = creep.memory as CreepMemoryHomeUpgrader;

  if (memory.pause) {
    memory.pause--;
    if (memory.pause < 0) {
      delete memory.pause;
    }
    return;
  }

  switch (memory.role) {
    case UpgraderRole.FindContainer:
    default:
      {
        if (memory.containerId) {
          const storage = Game.getObjectById(memory.containerId);
          if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 200) {
            memory.role = UpgraderRole.SuckEnergy;
          }
        }
        if (memory.role !== UpgraderRole.SuckEnergy) {
          delete memory.containerId;

          var containers = creep.room.find(FIND_STRUCTURES, {
            filter: m => m.structureType === STRUCTURE_CONTAINER && m.store.getUsedCapacity(RESOURCE_ENERGY) > 200
          });
          const container = creep.pos.findClosestByRange(containers);
          if (container) {
            memory.role = UpgraderRole.SuckEnergy;
            memory.containerId = container.id as Id<StructureContainer>;
          }
        }

        if (memory.role !== UpgraderRole.SuckEnergy) {
          memory.pause = 11;
        }
      }
      break;
    case UpgraderRole.SuckEnergy:
      if (memory.containerId) {
        const storage = Game.getObjectById(memory.containerId);
        if (storage) {
          if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage, {
              visualizePathStyle: { stroke: "#ffffff" }
            });
          }
        } else {
          memory.role = UpgraderRole.FindContainer;
        }

        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
          memory.role = UpgraderRole.UpgradeController;
        }
      } else {
        memory.role = UpgraderRole.FindContainer;
      }
      break;
    case UpgraderRole.UpgradeController:
      {
        const controller = creep.room.controller;
        if (controller) {
          if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller, { visualizePathStyle: { stroke: "#ffffff" } });
          }
        }

        if (creep.store[RESOURCE_ENERGY] === 0) {
          memory.role = UpgraderRole.FindContainer;
        }
      }
      break;
  }
};
