import { buildStructureNearSpecifiSource } from "Roles/HomeHarvesterOnly/BuildStructureNearSpecifiSource";
import { harvestSpecificSource, HarvestSpecificSourceCreepMemory } from "Roles/HomeHarvesterOnly/HarvestSpecificSource";
import { pushEnergyNearSpecificSource } from "Roles/HomeHarvesterOnly/PushEnergyNearSpecificSource";
import { repairStructureNearSpecificSource } from "Roles/HomeHarvesterOnly/RepairStructureNearSpecificSource";
import { placeContainerNearSpecificSource } from "Roles/HomeHarvesterOnly/PlaceContainerNearSpecificSource";

export const homeHarvester: CreepProcessor = {
  priority: -1,
  processorType: CreepProcessorTypes.HomeHarvester,
  creepSpawnTemplates: [
    {
      energy: 700,
      body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
      creepCount: 1,
      levels: [3, 4, 5, 6, 7, 8]
    },
    { energy: 500, body: [WORK, WORK, CARRY, CARRY, MOVE], creepCount: 1, levels: [2, 3, 4, 5, 6, 7, 8] },
    { energy: 300, body: [WORK, CARRY, MOVE], creepCount: 1, levels: [1, 2, 3, 4, 5, 6, 7, 8] }
  ],
  creepSpawnTemplatesCache: new Map<RoomLevel, CreepSpawnTemplate[]>(),
  roles: [
    repairStructureNearSpecificSource,
    buildStructureNearSpecifiSource,
    pushEnergyNearSpecificSource,
    harvestSpecificSource,
    placeContainerNearSpecificSource
  ],
  rolesCache: [],
  customSpawn: function (spawn: StructureSpawn, template: CreepSpawnTemplate) {
    const sources = spawn.room.find(FIND_SOURCES);
    for (const sourceName in sources) {
      const source = sources[sourceName];
      for (let i = 0; i < template.creepCount; i++) {
        const creepName = homeHarvester.processorType + "-" + spawn.name + "-" + source.id + "-" + i;
        const creep = Game.creeps[creepName];
        if (!creep) {
          return (
            spawn.spawnCreep(template.body, creepName, {
              memory: <HarvestSpecificSourceCreepMemory>{
                processor: homeHarvester.processorType,
                sourceId: source.id
              }
            }) === OK
          );
        }
      }
    }
    return false;
  }
};
