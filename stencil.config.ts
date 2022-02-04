import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
  namespace: 'gardb',
  srcDir: 'src',
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/theme/mixins.scss',
        'src/theme/variables.scss',
        'src/theme/theme-default.scss',
      ]
    }),
    inlineSvg()
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
};
