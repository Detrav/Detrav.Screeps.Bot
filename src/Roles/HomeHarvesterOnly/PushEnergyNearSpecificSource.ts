import { HarvestSpecificSourceCreepMemory } from "./HarvestSpecificSource";
import { pushEnergyToExtentions } from "../PushEnergyToExtenstions";

export interface PushEnergyNearSpecificSourceCreepMemory extends HarvestSpecificSourceCreepMemory {
  containerId?: Id<StructureContainer>;
}

export const pushEnergyNearSpecificSource: CreepRoleTemplate = {
  role: CreepRoles.PushEnergyNearSpecificSource,
  step: (creep: Creep) => pushEnergyToExtentions.step(creep),
  check: function (creep: Creep) {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY)) {
      const memory = creep.memory as PushEnergyNearSpecificSourceCreepMemory;

      if (memory.containerId && Game.getObjectById(memory.containerId)) {
        memory.pid = memory.containerId;
        return true;
      } else {
        delete memory.containerId;
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
        const targets = _.filter(looks, m => m.structure?.structureType === STRUCTURE_CONTAINER);
        if (targets[0]) {
          memory.containerId = memory.pid = targets[0].structure?.id as Id<StructureContainer>;
          return true;
        }
      }
    }
    return false;
  }
};
