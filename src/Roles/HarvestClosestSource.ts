export const harvestClosestSource: CreepRoleTemplate = {
  role: CreepRoles.HarvestClosestSource,
  step: function (creep: Creep) {
    const memory = creep.memory;
    if (memory.pid) {
      const source = Game.getObjectById(memory.pid as Id<Source>);
      if (!source) memory.role = CreepRoles.None;
      if (source) {
        switch (creep.harvest(source)) {
          case ERR_NOT_IN_RANGE:
            creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
            break;
          case ERR_INVALID_TARGET:
            return StepResult.Stop;
        }
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
          return StepResult.Stop;
        }
        return StepResult.Continue;
      }
    }
    return StepResult.Stop;
  },
  check: function (creep: Creep) {
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
      const sources = creep.room.find(FIND_SOURCES);
      const source = creep.pos.findClosestByRange(sources);
      if (source) {
        const memory = creep.memory;
        memory.pid = source.id;
        return true;
      }
    }
    return false;
  }
};
