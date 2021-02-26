export enum UpgraderRole {
  FindContainer = 1,
  SuckEnergy = 2,
  UpgradeController = 3
}

export const upgraderCount = 2;

export interface CreepMemoryHomeUpgrader extends CreepMemory {
  role: UpgraderRole;
  containerId?: Id<StructureContainer>;
}
