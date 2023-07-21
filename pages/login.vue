<script setup>
  const toast = useToast();
  const loginCookie = useCookie('userData');
  const showPassword = ref(false);
  const loginData = reactive({
    email: '',
    password: '',
  });

  function isDataValid() {
    const isValid = !Object.values(loginData).includes('');
    if (!isValid) toast.error('false data');
    return isValid;
  }

  async function login() {
    if (isDataValid()) {
      loginCookie.value = response;
      useRouter().push('/');
    }
  }

  definePageMeta({
    title: 'Login',
  });
</script>

<template>
  <main
    class="px-6 bg-[url('/bgTessellation.webp')] min-w-screen min-h-screen flex justify-center items-center"
  >
    <form
      @submit.prevent
      @keypress.enter="login()"
      class="flex flex-col gap-y-4 w-[500px] bg-white p-14 rounded-[4px] shadow-lg shadow-black/20"
    >
      <h1 class="self-center text-2xl font-black">Login</h1>
      <p class="text-xs mb-6 text-center">
        Login to your account and continue shopping your favourite things!
      </p>
      <div class="flex flex-col">
        <label
          for="email"
          class="text-sm text-gray-500"
          >Email</label
        >
        <input
          id="email"
          type="email"
          autocomplete="email"
          v-model="loginData.email"
          class="py-1 border-b-2 border-black/20 outline-none transition-colors duration-300 focus:border-primary bg-blue-100/70"
        />
      </div>
      <div class="flex flex-col">
        <label
          for="password"
          class="text-sm text-gray-500"
          >Password</label
        >
        <input
          id="password"
          v-model="loginData.password"
          autocomplete="current-password"
          :type="showPassword ? 'text' : 'password'"
          class="py-1 border-b-2 border-black/20 outline-none transition-colors duration-300 focus:border-primary bg-blue-100/70"
        />
        <button
          @click="showPassword = !showPassword"
          class="w-fit text-xs mt-2 self-end text-gray-500"
        >
          {{ showPassword === false ? 'Show Password' : 'Hide Password' }}
        </button>
      </div>
      <button
        type="submit"
        @click="login()"
        class="bg-primary text-white py-3 rounded-md hover:scale-95 active:scale-100 transform-all duration-200"
      >
        Login
      </button>
      <p class="text-xs text-gray-500">
        Don't have an account yet?
        <NuxtLink
          to="/register"
          class="text-primary"
          >Register</NuxtLink
        >
      </p>
    </form>
  </main>
</template>
