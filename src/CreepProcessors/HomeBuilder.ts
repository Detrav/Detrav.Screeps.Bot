import { buildClosestStructure } from "Roles/BuildClosestStructure";
import { pushEnergyToExtentions } from "Roles/PushEnergyToExtenstions";
import { repairClosestStructure } from "Roles/RepairClosestStructure";
import { suckClosestContainer } from "Roles/SuckClosestContainer";
import { upgradeController } from "Roles/UpgradeController";

export const homeBuilder: CreepProcessor = {
  priority: 1,
  processorType: CreepProcessorTypes.HomeBuilder,
  creepSpawnTemplates: [
    {
      energy: 700,
      body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      creepCount: 2,
      levels: [3, 4, 5, 6, 7, 8]
    },
    { energy: 500, body: [WORK, WORK, CARRY, CARRY, MOVE], creepCount: 2, levels: [2, 3, 4, 5, 6, 7, 8] },
    { energy: 300, body: [WORK, CARRY, MOVE], creepCount: 2, levels: [1, 2, 3, 4, 5, 6, 7, 8] }
  ],
  creepSpawnTemplatesCache: new Map<RoomLevel, CreepSpawnTemplate[]>(),
  roles: [buildClosestStructure, repairClosestStructure, upgradeController, suckClosestContainer],
  rolesCache: []
};
