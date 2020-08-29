const path = require('path');
const webpack = require('webpack');
module.exports = ({ config }) => {
  config.node = { global: true, fs: 'empty' };
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: true,
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });

  config.module.rules.push({
    test: /\.txt$/i,
    use: 'raw-loader',
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.extensions.push('.ts', '.tsx');

  config.plugins.push(new webpack.NormalModuleReplacementPlugin(/src\/store\/index.ts/, './__mocks__/index.ts'));
  config.plugins.push(new webpack.NormalModuleReplacementPlugin(/src\/Settings.ts/, './__mocks__/Settings.ts'));

  return config;
};
