import { CreepTemplate, trySpawnCreep } from "utils/SpawnHelper";
import { CreepMemoryHomeFiller, fillerCount, FillerRole, PROCESSOR_NAME } from "./types";

const templates: CreepTemplate[] = [
  // 100 50 50 50 50 = 300
  { energy: 500, body: [WORK, CARRY, CARRY, CARRY, MOVE] },
  { energy: 300, body: [], noSpawn: true }
];

export const spawn = function (spawnName: string) {
  const spawn = Game.spawns[spawnName];

  if (spawn) {
    for (let i = 0; i < fillerCount; i++) {
      const creepName = PROCESSOR_NAME + "-" + i;
      const creep = Game.creeps[creepName];

      if (!creep) {
        trySpawnCreep(spawn, templates, creepName, <CreepMemoryHomeFiller>{
          processor: PROCESSOR_NAME,
          role: FillerRole.SearchSource
        });
      }
    }
  }
};
