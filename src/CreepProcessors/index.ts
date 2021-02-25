import * as harvester from "./HomeHarvester";
import * as builder from "./HomeBuilder";
import * as homeExtPlacer from "./HomeExtentionPlacer";
import * as homeUpgrader from "./HomeUpgrader";

const result: CreepProcessors = {};

function copyProcessors(from: CreepProcessor[], to: CreepProcessors) {
  for (let value of from) {
    to[value.processorName] = value;
  }
}

copyProcessors(harvester.processors, result);
copyProcessors(builder.processors, result);
copyProcessors(homeExtPlacer.processors, result);
copyProcessors(homeUpgrader.processors, result);

export const processors = result;
export const processorsByPriority = _.sortBy(Object.values(result), m => m.priority);
