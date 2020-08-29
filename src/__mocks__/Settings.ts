import { action } from '@storybook/addon-actions';

export const appSettings = {
  config: {
    orchestratorUrl: undefined,
    authProvider: {
      getIdToken: () =>
        Promise.resolve({
          idToken: {
            rawIdToken: 'test',
          },
          state: 'test',
        }),
      getAccessToken: () => Promise.resolve('test'),
    },
  },
  registerService: () => null,
  getSupportLink: () => 'test',
  logger: {
    logChainedEvent: action('logChainedEvent'),
    getSessionId: () => 'test',
  },
};
