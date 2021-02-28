import { suckClosestContainer } from "Roles/SuckClosestContainer";
import { upgradeController } from "Roles/UpgradeController";

export const homeUpgrader: CreepProcessor = {
  priority: 1,
  processorType: CreepProcessorTypes.HomeUpgrader,
  creepSpawnTemplates: [
    { energy: 700, age: DetravAges.T3, body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepCount: 2 },
    { energy: 500, age: DetravAges.T2, body: [WORK, WORK, CARRY, CARRY, MOVE], creepCount: 2 },
    { energy: 300, age: DetravAges.T1, body: [WORK, CARRY, MOVE], creepCount: 2 }
  ],
  creepSpawnTemplatesCache: [],
  roles: [upgradeController, suckClosestContainer],
  rolesCache: []
};
