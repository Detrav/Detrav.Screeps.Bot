interface DetravCreepMemory extends CreepMemory {
  targetPos: RoomPosition;
  energyPos: RoomPosition;
}

export const harvester = {
  step: function (creep: Creep) {
    var memory = <DetravCreepMemory>creep.memory;

    if (creep.store.getFreeCapacity() > 0) {
      if (creep.harvest(<Source>{ pos: memory.energyPos }) == ERR_NOT_IN_RANGE) {
        creep.moveTo(memory.energyPos, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      if (creep.transfer(<Structure>{ pos: memory.targetPos }, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(memory.targetPos, {
          visualizePathStyle: { stroke: "#ffffff" }
        });
      }
    }
  }
};
