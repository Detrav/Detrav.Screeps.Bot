import { phase as phase1 } from "./phase_01/phase";

var currentPhase = phase1;

export const loop = function () {
  currentPhase.loop();
};
