export enum FillerRole {
  SearchSource = 1,
  PullFromSource = 2,
  SearchTarget = 3,
  PushToTarget = 4
}

export interface CreepMemoryHomeFiller extends CreepMemory {
  role: FillerRole;
  pid?: string;
  pause?: number;
}

export const fillerCount = 1;
