import { suckClosestContainer } from "Roles/SuckClosestContainer";
import { upgradeController } from "Roles/UpgradeController";

export const homeUpgrader: CreepProcessor = {
  priority: 1,
  processorType: CreepProcessorTypes.HomeUpgrader,
  creepSpawnTemplates: [
    {
      energy: 700,
      body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      creepCount: 2,
      levels: [3, 4, 5, 6, 7, 8]
    },
    { energy: 500, body: [WORK, WORK, CARRY, CARRY, MOVE], creepCount: 2, levels: [2, 3, 4, 5, 6, 7, 8] },
    { energy: 300, body: [WORK, CARRY, MOVE], creepCount: 2, levels: [2, 3, 4, 5, 6, 7, 8] }
  ],
  creepSpawnTemplatesCache: new Map<RoomLevel, CreepSpawnTemplate[]>(),
  roles: [upgradeController, suckClosestContainer],
  rolesCache: []
};
