import { spawn } from "./spawn";
import { step } from "./step";
import { PROCESSOR_NAME } from "./structure";

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

const processor: CreepProcessor = {
  processorName: PROCESSOR_NAME,
  priority: 0,
  config: function () {},
  room: function (roomName: string) {},
  scan: function (creepName: string) {},
  spawn: spawn,
  step: step
};

export const processors: CreepProcessor[] = [processor];
