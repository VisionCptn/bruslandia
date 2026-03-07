import * as migration_20260307_151920 from './20260307_151920';
import * as migration_20260307_162928 from './20260307_162928';

export const migrations = [
  {
    up: migration_20260307_151920.up,
    down: migration_20260307_151920.down,
    name: '20260307_151920',
  },
  {
    up: migration_20260307_162928.up,
    down: migration_20260307_162928.down,
    name: '20260307_162928'
  },
];
