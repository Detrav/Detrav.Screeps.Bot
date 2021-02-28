// enum of all processors
declare const enum CreepProcessorTypes {
  HomeBuilder = 0,
  HomeExtentionPlacer = 1,
  HomeFiller = 2,
  HomeHarvester = 3,
  HomeUpgrader = 4
}

// enum of all creep roles
declare const enum CreepRoles {
  None = 0,
  HarvestClosestSource = 10,
  BuildClosestStructure = 11,
  RepairClosestStructure = 12,
  PushEnergyToExtenstions = 13,
  UpgradeController = 14,
  HarvestSpecificSource = 15,
  PushEnergyNearSpecificSource = 16,
  BuildStructureNearSpecifiSource = 17,
  RepairStructureNearSpecificSource = 18,
  PlaceContainerNearSpecificSource = 19,
  SuckClosestContainer = 20
}

// old processor
// interface CreepProcessor {
//   processorType: CreepProcessorTypes;
//   priority: number;
//   config: () => void;
//   step: (creep: Creep) => void;
//   spawn: (spawnName: string) => void;
//   room: (roomName: string) => void;
// }

declare const enum RoomLevel {
  No = 0,
  T1 = 1,
  T2 = 2,
  T3 = 3,
  T4 = 4,
  T5 = 5,
  T6 = 6,
  T7 = 7,
  T8 = 8
}

declare const enum StepResult {
  Continue = 0,
  Stop = 1
}

// template for creep processor
interface CreepProcessor {
  processorType: CreepProcessorTypes;
  priority: number;
  // list of all templates for spawn
  creepSpawnTemplates: CreepSpawnTemplate[];
  // auto fill property
  creepSpawnTemplatesCache: Map<RoomLevel, CreepSpawnTemplate[]>;
  // list of all available roles
  roles: CreepRoleTemplate[];
  // auto fill property
  rolesCache: CreepRoleTemplate[];
  // custom spawnFunction no creepCount used for it
  customSpawn?: (spawn: StructureSpawn, template: CreepSpawnTemplate) => boolean;
}

// template for role
interface CreepRoleTemplate {
  role: CreepRoles;
  step: (creep: Creep) => StepResult;
  check: (creep: Creep) => boolean;
}

// template for
interface CreepSpawnTemplate {
  energy: number;
  body: BodyPartConstant[];
  creepCount: number;
  levels: RoomLevel[];
}
