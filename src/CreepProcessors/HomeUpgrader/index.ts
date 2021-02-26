import { spawn } from "./spawn";
import { step } from "./step";

export const processor: CreepProcessor = {
  processorType: CreepProcessorTypes.HomeUpgrader,
  priority: 3,
  config: function () {},
  room: function (roomName: string) {},
  spawn: spawn,
  step: step
};
