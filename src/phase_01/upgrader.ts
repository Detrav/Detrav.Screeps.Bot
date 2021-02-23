interface UpgraderMemory extends CreepMemory {
  mode: string;
  targetPos: RoomPosition;
  energyPos: RoomPosition;
}

export const upgrader = {
  step: function (creep: Creep) {
    var memory = <UpgraderMemory>creep.memory;
    switch (memory.mode) {
      case "upgrade":
        if (creep.upgradeController(<StructureController>{ pos: memory.targetPos }) == ERR_NOT_IN_RANGE) {
          creep.moveTo(memory.targetPos, {
            visualizePathStyle: { stroke: "#ffffff" }
          });
        }

        if (creep.store[RESOURCE_ENERGY] == 0) {
          memory.mode = "harvest";
        }
        break;
      default:
        if (creep.harvest(<Source>{ pos: memory.energyPos }) == ERR_NOT_IN_RANGE) {
          creep.moveTo(memory.energyPos, { visualizePathStyle: { stroke: "#ffaa00" } });
        }
        if (creep.store.getFreeCapacity() == 0) {
          memory.mode = "upgrade";
        }
        break;
    }
  }
};
