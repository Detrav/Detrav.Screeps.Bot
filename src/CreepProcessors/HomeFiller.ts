import { pushEnergyToExtentions } from "Roles/PushEnergyToExtenstions";
import { suckClosestContainer } from "Roles/SuckClosestContainer";

export const homefiller: CreepProcessor = {
  priority: 1,
  processorType: CreepProcessorTypes.HomeFiller,
  creepSpawnTemplates: [
    { energy: 700, age: DetravAges.T3, body: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepCount: 1 },
    { energy: 300, age: DetravAges.T2, body: [WORK, CARRY, CARRY, CARRY, MOVE], creepCount: 1 },
    { energy: 250, age: DetravAges.T1, body: [WORK, CARRY, MOVE], creepCount: 0 }
  ],
  creepSpawnTemplatesCache: [],
  roles: [pushEnergyToExtentions, suckClosestContainer],
  rolesCache: []
};
