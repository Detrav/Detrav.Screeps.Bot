import { processorsByPriority } from "CreepProcessors";
import { format } from "path";

const detravAgesList: DetravAges[] = [];

detravAgesList[0] = DetravAges.No;
detravAgesList[1] = DetravAges.T1;
detravAgesList[2] = DetravAges.T2;
detravAgesList[3] = DetravAges.T3;

const getAgeIndexByEnergy = function (energy: number): number {
  for (let i = detravAgesList.length - 1; i >= 0; i--) {
    if (detravAgesList[i] < energy) return i;
  }
  return 0;
};

const spawnOne = function (spawn: StructureSpawn, proc: CreepProcessor, template: CreepSpawnTemplate): boolean {
  for (let i = 0; i < template.creepCount; i++) {
    const name = proc.processorType + "-" + spawn.name + "-" + i;
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

const foreachSpawn = function (age: DetravAges, spawn: StructureSpawn) {
  for (let proc of processorsByPriority) {
    const template = proc.creepSpawnTemplatesCache[age];
    if (template) {
      if (proc.customSpawn) {
        if (proc.customSpawn(spawn, template)) return;
      } else {
        if (spawnOne(spawn, proc, template)) return;
      }
    }
  }
};

const tryForeachSpawn = function (spawn: StructureSpawn, energy: number) {
  for (let proc of processorsByPriority) {
    for (let template of proc.creepSpawnTemplates) {
      console.log(proc.processorType);
      if (energy >= template.energy) {
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
      const age = getAgeIndexByEnergy(energyCap);
      const energy = spawn.room.energyAvailable;
      if (detravAgesList[age] < energy) {
        foreachSpawn(detravAgesList[age], spawn);
        spawn.memory.sleep = 20;
      } else {
        spawn.memory.sleep = sleep - 1;
      }
    } else {
      tryForeachSpawn(spawn, spawn.room.energyAvailable);
      spawn.memory.sleep = 20;
    }
  }
};

export const procSpawns = function () {
  for (let spawnName in Game.spawns) {
    procSpawn(spawnName);
  }
};
