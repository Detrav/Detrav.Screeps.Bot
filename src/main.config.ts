import { processorsByPriority } from "CreepProcessors";

export const procConfigure = function (proc: CreepProcessor) {
  proc.creepSpawnTemplatesCache = _.sortBy(proc.creepSpawnTemplates, m => -m.energy);
  proc.rolesCache = [];

  for (let role of proc.roles) {
    proc.rolesCache[role.role] = role;
  }
};

export const procConfigures = function () {
  for (let proc of processorsByPriority) {
    procConfigure(proc);
  }
};
