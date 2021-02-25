import { ticketsProcessor } from "./Tickets";
import { spawningProcessor } from "./Spawning";
import { spawnerProcessor } from "./Spawner";
import { sourceProcessor } from "./Source";

export const globalProcessors: GlobalProcessors = {
  ticketsProcessor,
  spawningProcessor,
  spawnerProcessor,
  sourceProcessor
};
