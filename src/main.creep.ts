import { processors } from "CreepProcessors";

export const procStep = function (creep: Creep, proc: CreepProcessor) {
  if (creep.spawning) return;
  if (creep.memory.role) {
    if (proc.rolesCache[creep.memory.role].step(creep)) {
      creep.memory.role = CreepRoles.None;
    }
    return;
  }
  for (let role of proc.roles) {
    if (role.check(creep)) {
      creep.memory.role = role.role;
      return;
    }
  }
  creep.memory.pause = 11;
};

export const procCreeps = function () {
  for (let creepName in Memory.creeps) {
    const memory = Memory.creeps[creepName];
    if (memory.pause && memory.pause > 0) {
      memory.pause--;
      if (memory.pause < 0) {
        delete memory.pause;
      }
      continue;
    }

    const creep = Game.creeps[creepName];
    if (creep) {
      const proc = processors[memory.processor];
      if (proc) {
        procStep(creep, proc);
      } else {
        delete Memory.creeps[creepName];
      }
    } else {
      delete Memory.creeps[creepName];
    }
  }
};
