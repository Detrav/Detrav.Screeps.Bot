import { pushEnergyToExtentions } from "Roles/PushEnergyToExtenstions";
import { suckClosestContainer } from "Roles/SuckClosestContainer";

export const homefiller: CreepProcessor = {
  priority: 1,
  processorType: CreepProcessorTypes.HomeFiller,
  creepSpawnTemplates: [
    { energy: 500, body: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepCount: 1 },
    { energy: 300, body: [WORK, CARRY, CARRY, CARRY, MOVE], creepCount: 1 }
  ],
  creepSpawnTemplatesCache: [],
  roles: [pushEnergyToExtentions, suckClosestContainer],
  rolesCache: [],
  spawnAllowed: function (spawn: StructureSpawn) {
    const level = spawn.room.controller?.level;
    return !!(level && level > 1);
  }
};
