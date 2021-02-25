// example declaration file - remove these and add your own custom typings

// declare const TicketTypeSpawn = "spawn";
// declare const TicketTypeHarvest = "hatvest";
// type TicketTypes = TicketTypeSpawn | TicketTypeHarvest;

declare enum TicketTypes {
  Creep = "creep",
  Spawn = "spawn"
}

declare enum TicketPhase {
  None = 0,
  Accepted = 1,
  Ready = 2
}

declare enum CreepMissions {
  None = 0,
  Harvest = 1 << 1,
  Carrier = 1 << 2,
  Builder = 1 << 3,
  Repair = 1 << 4
}

interface TicketBase {
  phase?: TicketPhase;
  id: string;
  time?: number;
  lifeTime?: number;
}

interface TicketSpawn extends TicketBase {
  type: TicketTypes.Spawn;
  spawnId: Id<StructureSpawn>;
  parts: BodyPartConstant[];
  name: string;
  missions: CreepMissions;
}

interface TicketCreep extends TicketBase {
  type: TicketTypes.Creep;
  missions: CreepMissions;
  role: CreepRoles;
}

interface TicketCreepHarvest extends TicketCreep {
  sourceId: Id<Source>;
  role: CreepRoles.Harvest;
}

type Ticket = TicketSpawn | TicketCreep;

declare enum CreepRoles {
  None = "none",
  Harvest = "harvest"
}

// memory extension samples
interface CreepMemory {
  role: CreepRoles;
  ticket?: Ticket;
  missions: CreepMissions;
}

interface CreepProcessors {
  [K: string]: CreepProcessor;
}

// Run process every tick
interface CreepProcessor {
  config: () => void;
  step: (creep: Creep) => void;
}

// Run process every 50 ticks
interface GlobalProcessor {
  period: number;
  shift: number;
  config: () => void;
  step: () => void;
}

interface GlobalProcessors {
  [K: string]: GlobalProcessor;
}

// interface CreepProcessor {
//   spawn: (spawnName: string) => void;
//   step: (creep: Creep) => void;
//   scan: (spawnName: string) => void;
// }

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
