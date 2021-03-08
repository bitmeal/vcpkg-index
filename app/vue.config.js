process.env.VUE_APP_TIMESTAMP = (new Date()).toISOString();

const publicPath = (process.env.NODE_ENV === 'production')
                        ? '/vcpkg-index/'
                        : '/';
process.env.BASE_URL = publicPath;

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: publicPath
}
