import { CreepMemoryHomeHarvest, plan, PROCESSOR_NAME } from "./structure";

function placeContainerNearSource(source: Source) {
  const area = source.room.lookAtArea(source.pos.y - 2, source.pos.x - 2, source.pos.y + 2, source.pos.x + 2, true);

  const containers = _.filter(
    area,
    m => m.constructionSite?.structureType === STRUCTURE_CONTAINER || m.structure?.structureType === STRUCTURE_CONTAINER
  );

  if (containers.length === 0) {
    for (let i = 0; i < plan.length; i++) {
      const point = plan[i];

      const look = source.room.lookAt(source.pos.x + point.x, source.pos.y + point.y);
      if (look.length === 1 && look[0].type === LOOK_TERRAIN && look[0].terrain === "plain") {
        source.room.createConstructionSite(source.pos.x + point.x, source.pos.y + point.y, STRUCTURE_CONTAINER);
        return;
      }
    }
  }
}

function getCreepPowerByCapacity(spawn: StructureSpawn): BodyPartConstant[] {
  if (spawn.room.energyCapacityAvailable >= 500) {
    return [WORK, WORK, WORK, CARRY, MOVE];
  } else {
    return [WORK, CARRY, MOVE];
  }
}

function SpawnCreepsForSource(spawn: StructureSpawn, source: Source, count: number) {
  for (let i = 0; i < count; i++) {
    const creepName = PROCESSOR_NAME + "-" + source.id + "-" + i;
    const creep = Game.creeps[creepName];
    if (!creep) {
      spawn.spawnCreep(getCreepPowerByCapacity(spawn), creepName, {
        memory: <CreepMemoryHomeHarvest>{
          processor: PROCESSOR_NAME,
          source: source.id
        }
      });
    }
  }
}

function calcCreepsCount(source: Source): number {
  const flags = _.filter(source.room.lookAt(source), m => m.type == "flag");
  if (flags.length && flags[0].flag) {
    const flag = flags[0].flag;
    return +flag.name.substring(0, flag.name.indexOf("+"));
  }
  return 1;
}

export const spawn = function (spawnName: string) {
  const spawn = Game.spawns[spawnName];
  const sources = spawn.room.find(FIND_SOURCES);
  for (const sourceName in sources) {
    const source = sources[sourceName];
    const count = calcCreepsCount(source);
    SpawnCreepsForSource(spawn, source, count);
    placeContainerNearSource(source);
  }
};
