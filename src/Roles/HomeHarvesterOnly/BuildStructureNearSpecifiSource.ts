import { buildClosestStructure } from "../BuildClosestStructure";
import { PushEnergyNearSpecificSourceCreepMemory } from "./PushEnergyNearSpecificSource";

interface BuildStructureNearSpecifiSourceCreepMemory extends PushEnergyNearSpecificSourceCreepMemory {
  site?: Id<ConstructionSite>;
}

export const buildStructureNearSpecifiSource: CreepRoleTemplate = {
  role: CreepRoles.BuildStructureNearSpecifiSource,
  step: (creep: Creep) => buildClosestStructure.step(creep),
  check: function (creep: Creep) {
    const memory = creep.memory as BuildStructureNearSpecifiSourceCreepMemory;
    if (memory.containerId) return false;
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY)) {
      if (memory.site && Game.getObjectById(memory.site)) {
        memory.pid = memory.site;
        return true;
      } else {
        delete memory.site;
      }

      const source = Game.getObjectById(memory.sourceId);
      if (source) {
        var looks = source.room.lookAtArea(
          source.pos.y - 2,
          source.pos.x - 2,
          source.pos.y + 2,
          source.pos.x + 2,
          true
        );
        const targets = _.filter(looks, m => m.constructionSite?.structureType === STRUCTURE_CONTAINER);
        if (targets[0]) {
          memory.site = memory.pid = targets[0].constructionSite?.id as Id<ConstructionSite>;
          return true;
        }
      }
    }
    return false;
  }
};
