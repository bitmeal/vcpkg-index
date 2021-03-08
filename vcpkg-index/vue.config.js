process.env.VUE_APP_TIMESTAMP = (new Date()).toISOString();

module.exports = {
  transpileDependencies: [
    'vuetify'
  ]
}
