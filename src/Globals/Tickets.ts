let ticketsMap: Map<string, Ticket> = new Map<string, Ticket>();

export const getTickets = function* (predicate?: (t: Ticket) => boolean): IterableIterator<Ticket> {
  if (predicate) {
    for (let value of ticketsMap.values()) {
      if (predicate(value)) {
        yield value;
      }
    }
  }

  return ticketsMap.values();
};

export const getTicket = function (id: string) {
  return ticketsMap.get(id);
};

export const pushTicket = function (ticket: Ticket) {
  ticketsMap.set(ticket.id, ticket);
};

export const ticketsProcessor: GlobalProcessor = {
  period: 50,
  shift: 5,
  config: function () {
    ticketsMap.clear();
  },
  step: function () {
    for (let [key, value] of ticketsMap) {
      if (value.phase === TicketPhase.Ready) {
        ticketsMap.delete(key);
      }
    }
  }
};
