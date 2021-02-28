import { buildClosestStructure } from "Roles/BuildClosestStructure";
import { pushEnergyToExtentions } from "Roles/PushEnergyToExtenstions";
import { repairClosestStructure } from "Roles/RepairClosestStructure";
import { suckClosestContainer } from "Roles/SuckClosestContainer";
import { upgradeController } from "Roles/UpgradeController";

export const homeBuilder: CreepProcessor = {
  priority: 2,
  processorType: CreepProcessorTypes.HomeBuilder,
  creepSpawnTemplates: [
    {
      energy: 700,
      body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      creepCount: 2
    },
    { energy: 500, body: [WORK, WORK, CARRY, CARRY, MOVE], creepCount: 2 },
    { energy: 300, body: [WORK, CARRY, MOVE], creepCount: 2 }
  ],
  creepSpawnTemplatesCache: [],
  roles: [buildClosestStructure, repairClosestStructure, upgradeController, suckClosestContainer],
  rolesCache: [],
  spawnAllowed: function (spawn: StructureSpawn) {
    return spawn.room.find(FIND_STRUCTURES, { filter: m => m.structureType === STRUCTURE_CONTAINER }).length > 0;
  }
};
