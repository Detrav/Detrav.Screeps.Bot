import { pushEnergyToExtentions } from "Roles/PushEnergyToExtenstions";
import { suckClosestContainer } from "Roles/SuckClosestContainer";

export const homefiller: CreepProcessor = {
  priority: 1,
  processorType: CreepProcessorTypes.HomeFiller,
  creepSpawnTemplates: [
    { energy: 500, body: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepCount: 1, levels: [3, 4, 5, 6, 7, 8] },
    { energy: 300, body: [WORK, CARRY, CARRY, CARRY, MOVE], creepCount: 1, levels: [2, 3, 4, 5, 6, 7, 8] }
  ],
  creepSpawnTemplatesCache: new Map<RoomLevel, CreepSpawnTemplate[]>(),
  roles: [pushEnergyToExtentions, suckClosestContainer],
  rolesCache: []
};
