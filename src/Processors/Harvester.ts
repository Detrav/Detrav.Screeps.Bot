// const PROCESSOR_NAME = "harvester";

// // function containsKeeper(source: Source): boolean {
// //   const areaSize = 4;
// //   const area = source.room.lookAtArea(
// //     source.pos.y - areaSize,
// //     source.pos.x - areaSize,
// //     source.pos.y + areaSize,
// //     source.pos.x + areaSize,
// //     true
// //   );

// //   return _.any(
// //     area,
// //     tile =>
// //       (tile.type === "structure" && (<StructureKeeperLair>tile.structure).owner.username === "Source Keeper") ||
// //       (tile.type === "creep" && tile.creep?.owner.username === "Source Keeper")
// //   );
// // }

// function getCreepPowerByCapacity(spawn: StructureSpawn): BodyPartConstant[] {
//   if (spawn.room.energyCapacityAvailable >= 500) {
//     return [WORK, CARRY, CARRY, MOVE, MOVE];
//   } else {
//     return [WORK, CARRY, MOVE];
//   }
// }

// const processor: CreepProcessor = {
//   scan: function (spawnName: string) {
//     // const spawn = Game.spawns[spawnName];
//     // const structures = spawn.room.find(FIND_STRUCTURES, {
//     //   filter: structure => {
//     //     return structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN;
//     //   }
//     // });

//     // spawn.memory.energyCapacity = _.sum(structures, structure =>
//     //   (<StructureExtension>structure).store.getCapacity(RESOURCE_ENERGY)
//     // );
//   },
//   spawn: function (spawnName: string) {
//     const creeps = _.filter(
//       Game.creeps,
//       creep => creep.memory.processor == PROCESSOR_NAME && creep.memory.spawn == spawnName
//     );
//     const spawn = Game.spawns[spawnName];

//     const sources = spawn.room.find(FIND_SOURCES);

//     for (const sourceName in sources) {
//       let count = 1;
//       const source = sources[sourceName];
//       const flags = _.filter(source.room.lookAt(source), m => m.type == "flag");
//       if (flags.length && flags[0].flag) {
//         const flag = flags[0].flag;

//         count = +flag.name.substring(0, flag.name.indexOf("+"));
//       }

//       var creepsForSource = _.filter(creeps, creep => creep.memory.source === source.id);

//       if (creepsForSource.length < count) {
//         spawn.spawnCreep(getCreepPowerByCapacity(spawn), "Harvester" + Game.time, {
//           memory: {
//             processor: PROCESSOR_NAME,
//             spawn: spawnName,
//             source: source.id
//           }
//         });
//       }
//     }
//   },
//   step: function (creep: Creep) {
//     switch (creep.memory.role) {
//       case "upgrading":
//         if (!creep.room.controller || creep.store[RESOURCE_ENERGY] == 0) {
//           creep.memory.role = undefined;
//         } else {
//           if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
//             creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: "#ffffff" } });
//           }
//         }
//         break;
//       default:
//         if (creep.memory.source) {
//           if (creep.store.getFreeCapacity() > 0) {
//             var source = Game.getObjectById(creep.memory.source);
//             if (source) {
//               if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
//               }
//             }
//           } else {
//             var targets = creep.room.find(FIND_STRUCTURES, {
//               filter: structure => {
//                 return (
//                   (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
//                   structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
//                 );
//               }
//             });

//             if (targets.length) {
//               if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(targets[0], {
//                   visualizePathStyle: { stroke: "#ffffff" }
//                 });
//               }
//             } else {
//               creep.memory.role = "upgrading";
//             }
//           }
//         }
//         break;
//     }
//   }
// };

// const processors: CreepProcessors = {};
// processors[PROCESSOR_NAME] = processor;

// export default processors;
