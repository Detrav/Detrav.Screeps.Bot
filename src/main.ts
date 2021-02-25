import { creepProcessors } from "./Creeps";
import { globalProcessors } from "./Globals";

var notConfigurated = true;

export const loop = function () {
  if (notConfigurated) {
    for (let proc in creepProcessors) {
      creepProcessors[proc].config();
    }

    for (let proc in globalProcessors) {
      globalProcessors[proc].config();
    }
    notConfigurated = false;
  }

  for (let procName in globalProcessors) {
    const proc = globalProcessors[procName];

    if ((Game.time + proc.shift) % proc.period == 0) {
      globalProcessors[procName].step();
    }
  }

  for (let creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    creepProcessors[creep.memory.role].step(creep);
  }
};

// import { processors } from "./Processors";

// const global_period = 15;
// const spawn = 0;
// const scan = 1;

// export const loop = function () {
//   if ((Game.time + spawn) % global_period == 0) {
//     for (let spawnName in Game.spawns) {
//       for (let procName in processors) {
//         processors[procName].spawn(spawnName);
//       }
//     }
//   } else if (((Game.time + scan) % global_period) * 2 == 0) {
//     for (let spawnName in Game.spawns) {
//       for (let procName in processors) {
//         processors[procName].scan(spawnName);
//       }
//     }
//   }

//   for (let creepName in Game.creeps) {
//     const creep = Game.creeps[creepName];
//     processors[creep.memory.processor].step(creep);
//   }
// };
