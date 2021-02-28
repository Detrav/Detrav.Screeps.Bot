import { harvestClosestSource } from "../HarvestClosestSource";

export interface HarvestSpecificSourceCreepMemory extends CreepMemory {
  sourceId: Id<Source>;
}

export const harvestSpecificSource: CreepRoleTemplate = {
  role: CreepRoles.HarvestSpecificSource,
  step: (creep: Creep) => harvestClosestSource.step(creep),
  check: function (creep: Creep) {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
      const memory = creep.memory as HarvestSpecificSourceCreepMemory;
      const source = Game.getObjectById(memory.sourceId);
      if (source) {
        memory.pid = source.id;
        return true;
      }
    }
    return false;
  }
};
