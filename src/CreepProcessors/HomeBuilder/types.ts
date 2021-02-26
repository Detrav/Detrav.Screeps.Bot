export const PROCESSOR_NAME = "home-builder";

export const builder_count = 2;

export enum BuilderRole {
  FindContainer = 1,
  SuckEnergy = 2,
  FindRole = 3,
  BuildStructure = 4,
  RepairStructure = 5,
  UpgradeController = 6
}

export interface CreepMemoryHomeBuilder extends CreepMemory {
  role: BuilderRole;
  containerId?: Id<StructureContainer>;
  pause?: number;
  construction?: Id<ConstructionSite>;
  structure?: Id<Structure>;
}
