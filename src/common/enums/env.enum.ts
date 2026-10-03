import { createDynamicEnum } from '../helpers/enum.helper';

export const appEnvValues = [
  'local',
  'development',
  'staging',
  'production',
] as const;

export const AppEnv = createDynamicEnum(appEnvValues);

export type AppEnvType = (typeof appEnvValues)[number];
