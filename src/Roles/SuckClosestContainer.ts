export interface WithContainerCreepMemory extends CreepMemory {
  containerId?: Id<StructureContainer>;
}

export const suckClosestContainer: CreepRoleTemplate = {
  role: CreepRoles.SuckClosestContainer,
  step: function (creep: Creep) {
    const memory = creep.memory;
    if (memory.pid) {
      const storage = Game.getObjectById(memory.pid as Id<StructureContainer>);
      if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) && creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
        switch (creep.withdraw(storage, RESOURCE_ENERGY)) {
          case ERR_NOT_IN_RANGE:
            creep.moveTo(storage, { visualizePathStyle: { stroke: "#ffaa00" } });
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
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
      const memory = creep.memory as WithContainerCreepMemory;
      if (memory.containerId) {
        const container = Game.getObjectById(memory.containerId);
        if (container && container.store.getUsedCapacity(RESOURCE_ENERGY) > 200) {
          memory.pid = container.id;
          return true;
        }
      }
      delete memory.containerId;

      const storages = creep.room.find(FIND_STRUCTURES, {
        filter: m => m.structureType === STRUCTURE_CONTAINER && m.store.getUsedCapacity(RESOURCE_ENERGY) > 200
      });
      const storage = creep.pos.findClosestByRange(storages);
      if (storage) {
        memory.pid = memory.containerId = storage.id as Id<StructureContainer>;
        return true;
      }
    }
    return false;
  }
};
