import { spawn } from "./spawn";
import { PROCESSOR_NAME } from "./types";


const processor: CreepProcessor = {
  config: function () {},
  processorName: PROCESSOR_NAME,
  priority: 1,
  scan: function (creepName: string) {},
  spawn: spawn,
  step: function (creepName: string) {},
  room: function (roomName: string) {}
};

export const processors: CreepProcessor[] = [processor];
