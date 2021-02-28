import { procConfigures } from "main.config";
import { procCreeps } from "main.creep";
import { procRooms } from "main.room";
import { procSpawns } from "main.spawn";

procConfigures();

export const loop = function () {
  procRooms();
  procSpawns();
  procCreeps();
};
