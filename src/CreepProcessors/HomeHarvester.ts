import { buildClosestStructure } from "Roles/BuildClosestStructure";
import { buildStructureNearSpecifiSource } from "Roles/HomeHarvesterOnly/BuildStructureNearSpecifiSource";
import { harvestClosestSource } from "Roles/HarvestClosestSource";
import { harvestSpecificSource, HarvestSpecificSourceCreepMemory } from "Roles/HomeHarvesterOnly/HarvestSpecificSource";
import { pushEnergyNearSpecificSource } from "Roles/HomeHarvesterOnly/PushEnergyNearSpecificSource";
import { pushEnergyToExtentions } from "Roles/PushEnergyToExtenstions";
import { repairClosestStructure } from "Roles/RepairClosestStructure";
import { repairStructureNearSpecificSource } from "Roles/HomeHarvesterOnly/RepairStructureNearSpecificSource";
import { placeContainerNearSpecificSource } from "Roles/HomeHarvesterOnly/PlaceContainerNearSpecificSource";

export const homeHarvester: CreepProcessor = {
  priority: -1,
  processorType: CreepProcessorTypes.HomeHarvester,
  creepSpawnTemplates: [
    { energy: 700, age: DetravAges.T3, body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], creepCount: 1 },
    { energy: 500, age: DetravAges.T2, body: [WORK, WORK, CARRY, CARRY, MOVE], creepCount: 1 },
    { energy: 300, age: DetravAges.T1, body: [WORK, CARRY, MOVE], creepCount: 1 }
  ],
  creepSpawnTemplatesCache: [],
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
