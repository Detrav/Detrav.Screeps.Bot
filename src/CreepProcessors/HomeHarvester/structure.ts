import { planMake } from "utils/PlanMaker";

export const PROCESSOR_NAME = "home-harvester";

export const plan = planMake(`
  XXXXX
  X___X
  X_O_X
  X___X
  XXXXX
`);

export interface CreepMemoryHomeHarvest extends CreepMemory {
  source?: Id<Source>;
  role?: "upgrading" ;
  construct?: Id<ConstructionSite>;
  target?: Id<StructureContainer>;
}
