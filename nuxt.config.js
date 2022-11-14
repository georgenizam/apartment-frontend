export default {
  head: {
    title: 'apartment',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    prefetchLinks: false,
  },
  css: ['~/assets/styles/main.scss'],
  plugins: [],
  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: '/',
  },
  build: {},
};
