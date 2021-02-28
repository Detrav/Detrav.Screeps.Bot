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
  creepSpawnTemplatesCache: CreepSpawnTemplate[];
  // list of all available roles
  roles: CreepRoleTemplate[];
  // auto fill property
  rolesCache: CreepRoleTemplate[];
  // custom spawnFunction no creepCount used for it
  customSpawn?: (spawn: StructureSpawn, template: CreepSpawnTemplate) => boolean;
  spawnAllowed?: (spawn: StructureSpawn) => boolean;
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
}
