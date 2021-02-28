import { planMake } from "utils/PlanMaker";
import { HarvestSpecificSourceCreepMemory } from "./HarvestSpecificSource";

export const plan = planMake(`
  XXXXX
  X___X
  X_O_X
  X___X
  XXXXX
`);

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

export const placeContainerNearSpecificSource: CreepRoleTemplate = {
  role: CreepRoles.PlaceContainerNearSpecificSource,
  step: (creep: Creep) => StepResult.Stop,
  check: function (creep: Creep) {
    const memory = creep.memory as HarvestSpecificSourceCreepMemory;
    const source = Game.getObjectById(memory.sourceId);
    if (source) {
      placeContainerNearSource(source);
    }
    return false;
  }
};
