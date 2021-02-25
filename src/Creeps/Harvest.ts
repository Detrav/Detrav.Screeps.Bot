export const harvest: CreepProcessor = {
  config: function () {},
  step: function (creep: Creep) {
    let ticket = creep.memory.ticket as TicketCreepHarvest;
    let source = Game.getObjectById(ticket.sourceId);

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY)) {

    }
  }
};
