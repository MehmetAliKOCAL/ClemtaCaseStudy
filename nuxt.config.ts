// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss'],
  build: {
    transpile: ['vue-toastification'],
  },
  css: ['vue-toastification/dist/index.css', '@/assets/css/tailwind.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content:
            'E-Shippr offers free and fast shipping service. In addition to that, you can return whatever you bought in 15 days without pointing out a valid reason. You are safe with us! With its daily growing catalog, you can pretty much find any category you want to shop for. Fashion trends, electronics, beauty picks, gaming accesories, etc... You pick, we ship!',
        },
        {
          property: 'og:url',
          content: 'https://clemtacs.gwyndev.com/',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:description',
          content:
            'E-Shippr offers free and fast shipping service. In addition to that, you can return whatever you bought in 15 days without pointing out a valid reason. You are safe with us! With its daily growing catalog, you can pretty much find any category you want to shop for. Fashion trends, electronics, beauty picks, gaming accesories, etc... You pick, we ship!',
        },
        {
          property: 'og:image',
          content: 'https://clemtacs.gwyndev.com/logo.webp',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'twitter:domain',
          content: 'clemtacs.gwyndev.com',
        },
        {
          property: 'twitter:url',
          content: 'https://clemtacs.gwyndev.com/',
        },
        {
          name: 'twitter:description',
          content:
            'E-Shippr offers free and fast shipping service. In addition to that, you can return whatever you bought in 15 days without pointing out a valid reason. You are safe with us! With its daily growing catalog, you can pretty much find any category you want to shop for. Fashion trends, electronics, beauty picks, gaming accesories, etc... You pick, we ship!',
        },
        {
          name: 'twitter:image',
          content: 'https://clemtacs.gwyndev.com/logo.webp',
        },
      ],
    },
  },
  runtimeConfig: {
    API_URL: process.env.API_URL,
  },
});
