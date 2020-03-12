export const enum CMD {
  EMPTY = 0x00000000,
  SPAWN = 0x00000001,
  DESPAWN = 0x00000002,
}

export interface ICommandBuffer {
  runCommand(command: CMD, index: number, callback?: Function): void;
}
