import { processors, processorsByPriority } from "./CreepProcessors";

const global_period = processorsByPriority.length + 10;

for (let proc of processorsByPriority) {
  console.log(proc.processorType);
}

export const loop = function () {
  const number = Game.time % global_period;

  if (number < processorsByPriority.length) {
    const proc = processorsByPriority[number];

    proc.config();

    for (let spawnName in Game.spawns) {
      proc.spawn(spawnName);
    }
    for (let roomName in Game.rooms) {
      proc.room(roomName);
    }
  }

  for (let creepName in Memory.creeps) {
    // lets pause
    const memory = Memory.creeps[creepName];
    if (memory.pause) {
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
        proc.step(creep);
      } else {
        delete Memory.creeps[creepName];
      }
    } else {
      delete Memory.creeps[creepName];
    }
  }
};
