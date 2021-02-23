import { harvester } from "./harvester";
import { upgrader } from "./upgrader";

interface CreepProcessor {
  [K: string]: {
    step: (creep: Creep) => void;
  };
}

interface DetravCreepMemory extends CreepMemory {
  targetPos: RoomPosition;
  energyPos: RoomPosition;
}

interface PlanStep {
  namePrefix: string;
  type: "creep";
}

interface CreateHarvestPlanStep extends PlanStep {
  targetPos: RoomPosition;
  energyPos: RoomPosition;
}

interface Plan {
  steps: Array<PlanStep>;
}

interface DetravRoomMemory {
  plan: Plan;
}

/*
----==== Phase 01 plan ====----
  Detect list of source

  Create Harvester x2 for each source
  Create Upgrader only for near source
*/

const proc: CreepProcessor = { h: harvester, u: upgrader };

const spawnName = Object.keys(Game.spawns)[0];
const spawn = Game.spawns[spawnName];
var plan = (<DetravRoomMemory>spawn.room.memory).plan;

if (!plan) {
  // init only one time
  const room = Game.spawns[spawnName].room;
  const sources = room.find(FIND_SOURCES);

  var near = 0;
  var minLen = 9999;

  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    const path = room.findPath(spawn.pos, source.pos);
    if (minLen > path.length) {
      near = i;
      minLen = path.length;
    }
  }

  plan = {
    steps: [
      <CreateHarvestPlanStep>{ namePrefix: "h-", type: "creep", targetPos: spawn.pos, energyPos: sources[near].pos },
      <CreateHarvestPlanStep>{ namePrefix: "h-", type: "creep", targetPos: spawn.pos, energyPos: sources[near].pos },
      <CreateHarvestPlanStep>{
        namePrefix: "u-",
        type: "creep",
        targetPos: room.controller?.pos,
        energyPos: sources[near].pos
      }
    ]
  };
  (<DetravRoomMemory>spawn.room.memory).plan = plan;
}

export const phase = {
  loop: function () {
    if (Game.time % 10 == 0) {
      plan = (<DetravRoomMemory>spawn.room.memory).plan;
      if (plan.steps.length > 0) {
        var step = plan.steps[0];
        var newName = step.namePrefix + Game.time;
        switch (step.type) {
          case "creep":
            {
              if (
                spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
                  memory: <DetravCreepMemory>{
                    energyPos: (<CreateHarvestPlanStep>step).energyPos,
                    targetPos: (<CreateHarvestPlanStep>step).targetPos
                  }
                }) == OK
              ) {
                plan.steps.shift();
              }
            }
            break;
        }

        (<DetravRoomMemory>spawn.room.memory).plan = plan;
      }
    }

    for (const name in Game.creeps) {
      proc[name[0]].step(Game.creeps[name]);
    }
  }
};
