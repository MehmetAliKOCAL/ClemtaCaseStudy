<script setup>
  const toast = useToast();
  const store = useStore();
  const userCookie = useCookie('userData');
  const showMobileMenu = ref(false);
  const logOut = () => {
    userCookie.value = undefined;
    store.commit('updateLoggedInUserState', '');
    toast.info('Logged Out');
  };
  const navbarButtons = {
    accountRelated: {
      notLoggedIn: [
        {
          text: 'Login',
          href: '/login',
          iconName: 'login',
        },
        {
          text: 'Register',
          href: '/register',
          iconName: 'signUp',
        },
      ],
      loggedIn: [
        {
          text: 'Cart',
          function: logOut,
          iconName: 'cart',
        },
        {
          text: 'Wishlist',
          function: logOut,
          iconName: 'wishlist',
        },
        {
          text: 'LogOut',
          function: logOut,
          iconName: 'logout',
        },
      ],
    },
    productRelated: [
      {
        text: 'All Products',
        href: '/#products',
      },
      {
        text: 'Clothes',
        href: '/#products',
      },
      {
        text: 'Electronics',
        href: '/#products',
      },
      {
        text: 'Furniture',
        href: '/#products',
      },
      {
        text: 'Shoes',
        href: '/#products',
      },
      {
        text: 'Others',
        href: '/#products',
      },
    ],
  };
</script>

<template>
  <header
    class="py-5 px-24 max-lg:py-4 max-xl:px-10 max-md:px-6 bg-primary text-slate-100 font-semibold sticky w-full top-0 shadow z-10"
  >
    <nav class="flex justify-between items-center">
      <div class="flex shrink-0 max-lg:w-full">
        <div class="flex justify-between max-lg:w-full">
          <NuxtLink
            to="/"
            class="mr-20 max-xl:mr-10"
          >
            <nuxt-img
              src="/logo-horizontal.webp"
              format="webp"
              quality="80"
              alt="E-Shippr Logo"
              width="100"
          /></NuxtLink>
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="lg:hidden"
          >
            <IconsHamburgerMenu />
          </button>
        </div>
        <div
          v-for="button in navbarButtons.productRelated"
          :key="button"
          class="flex justify-center items-center max-lg:hidden"
        >
          <NuxtLink
            :to="button.href"
            class="px-4 py-2"
            >{{ button.text }}</NuxtLink
          >
        </div>
      </div>

      <div class="max-lg:hidden">
        <div
          v-if="userCookie === undefined"
          class="flex items-center justify-center shrink-0 space-x-6"
        >
          <NuxtLink
            v-for="button in navbarButtons.accountRelated.notLoggedIn"
            :key="button"
            :to="button.href"
            class="w-20 flex items-center justify-center max-xl:w-8"
            ><DynamicIconRenderer
              :iconName="button.iconName"
              class="mr-2"
            />
            <p class="max-xl:hidden">{{ button.text }}</p></NuxtLink
          >
        </div>

        <div
          v-else
          class="flex items-center justify-center shrink-0 space-x-6"
        >
          <button
            v-for="button in navbarButtons.accountRelated.loggedIn"
            :key="button"
            @click="button.function"
            class="w-20 flex items-center justify-center max-xl:w-8"
          >
            <DynamicIconRenderer
              :iconName="button.iconName"
              class="mr-2"
            />
            <p class="max-xl:hidden">{{ button.text }}</p>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Hamburger Menu -->
    <div
      class="min-h-screen overflow-y-auto bg-black/50 w-full flex absolute top-0 left-0 z-10 transition-all duration-300"
      :class="[showMobileMenu ? 'opacity-100 visible' : 'opacity-0 invisible']"
    >
      <nav
        :class="[showMobileMenu ? 'translate-x-0' : '-translate-x-full']"
        class="transition-all duration-300 bg-primary w-3/4 h-screen min-h-max overflow-y-auto shadow-lg shadow-black/50 flex flex-col text-2xl px-10 py-10 gap-y-6 scrollBar"
      >
        <div class="border-b-2 border-gray-100/40 flex items-center pb-1">
          <IconsAccount class="stroke-gray-100/60 w-5 mr-2" />
          <h1 class="text-lg text-gray-100/70">Account</h1>
        </div>
        <NuxtLink
          v-for="button in navbarButtons.accountRelated"
          :key="button"
          :to="button.href"
          @click="showMobileMenu = !showMobileMenu"
          class="w-full hover:translate-x-3 active:translate-x-0 transition-all duration-200"
        >
          {{ button.text }}</NuxtLink
        >
        <div class="mt-10 border-b-2 border-gray-100/40 flex items-center pb-1">
          <IconsCart class="stroke-gray-100/60 w-5 mr-2" />
          <h1 class="text-lg text-gray-100/70">Products</h1>
        </div>
        <NuxtLink
          v-for="button in navbarButtons.productRelated"
          :key="button"
          :to="button.href"
          @click="showMobileMenu = !showMobileMenu"
          class="w-full hover:translate-x-3 active:translate-x-0 transition-all duration-200"
          >{{ button.text }}</NuxtLink
        >
      </nav>
      <button
        class="w-1/4 h-screen"
        @click="showMobileMenu = !showMobileMenu"
      />
    </div>
  </header>
</template>
