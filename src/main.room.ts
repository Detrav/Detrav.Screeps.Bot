import { planMake } from "utils/PlanMaker";

export const plan = planMake(`
X_X_X_X_X_X
_X_X_X_X_X_
X_X_X_X_X_X
_X_X___X_X_
X_X_X_X_X_X
_X___O___X_
X_X_X_X_X_X
_X_X___X_X_
X_X_X_X_X_X
_X_X_X_X_X_
X_X_X_X_X_X
`);

export const procRoom = function (roomName: string) {
  const room = Game.rooms[roomName];
  if (room) {
    if (room.memory.pause && room.memory.pause > 0) {
      room.memory.pause--;
      return;
    }

    if (room.controller?.my) {
      const spawn = room.find(FIND_MY_SPAWNS)[0];
      if (spawn) {
        buildExtentions(spawn);
      }
    }

    room.memory.pause = 23;
  }
};

export const procRooms = function () {
  for (let roomName in Game.rooms) {
    procRoom(roomName);
  }
};

const buildExtentions = function (spawn: StructureSpawn) {
  const roomLevel = spawn.room.controller?.level;
  let extentions = 0;
  switch (roomLevel) {
    case 0:
    case 1:
      extentions = 0;
      break;
    case 2:
      extentions = 10;
      break;
    case 3:
    default:
      extentions = 20;
      break;
  }

  let lastPlanPoint = 0;

  for (let i = 0; i < extentions && lastPlanPoint < plan.length; i++) {
    lastPlanPoint = buildExtention(spawn, lastPlanPoint);
  }
};

const buildExtention = function (spawn: StructureSpawn, lastPlanPoint: number): number {
  for (lastPlanPoint; lastPlanPoint < plan.length; lastPlanPoint++) {
    const point = plan[lastPlanPoint];
    switch (spawn.room.createConstructionSite(spawn.pos.x + point.x, spawn.pos.y + point.y, STRUCTURE_EXTENSION)) {
      case OK:
        return lastPlanPoint + 1;
      case ERR_FULL:
        return lastPlanPoint + 99999;
    }
  }

  return lastPlanPoint;
};
