import { getTicket, pushTicket } from "./Tickets";

export const sourceProcessor: GlobalProcessor = {
  period: 25,
  shift: 2,
  config: function () {},
  step: function () {
    for (let roomName in Game.rooms) {
      const room = Game.rooms[roomName];
      if (room.controller?.my) {
        for (let source of room.find(FIND_SOURCES)) {
          const ticketId = "ticket-" + source.id;
          const ticket = getTicket(ticketId);
          if (!ticket || ticket.phase === TicketPhase.Ready) {
            const newTicket: TicketCreepHarvest = {
              type: TicketTypes.Creep,
              missions: CreepMissions.Harvest,
              role: CreepRoles.Harvest,
              id: ticketId,
              lifeTime: 150,
              sourceId: source.id
            };
            pushTicket(newTicket);
          }
        }
      }
    }
  }
};
