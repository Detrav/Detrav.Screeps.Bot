// import { trySpawnCreep } from "utils/SpawnHelper";
// import { CreepMemoryHomeFiller, fillerCount, FillerRole } from "./types";

// const templates: CreepSpawnTemplate[] = [
//   // 100 50 50 50 50 = 300
//   { energy: 500, body: [WORK, CARRY, CARRY, CARRY, MOVE] }
// ];

// export const spawn = function (spawnName: string) {
//   const spawn = Game.spawns[spawnName];

//   if (spawn) {
//     for (let i = 0; i < fillerCount; i++) {
//       const creepName = CreepProcessorTypes.HomeFiller + "-" + i;
//       const creep = Game.creeps[creepName];

//       if (!creep) {
//         trySpawnCreep(spawn, templates, creepName, <CreepMemoryHomeFiller>{
//           processor: CreepProcessorTypes.HomeFiller,
//           role: FillerRole.SearchSource
//         });
//       }
//     }
//   }
// };
