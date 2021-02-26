import { CreepTemplate, trySpawnCreep } from "utils/SpawnHelper";
import { builder_count, PROCESSOR_NAME } from "./types";

const templates: CreepTemplate[] = [
  { energy: 500, body: [WORK, WORK, CARRY, CARRY, MOVE] },
  { energy: 300, body: [WORK, CARRY, MOVE] }
];

export const spawn = function (spawnName: string) {
  const spawn = Game.spawns[spawnName];

  for (let i = 0; i < builder_count; i++) {
    const creepName = PROCESSOR_NAME + "-" + i;
    const creep = Game.creeps[creepName];

    if (!creep) {
      trySpawnCreep(spawn, templates, creepName, {
        processor: PROCESSOR_NAME
      });
    }
  }
};
