module.exports = {
  chainWebpack: config => {
    config.module
      .rule('preprocess-loader') // used to suppress pixi debug messages, see https://stackoverflow.com/q/53627810
      .test(/\.[js|ts]/)
      .include.add(/pixi\.js/).end()
      .use('preprocess-loader')
      .loader('preprocess-loader')
      .options({ DEBUG: false })
      .end()
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
