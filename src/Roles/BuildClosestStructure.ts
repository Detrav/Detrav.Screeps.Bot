export const buildClosestStructure: CreepRoleTemplate = {
  role: CreepRoles.BuildClosestStructure,
  step: function (creep: Creep) {
    const memory = creep.memory;
    if (memory.pid) {
      const site = Game.getObjectById(memory.pid as Id<ConstructionSite>);
      if (site && creep.store.getUsedCapacity(RESOURCE_ENERGY)) {
        switch (creep.build(site)) {
          case ERR_NOT_IN_RANGE:
            creep.moveTo(site, { visualizePathStyle: { stroke: "#ffaa00" } });
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
      const storages = creep.room.find(FIND_CONSTRUCTION_SITES);
      const storage = creep.pos.findClosestByRange(storages);
      if (storage) {
        const memory = creep.memory;
        memory.pid = storage.id;
        return true;
      }
    }
    return false;
  }
};
