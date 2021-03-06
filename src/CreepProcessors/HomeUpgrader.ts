import { suckClosestContainer } from "Roles/SuckClosestContainer";
import { upgradeController } from "Roles/UpgradeController";

export const homeUpgrader: CreepProcessor = {
  priority: 2,
  processorType: CreepProcessorTypes.HomeUpgrader,
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
  roles: [upgradeController, suckClosestContainer],
  rolesCache: [],
  spawnAllowed: function (spawn: StructureSpawn) {
    const level = spawn.room.controller?.level;
    return !!(level && level > 1);
  }
};
