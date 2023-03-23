const webpack = require('webpack');

process.env.VUE_APP_TIMESTAMP = (new Date()).toISOString();

const publicPath = (process.env.NODE_ENV === 'production')
                        ? process.env.BASE_URL || '/'
                        : '/';
process.env.BASE_URL = publicPath;

module.exports = {
  publicPath: publicPath,

  transpileDependencies: [
    'vuetify'
  ],

  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    resolve: {
      // ignore browser filed in package.json (patch with polyfills)
      aliasFields: [],
      // use browserfs
      alias: {
        'fs': require.resolve('./src/fs_shim.js'),
        'buffer': 'browserfs/dist/shims/buffer.js',
        'path': 'browserfs/dist/shims/path.js',
        'processGlobal': 'browserfs/dist/shims/process.js',
        'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
        'bfsGlobal': require.resolve('browserfs')
      }
    },
    module: {
      noParse: [
        /browserfs\.js/
      ]
    },
    plugins: [
      // Expose BrowserFS, process, and Buffer globals
      new webpack.ProvidePlugin({ BrowserFS: 'bfsGlobal', process: 'processGlobal', Buffer: 'bufferGlobal' })
    ],
    // DISABLE webpack polyfills
    node: {
      path: false,
      process: false,
      Buffer: false
    },
  }
}
