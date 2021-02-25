import { getTickets } from "Globals/Tickets";

export const none: CreepProcessor = {
  config: function () {},
  step: function (creep: Creep) {
    if ((Game.time + 2) % 5 === 0) {
      const tickets = getTickets(
        m => m.type === TicketTypes.Creep && !m.phase && (m.missions & creep.memory.missions) === m.missions
      );

      const ticket = tickets.next().value as TicketCreep;

      if (ticket) {
        creep.memory.ticket = ticket;
        creep.memory.role = ticket.role;
        ticket.phase = TicketPhase.Accepted;
      }
    }
  }
};
