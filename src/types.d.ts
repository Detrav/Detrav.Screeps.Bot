// example declaration file - remove these and add your own custom typings



// memory extension samples
interface CreepMemory {
  processor: CreepProcessorTypes;
  pause?: number;
}

interface SpawnMemory {
  energyCapacity: number;
}

interface CreepProcessor {
  processorType: CreepProcessorTypes;
  priority: number;
  config: () => void;
  step: (creep: Creep) => void;
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
