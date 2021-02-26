import { step } from "./step";
import { spawn } from "./spawn";
import { PROCESSOR_NAME } from "./types";

const processor: CreepProcessor = {
  processorName: PROCESSOR_NAME,
  priority: 5,
  config: function () {},
  room: function (roomName: string) {},
  scan: function (creepName: string) {},
  spawn: spawn,
  step: step
};
export const processors: CreepProcessor[] = [processor];
