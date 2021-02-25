import { getTicket, getTickets, pushTicket } from "./Tickets";

function spawnStarterCreeps(spawn: StructureSpawn) {
  // foreach source spawn one creep with harvest
  //

  const sources = spawn.room.find(FIND_SOURCES);

  for (let source of sources) {
    let creepName = "harvester-" + source.id;
    if (!Game.creeps[creepName] && !getTicket(creepName)) {
      pushTicket({
        type: TicketTypes.Spawn,
        parts: [WORK, CARRY, MOVE],
        missions: CreepMissions.Harvest,
        name: creepName,
        spawnId: spawn.id,
        id: creepName
      });
    }
  }
}

export const spawningProcessor: GlobalProcessor = {
  period: 25,
  shift: 1,
  config: function () {},
  step: function () {
    for (var spawnName in Game.spawns) {
      const spawn = Game.spawns[spawnName];
      let energy = spawn.room.energyCapacityAvailable;

      //   if (energy > 300) {
      //   } else {
      spawnStarterCreeps(spawn);
      //   }
    }
  }
};
