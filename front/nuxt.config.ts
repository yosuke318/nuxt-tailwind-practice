// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    define: {
      'window.global': {}, // In SSR, window is not defined. This is a workaround.
    },
  },
  runtimeConfig: {
    public: {
      userPoolId: process.env.NUXT_PUBLIC_USER_POOL_ID,
      clientId: process.env.NUXT_PUBLIC_CLIENT_ID,
      credentials:{
        accessKeyId:process.env.NUXT_PUBLIC_ACCESS_KEY_ID,
        secretAccessKey:process.env.NUXT_PUBLIC_SECRET_ACCESS_KEY
      }
    }
  },
});
