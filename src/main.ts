import { processors } from "./Processors";

const global_period = 15;
const spawn = 0;
const scan = 1;

export const loop = function () {
  if ((Game.time + spawn) % global_period == 0) {
    for (let spawnName in Game.spawns) {
      for (let procName in processors) {
        processors[procName].spawn(spawnName);
      }
    }
  } else if (((Game.time + scan) % global_period) * 2 == 0) {
    for (let spawnName in Game.spawns) {
      for (let procName in processors) {
        processors[procName].scan(spawnName);
      }
    }
  }

  for (let creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    processors[creep.memory.processor].step(creep);
  }
};
