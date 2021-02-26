import { BuilderRole, CreepMemoryHomeBuilder } from "./types";

export const step = function (creep: Creep) {
  const memory = creep.memory as CreepMemoryHomeBuilder;

  switch (memory.role) {
    case BuilderRole.BuildStructure:
      if (memory.construction) {
        const obj = Game.getObjectById(memory.construction);
        if (obj) {
          if (creep.build(obj) == ERR_NOT_IN_RANGE) {
            creep.moveTo(obj, { visualizePathStyle: { stroke: "#ffffff" } });
          }
        } else {
          delete memory.construction;
          memory.role = BuilderRole.FindRole;
        }
      } else {
        delete memory.construction;
        memory.role = BuilderRole.FindRole;
      }

      if (creep.store[RESOURCE_ENERGY] === 0) {
        memory.role = BuilderRole.FindContainer;
      }
      break;

    case BuilderRole.RepairStructure:
      if (memory.structure) {
        const obj = Game.getObjectById(memory.structure);
        if (obj) {
          if (creep.repair(obj) == ERR_NOT_IN_RANGE) {
            creep.moveTo(obj, { visualizePathStyle: { stroke: "#ffffff" } });
          }

          if (obj.hits >= obj.hitsMax) {
            delete memory.structure;
            memory.role = BuilderRole.FindRole;
          }
        } else {
          delete memory.structure;
          memory.role = BuilderRole.FindRole;
        }
      } else {
        delete memory.structure;
        memory.role = BuilderRole.FindRole;
      }

      if (creep.store[RESOURCE_ENERGY] === 0) {
        memory.role = BuilderRole.FindContainer;
      }
      break;

    case BuilderRole.UpgradeController:
      const controller = creep.room.controller;
      if (controller) {
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(controller, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }

      if (creep.store[RESOURCE_ENERGY] === 0) {
        memory.role = BuilderRole.FindContainer;
      }
      break;
    case BuilderRole.FindRole:
      {
        if (creep.store[RESOURCE_ENERGY] === 0) {
          memory.role = BuilderRole.FindContainer;
          break;
        }

        if (memory.construction) {
          const obj = Game.getObjectById(memory.construction);
          if (obj) {
            memory.role = BuilderRole.BuildStructure;
            break;
          } else {
            delete memory.construction;
          }
        }

        if (memory.structure) {
          const obj = Game.getObjectById(memory.structure);
          if (obj) {
            memory.role = BuilderRole.RepairStructure;
            break;
          } else {
            delete memory.structure;
          }
        }

        const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (constructionSites.length) {
          memory.construction = constructionSites[0].id;
          memory.role = BuilderRole.BuildStructure;
          break;
        }

        const structures = creep.room.find(FIND_STRUCTURES, { filter: m => m.hits < m.hitsMax });
        if (structures.length) {
          memory.structure = structures[0].id;
          memory.role = BuilderRole.RepairStructure;
          break;
        }

        memory.role = BuilderRole.UpgradeController;
      }
      break;
    case BuilderRole.SuckEnergy:
      if (memory.containerId) {
        const storage = Game.getObjectById(memory.containerId);
        if (storage) {
          if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storage, {
              visualizePathStyle: { stroke: "#ffffff" }
            });
          }
        } else {
          memory.role = BuilderRole.FindContainer;
        }

        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
          memory.role = BuilderRole.FindRole;
        }
      } else {
        memory.role = BuilderRole.FindContainer;
      }
      break;
    case BuilderRole.FindContainer:
    default:
      {
        if (memory.containerId) {
          const storage = Game.getObjectById(memory.containerId);
          if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 200) {
            memory.role = BuilderRole.SuckEnergy;
          }
        }
        if (memory.role !== BuilderRole.SuckEnergy) {
          delete memory.containerId;

          var containers = creep.room.find(FIND_STRUCTURES, {
            filter: m => m.structureType === STRUCTURE_CONTAINER && m.store.getUsedCapacity(RESOURCE_ENERGY) > 200
          });
          const container = creep.pos.findClosestByRange(containers);
          if (container) {
            memory.role = BuilderRole.SuckEnergy;
            memory.containerId = container.id as Id<StructureContainer>;
          }
        }

        if (memory.role !== BuilderRole.SuckEnergy) {
          memory.pause = 11;
        }
      }
      break;
  }
};
