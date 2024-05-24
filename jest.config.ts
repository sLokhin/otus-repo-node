import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'root' }],
  },
};

export default config;
