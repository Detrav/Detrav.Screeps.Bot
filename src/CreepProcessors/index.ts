import * as harvester from "./HomeHarvester";
import * as builder from "./HomeBuilder";
import * as homeExtPlacer from "./HomeExtentionPlacer";
import * as homeUpgrader from "./HomeUpgrader";
import * as homeFiller from "./HomeFiller";

const result: CreepProcessor[] = [];

result[harvester.processor.processorType] = harvester.processor;
result[builder.processor.processorType] = builder.processor;
result[homeExtPlacer.processor.processorType] = homeExtPlacer.processor;
result[homeUpgrader.processor.processorType] = homeUpgrader.processor;
result[homeFiller.processor.processorType] = homeFiller.processor;

export const processors = result;
export const processorsByPriority = _.sortBy(result, m => m.priority);
