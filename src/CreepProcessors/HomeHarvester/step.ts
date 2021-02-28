// import { CreepMemoryHomeHarvest, HarvesterRole } from "./types";

// export const step = function (creep: Creep) {
//   const memory = creep.memory as CreepMemoryHomeHarvest;

//   switch (memory.role) {
//     case HarvesterRole.RepairTarget:
//       {
//         if (memory.target) {
//           const target = Game.getObjectById(memory.target);
//           if (target) {
//             if (creep.repair(target) == ERR_NOT_IN_RANGE) {
//               creep.moveTo(target, {
//                 visualizePathStyle: { stroke: "#ffffff" }
//               });
//             }

//             if (target.hits >= target.hitsMax) {
//               memory.role = HarvesterRole.PushToTarget;
//             }
//           } else {
//             delete memory.target;
//             memory.role = HarvesterRole.SearchTarget;
//           }
//         } else {
//           memory.role = HarvesterRole.SearchTarget;
//         }

//         if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
//           memory.role = HarvesterRole.PullFromSource;
//         }
//       }
//       break;
//     case HarvesterRole.BuildConstruct:
//       {
//         if (memory.construct) {
//           const construct = Game.getObjectById(memory.construct);
//           if (construct) {
//             if (creep.build(construct) == ERR_NOT_IN_RANGE) {
//               creep.moveTo(construct, {
//                 visualizePathStyle: { stroke: "#ffffff" }
//               });
//             }
//           } else {
//             delete memory.construct;
//             memory.role = HarvesterRole.SearchTarget;
//           }
//         }

//         if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
//           memory.role = HarvesterRole.PullFromSource;
//         }
//       }
//       break;
//     case HarvesterRole.PushToTarget:
//       {
//         if (memory.target) {
//           const target = Game.getObjectById(memory.target);
//           if (target) {
//             if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//               creep.moveTo(target, {
//                 visualizePathStyle: { stroke: "#ffffff" }
//               });
//             }
//           } else {
//             delete memory.target;
//             memory.role = HarvesterRole.SearchTarget;
//           }
//         } else {
//           memory.role = HarvesterRole.SearchTarget;
//         }

//         if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
//           memory.role = HarvesterRole.PullFromSource;
//         }
//       }
//       break;
//     case HarvesterRole.SearchTarget:
//       {
//         if (memory.target) {
//           const container = Game.getObjectById(memory.target);
//           if (container) {
//             if (container.hits < container.hitsMax) {
//               memory.role = HarvesterRole.RepairTarget;
//             } else {
//               memory.role = HarvesterRole.PushToTarget;
//             }
//           } else {
//             delete memory.target;
//           }
//         } else if (memory.construct) {
//           memory.role = HarvesterRole.BuildConstruct;
//         } else {
//           var source = Game.getObjectById(memory.source);
//           if (source) {
//             var looks = source.room.lookAtArea(
//               source.pos.y - 2,
//               source.pos.x - 2,
//               source.pos.y + 2,
//               source.pos.x + 2,
//               true
//             );

//             const constructs = _.filter(looks, m => m.constructionSite?.structureType == STRUCTURE_CONTAINER);
//             if (constructs.length) {
//               memory.construct = constructs[0].constructionSite?.id;
//               memory.role = HarvesterRole.BuildConstruct;
//             } else {
//               const targets = _.filter(looks, m => m.structure?.structureType == STRUCTURE_CONTAINER);
//               if (targets.length) {
//                 const structure = <StructureContainer>targets[0].structure;
//                 if (structure) {
//                   memory.target = structure.id;

//                   if (structure.hits < structure.hitsMax) {
//                     memory.role = HarvesterRole.RepairTarget;
//                   } else {
//                     memory.role = HarvesterRole.PushToTarget;
//                   }
//                 }
//               }
//             }
//           }
//         }

//         if (memory.role === HarvesterRole.SearchTarget) {
//           memory.pause = 11;
//         }
//       }
//       break;
//     case HarvesterRole.PullFromSource:
//     default:
//       {
//         var source = Game.getObjectById(memory.source);
//         if (source) {
//           if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//             creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
//           }
//         }
//         if (creep.store.getFreeCapacity() === 0) {
//           memory.role = HarvesterRole.SearchTarget;
//         }
//       }
//       break;
//   }
// };
