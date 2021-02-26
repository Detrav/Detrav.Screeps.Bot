import { spawn } from "./spawn";
import { step } from "./step";

// function containsKeeper(source: Source): boolean {
//   const areaSize = 4;
//   const area = source.room.lookAtArea(
//     source.pos.y - areaSize,
//     source.pos.x - areaSize,
//     source.pos.y + areaSize,
//     source.pos.x + areaSize,
//     true
//   );

//   return _.any(
//     area,
//     tile =>
//       (tile.type === "structure" && (<StructureKeeperLair>tile.structure).owner.username === "Source Keeper") ||
//       (tile.type === "creep" && tile.creep?.owner.username === "Source Keeper")
//   );
// }

export const processor: CreepProcessor = {
  processorType: CreepProcessorTypes.HomeHarvester,
  priority: -1,
  config: function () {},
  room: function (roomName: string) {},
  spawn: spawn,
  step: step
};
