import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
};

export default jestConfig;
