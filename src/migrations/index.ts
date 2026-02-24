import * as migration_20260206_142757 from './20260206_142757';
import * as migration_20260224_000000 from './20260224_000000';

export const migrations = [
  {
    up: migration_20260206_142757.up,
    down: migration_20260206_142757.down,
    name: '20260206_142757'
  },
  {
    up: migration_20260224_000000.up,
    down: migration_20260224_000000.down,
    name: '20260224_000000'
  },
];
