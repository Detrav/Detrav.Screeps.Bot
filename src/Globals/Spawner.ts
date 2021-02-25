import { getTickets } from "./Tickets";

export const spawnerProcessor: GlobalProcessor = {
  period: 5,
  shift: 1,
  config: function () {},
  step: function () {
    const myTickets = getTickets(m => m.type === TicketTypes.Spawn && !m.phase);

    for (let ticketBase of myTickets) {
      const ticket = ticketBase as TicketSpawn;
      const spawn = Game.getObjectById(ticket.spawnId) as StructureSpawn;
      if (Game.creeps[ticket.name]) {
        ticket.phase = TicketPhase.Ready;
      } else if (
        spawn.spawnCreep(ticket.parts, ticket.name, {
          memory: {
            role: CreepRoles.None,
            missions: ticket.missions
          }
        }) === OK
      ) {
        ticket.phase = TicketPhase.Ready;
        return;
      }
    }
  }
};
