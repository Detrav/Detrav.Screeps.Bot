import { CreepTemplate, trySpawnCreep } from "utils/SpawnHelper";
import { builder_count } from "./types";

const templates: CreepTemplate[] = [
  { energy: 700, body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE] },
  { energy: 500, body: [WORK, WORK, CARRY, CARRY, MOVE] },
  { energy: 300, body: [WORK, CARRY, MOVE] }
];

export const spawn = function (spawnName: string) {
  const spawn = Game.spawns[spawnName];

  for (let i = 0; i < builder_count; i++) {
    const creepName = CreepProcessorTypes.HomeBuilder + "-" + i;
    const creep = Game.creeps[creepName];

    if (!creep) {
      trySpawnCreep(spawn, templates, creepName, {
        processor: CreepProcessorTypes.HomeBuilder
      });
    }
  }
};
