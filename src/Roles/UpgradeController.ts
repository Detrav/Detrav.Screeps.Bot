export const upgradeController: CreepRoleTemplate = {
  role: CreepRoles.UpgradeController,
  step: function (creep: Creep) {
    //const memory = creep.memory;
    const controller = creep.room.controller;
    if (controller && creep.store.getUsedCapacity(RESOURCE_ENERGY)) {
      switch (creep.upgradeController(controller)) {
        case ERR_NOT_IN_RANGE:
          creep.moveTo(controller, { visualizePathStyle: { stroke: "#ffaa00" } });
          break;
        case ERR_INVALID_TARGET:
          return StepResult.Stop;
      }
      return StepResult.Continue;
    }
    return StepResult.Stop;
  },
  check: function (creep: Creep) {
    return !!(creep.store.getUsedCapacity(RESOURCE_ENERGY) && creep.room.controller?.my);
  }
};
