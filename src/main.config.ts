import { processorsByPriority } from "CreepProcessors";

export const procConfigure = function (proc: CreepProcessor) {
  proc.creepSpawnTemplatesCache = [];
  for (let template of proc.creepSpawnTemplates) {
    proc.creepSpawnTemplatesCache[template.age] = template;
  }
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
