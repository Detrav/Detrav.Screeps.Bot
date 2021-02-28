import { hitsMultiplierLow, repairClosestStructure } from "../RepairClosestStructure";
import { PushEnergyNearSpecificSourceCreepMemory } from "./PushEnergyNearSpecificSource";

export const repairStructureNearSpecificSource: CreepRoleTemplate = {
  role: CreepRoles.RepairStructureNearSpecificSource,
  step: (creep: Creep) => repairClosestStructure.step(creep),
  check: function (creep: Creep) {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY)) {
      const memory = creep.memory as PushEnergyNearSpecificSourceCreepMemory;
      if (memory.containerId) {
        const container = Game.getObjectById(memory.containerId);
        if (container && container.hits < container.hitsMax * hitsMultiplierLow) {
          memory.pid = memory.containerId;
          return true;
        }
      }
    }
    return false;
  }
};
