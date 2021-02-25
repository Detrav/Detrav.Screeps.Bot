export const harvest: CreepProcessor = {
  config: function () {},
  step: function (creep: Creep) {
    let ticket = creep.memory.ticket as TicketCreepHarvest;
    let source = Game.getObjectById(ticket.sourceId) as Source;

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {

    }
  }
};
