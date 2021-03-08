process.env.VUE_APP_TIMESTAMP = (new Date()).toISOString();
process.env.BASE_URL = (process.env.NODE_ENV === 'production')
                        ? '/vcpkg-index/'
                        : '/';

module.exports = {
  transpileDependencies: [
    'vuetify'
  ]
}
