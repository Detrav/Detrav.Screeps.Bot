let maxAttemps = 3;

export interface CreepTemplate {
  energy: number;
  body: BodyPartConstant[];
  noSpawn?: boolean;
}

const attemps = new Map<string, number>();

export const trySpawnCreep = function (
  spawn: StructureSpawn,
  templates: CreepTemplate[],
  name: string,
  memory: CreepMemory
) {
  const energy = spawn.room.energyCapacityAvailable;
  let number = attemps.get(name) || 0;
  let count = Math.floor(number / maxAttemps);
  let index = 0;
  if (count) {
    // if need to skip some just skip
    for (index; index < templates.length; index++) {
      if (energy >= templates[index].energy) {
        if (count > 0) {
          count--;
        } else {
          break;
        }
      }
    }
  } else {
    // detect current index
    for (index; index < templates.length; index++) {
      if (energy > templates[index].energy) {
        break;
      }
    }
  }
  // if we move to end
  if (index > templates.length - 1) {
    index = templates.length - 1;
  }

  if (templates[index].noSpawn) return;

  if (
    spawn.spawnCreep(templates[index].body, name, {
      memory: memory
    }) === OK
  ) {
    attemps.delete(name);
  } else {
    number++;
    attemps.set(name, number);
  }
};
