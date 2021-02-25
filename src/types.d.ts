// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  processor: string;
}

interface SpawnMemory {
  energyCapacity: number;
}

interface CreepProcessors {
  [K: string]: CreepProcessor;
}

interface CreepProcessor {
  processorName: string;
  priority: number;
  config: () => void;
  step: (creepName: string) => void;
  scan: (creepName: string) => void;
  spawn: (spawnName: string) => void;
  room: (roomName: string) => void;
}

interface Memory {
  uuid: number;
  log: any;
  creeps: CreepMemory[];
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
