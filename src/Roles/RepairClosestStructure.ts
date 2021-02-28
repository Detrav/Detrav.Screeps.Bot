export const hitsMultiplierLow = 0.9;
export const hitsMultiplierHigh = 0.95;

export const repairClosestStructure: CreepRoleTemplate = {
  role: CreepRoles.RepairClosestStructure,
  step: function (creep: Creep) {
    const memory = creep.memory;
    if (memory.pid) {
      const structure = Game.getObjectById(memory.pid as Id<Structure>);
      if (
        structure &&
        structure.hits < structure.hitsMax * hitsMultiplierHigh &&
        creep.store.getUsedCapacity(RESOURCE_ENERGY)
      ) {
        switch (creep.repair(structure)) {
          case ERR_NOT_IN_RANGE:
            creep.moveTo(structure, { visualizePathStyle: { stroke: "#ffaa00" } });
            break;
          case ERR_INVALID_TARGET:
            return StepResult.Stop;
        }
        return StepResult.Continue;
      }
    }
    return StepResult.Stop;
  },
  check: function (creep: Creep) {
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY)) {
      const structures = creep.room.find(FIND_STRUCTURES, { filter: m => m.hits < m.hitsMax * hitsMultiplierLow });
      const structure = creep.pos.findClosestByRange(structures);
      if (structure) {
        const memory = creep.memory;
        memory.pid = structures[0].id;
        return true;
      }
    }
    return false;
  }
};
