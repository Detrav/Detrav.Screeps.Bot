// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  processor: CreepProcessorTypes;
  pause?: number;
  pid?: string;
  role?: CreepRoles;
}

interface SpawnMemory {
  sleep?: number;
}

interface RoomMemory {
  pause?: number;
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
