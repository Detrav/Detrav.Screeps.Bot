// import { plan } from "./types";

// let time = 0;

// export const spawn = function (spawnName: string) {
//   if (time % 3 == 0) {
//     const spawn = Game.spawns[spawnName];

//     const roomLevel = spawn.room.controller?.level;
//     let extentions = 0;
//     if (!roomLevel || roomLevel < 2) {
//       extentions = 0;
//     } else if (roomLevel < 3) {
//       extentions = 5;
//     } else if (roomLevel < 4) {
//       extentions = 10;
//     } else {
//       extentions = 20;
//     }

//     let lastPlanPoint = 0;

//     for (let i = 0; i < extentions; i++) {
//       for (lastPlanPoint; lastPlanPoint < plan.length; lastPlanPoint++) {
//         const point = plan[lastPlanPoint];

//         const look = spawn.room.lookAt(spawn.pos.x + point.x, spawn.pos.y + point.y);
//         if (look.length === 1 && look[0].type === LOOK_TERRAIN && look[0].terrain === "plain") {
//           spawn.room.createConstructionSite(spawn.pos.x + point.x, spawn.pos.y + point.y, STRUCTURE_EXTENSION);
//           lastPlanPoint++;
//           break;
//         } else if (_.any(look, m => m.type === LOOK_STRUCTURES && m.structure?.structureType === STRUCTURE_EXTENSION)) {
//           lastPlanPoint++;
//           break;
//         }
//       }
//     }
//   }
//   time++;
// };
