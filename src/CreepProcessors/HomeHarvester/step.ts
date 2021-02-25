import { CreepMemoryHomeHarvest } from "./structure";

export const step = function (creepName: string) {
  const creep = Game.creeps[creepName];
  if (!creep) return;
  const memory = creep.memory as CreepMemoryHomeHarvest;
  switch (memory.role) {
    case "upgrading":
      if (memory.target) {
        const target = Game.getObjectById(memory.target);
        if (target) {
          if (target.hits < target.hitsMax) {
            if (creep.repair(target) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target, {
                visualizePathStyle: { stroke: "#ffffff" }
              });
            }
          }
          if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
              visualizePathStyle: { stroke: "#ffffff" }
            });
          }
        } else {
          memory.target = undefined;
        }
      } else if (memory.construct) {
        const target = Game.getObjectById(memory.construct);
        if (target) {
          if (creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
              visualizePathStyle: { stroke: "#ffffff" }
            });
          }
        } else {
          memory.construct = undefined;
        }
      } else if (memory.source) {
        var source = Game.getObjectById(memory.source);
        if (source) {
          var looks = source.room.lookAtArea(
            source.pos.y - 2,
            source.pos.x - 2,
            source.pos.y + 2,
            source.pos.x + 2,
            true
          );

          const constructs = _.filter(looks, m => m.constructionSite?.structureType == STRUCTURE_CONTAINER);
          if (constructs.length) {
            memory.construct = constructs[0].constructionSite?.id;
          } else {
            const targets = _.filter(looks, m => m.structure?.structureType == STRUCTURE_CONTAINER);
            if (targets.length) {
              memory.target = targets[0].structure?.id as Id<StructureContainer>;
            }
          }
        }
      }

      if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
        memory.role = undefined;
      }
      break;
    default:
      if (memory.source) {
        if (creep.store.getFreeCapacity() > 0) {
          var source = Game.getObjectById(memory.source);
          if (source) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
              creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
            }
          }
        } else {
          memory.role = "upgrading";
        }
      }
      break;
  }
};
