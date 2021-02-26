import { step } from "./step";
import { spawn } from "./spawn";

export const processor: CreepProcessor = {
  processorType: CreepProcessorTypes.HomeBuilder,
  priority: 5,
  config: function () {},
  room: function (roomName: string) {},
  spawn: spawn,
  step: step
};
