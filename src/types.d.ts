// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  processor: string;
  spawn: string;
  source?: Id<Source>;
  role?: "upgrading" | "building";
  //role: string;
  //room: string;
  //working: boolean;
}

interface SpawnMemory {
  energyCapacity: number;
}

interface CreepProcessors {
  [K: string]: CreepProcessor;
}

interface CreepProcessor {
  spawn: (spawnName: string) => void;
  step: (creep: Creep) => void;
  scan: (spawnName: string) => void;
}

interface Memory {
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
