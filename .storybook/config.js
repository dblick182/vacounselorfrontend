import { configure } from '@storybook/react';
import { initializeIcons } from 'office-ui-fabric-react';
import { theme } from './theme';
import { addParameters } from '@storybook/react';

addParameters({
  options: {
    theme,
  },
});

const customViewports = {
  '1366': {
    name: '1366',
    styles: {
      width: '1366px',
      height: '963px',
    },
  },
  '1024': {
    name: '1024',
    styles: {
      width: '1024px',
      height: '963px',
    },
  },
  '720': {
    name: '720',
    styles: {
      width: '720px',
      height: '963px',
    },
  },
  '480': {
    name: '480',
    styles: {
      width: '480px',
      height: '963px',
    },
  },
  '320': {
    name: '320',
    styles: {
      width: '320px',
      height: '600px',
    },
  },
};

addParameters({
  viewport: {
    viewports: customViewports,
  },
});

initializeIcons();

configure(require.context('../src', true, /\.stories\.tsx$/), module);
