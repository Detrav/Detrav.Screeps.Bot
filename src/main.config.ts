import { processorsByPriority } from "CreepProcessors";

export const procConfigure = function (proc: CreepProcessor) {
  proc.creepSpawnTemplatesCache.clear();

  for (let template of proc.creepSpawnTemplates) {
    for (let roomLevel of template.levels) {
      let templates = proc.creepSpawnTemplatesCache.get(roomLevel) || [];
      templates.push(template);
      templates = _.sortBy(templates, m => -m.energy);
      proc.creepSpawnTemplatesCache.set(roomLevel, templates);
    }
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
