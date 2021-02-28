import { processorsByPriority } from "CreepProcessors";

const spawnOne = function (spawn: StructureSpawn, proc: CreepProcessor, template: CreepSpawnTemplate): boolean {
  for (let i = 0; i < template.creepCount; i++) {
    const name = proc.processorType + "-" + spawn.room.name + "-" + i;
    if (!Game.creeps[name]) {
      return (
        spawn.spawnCreep(template.body, name, {
          memory: {
            processor: proc.processorType
          }
        }) === OK
      );
    }
  }
  return false;
};

const foreachSpawn = function (spawn: StructureSpawn, energy: number) {
  const level = spawn.room.controller?.level || 0;

  for (let proc of processorsByPriority) {
    const templates = proc.creepSpawnTemplatesCache.get(level);
    if (templates) {
      for (let template of templates) {
        if (template.energy > energy) continue;
        if (proc.customSpawn) {
          if (proc.customSpawn(spawn, template)) return;
        } else {
          if (spawnOne(spawn, proc, template)) return;
        }
      }
    }
  }
};

export const procSpawn = function (spawnName: string) {
  const spawn = Game.spawns[spawnName];

  if (spawn) {
    const sleep = spawn.memory.sleep;
    if (sleep && sleep > 0) {
      const energyCap: number = spawn.room.energyCapacityAvailable;
      const energy = spawn.room.energyAvailable;
      if (energy >= energyCap) {
        foreachSpawn(spawn, energy);
        spawn.memory.sleep = 20;
      } else {
        spawn.memory.sleep = sleep - 1;
      }
    } else {
      const energy = spawn.room.energyAvailable;
      foreachSpawn(spawn, energy);
      spawn.memory.sleep = 20;
    }
  }
};

export const procSpawns = function () {
  for (let spawnName in Game.spawns) {
    procSpawn(spawnName);
  }
};
