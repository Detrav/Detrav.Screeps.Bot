import { processors, processorsByPriority } from "./CreepProcessors";

const global_period = processorsByPriority.length + 10;

for (let proc of processorsByPriority) {
  console.log(proc.processorName);
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

    for (let creepName in Memory.creeps) {
      processors[Memory.creeps[creepName].processor].scan(creepName);
    }
  }

  for (let creepName in Memory.creeps) {
    processors[Memory.creeps[creepName].processor].step(creepName);
  }
};
