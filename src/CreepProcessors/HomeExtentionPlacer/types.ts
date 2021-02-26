import { planMake } from "utils/PlanMaker";

export const PROCESSOR_NAME = "home-ext-placer";

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
