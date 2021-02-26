import { planMake } from "utils/PlanMaker";

export const plan = planMake(`
  XXXXX
  X___X
  X_O_X
  X___X
  XXXXX
`);

export enum HarvesterRole {
  PullFromSource = 2,
  SearchTarget = 3,
  BuildConstruct = 4,
  RepairTarget = 5,
  PushToTarget = 6
}

export interface CreepMemoryHomeHarvest extends CreepMemory {
  source: Id<Source>;
  role: HarvesterRole;
  construct?: Id<ConstructionSite>;
  target?: Id<StructureContainer>;
}
