export const pushEnergyToExtentions: CreepRoleTemplate = {
  role: CreepRoles.PushEnergyToExtenstions,
  step: function (creep: Creep) {
    const memory = creep.memory;
    if (memory.pid) {
      const structure = Game.getObjectById(memory.pid as Id<StructureContainer>);
      if (
        structure &&
        structure.store &&
        creep.store.getUsedCapacity(RESOURCE_ENERGY) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY)
      ) {
        switch (creep.transfer(structure, RESOURCE_ENERGY)) {
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
      const storages = creep.room.find(FIND_STRUCTURES, {
        filter: m =>
          (m.structureType === STRUCTURE_EXTENSION || m.structureType === STRUCTURE_SPAWN) &&
          m.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      });
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
