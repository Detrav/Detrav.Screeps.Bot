import { homeBuilder } from "./HomeBuilder";
import { homefiller } from "./HomeFiller";
import { homeHarvester } from "./HomeHarvester";
import { homeUpgrader } from "./HomeUpgrader";

const allProcessors: CreepProcessor[] = [homeHarvester, homeUpgrader, homeBuilder, homefiller];

const result: CreepProcessor[] = [];

for (let proc of allProcessors) {
  result[proc.processorType] = proc;
}

export const processors = result;
export const processorsByPriority = _.sortBy(allProcessors, m => m.priority);
