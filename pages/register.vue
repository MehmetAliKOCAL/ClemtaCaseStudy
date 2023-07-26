<script setup>
  const store = useStore();
  const toast = useToast();
  const router = useRouter();
  const showPassword = ref(false);
  const routeTo = () => store.state.routeTo;
  const registrationData = reactive({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const passwordCorrection = ref('');

  function isDataValid() {
    const isValid =
      !Object.values(registrationData).includes('') &&
      registrationData.password === passwordCorrection.value;
    if (!isValid) {
      toast.error('Please fill in all the fields');
      toast.error('Make sure both password fields are the same');
    }
    return isValid;
  }

  async function register() {
    if (isDataValid()) {
      registrationData.cart = [];
      store.commit('register', registrationData);
      if (routeTo() !== '') {
        router.push(routeTo());
        store.commit('updateRouteToState', '');
      }
    }
  }

  definePageMeta({
    title: 'Register',
  });
</script>

<template>
  <main
    class="py-24 px-24 max-xl:px-10 max-md:px-6 bg-[url('/bgTessellation.webp')] min-w-screen min-h-screen flex justify-center items-center"
  >
    <form
      @submit.prevent
      @keypress.enter.prevent="register()"
      class="p-14 max-md:px-10 max-sm:px-8 max-xs:px-6 flex flex-col gap-y-4 w-[500px] bg-white rounded-[4px] shadow-lg shadow-black/20"
    >
      <h1 class="self-center text-2xl font-black">Sign Up</h1>
      <p class="text-xs mb-6 text-center">Create an account and start shopping!</p>
      <div class="flex flex-col">
        <label
          for="firstName"
          class="text-sm text-gray-500"
          >First Name</label
        >
        <input
          required="true"
          id="firstName"
          type="text"
          autocomplete="name"
          v-model="registrationData.name"
          class="py-1 border-b-2 border-black/20 outline-none transition-colors duration-300 focus:border-primary bg-blue-100/70 invalid:bg-red-100 invalid:border-red-500 invalid:focus:border-red-500"
        />
      </div>
      <div class="flex flex-col">
        <label
          for="lastName"
          class="text-sm text-gray-500"
          >Last Name</label
        >
        <input
          required="true"
          id="lastName"
          type="text"
          autocomplete="name"
          v-model="registrationData.surname"
          class="py-1 border-b-2 border-black/20 outline-none transition-colors duration-300 focus:border-primary bg-blue-100/70 invalid:bg-red-100 invalid:border-red-500 invalid:focus:border-red-500"
        />
      </div>
      <div class="flex flex-col">
        <label
          for="email"
          class="text-sm text-gray-500"
          >Email</label
        >
        <input
          required="true"
          id="email"
          type="email"
          autocomplete="email"
          v-model="registrationData.email"
          class="py-1 border-b-2 border-black/20 outline-none transition-colors duration-300 focus:border-primary bg-blue-100/70 invalid:bg-red-100 invalid:border-red-500 invalid:focus:border-red-500"
        />
      </div>
      <div class="flex flex-col">
        <label
          for="password"
          class="text-sm text-gray-500"
          >Password</label
        >
        <input
          required="true"
          id="password"
          autocomplete="new-password"
          v-model="registrationData.password"
          :type="showPassword ? 'text' : 'password'"
          class="py-1 border-b-2 border-black/20 outline-none transition-colors duration-300 focus:border-primary bg-blue-100/70 invalid:bg-red-100 invalid:border-red-500 invalid:focus:border-red-500"
        />
      </div>
      <div class="flex flex-col">
        <label
          for="passwordCorrection"
          class="text-sm text-gray-500"
          >Password Correction</label
        >
        <input
          required="true"
          id="passwordCorrection"
          autocomplete="new-password"
          v-model="passwordCorrection"
          :type="showPassword ? 'text' : 'password'"
          class="py-1 border-b-2 border-black/20 outline-none transition-colors duration-300 focus:border-primary bg-blue-100/70 invalid:bg-red-100 invalid:border-red-500 invalid:focus:border-red-500"
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
        @click="register()"
        class="bg-primary text-white py-3 rounded-md hover:scale-95 active:scale-100 transform-all duration-200"
      >
        Register
      </button>
      <p class="text-xs text-gray-500">
        Already have an account?
        <NuxtLink
          to="/login"
          class="text-primary"
          >Login</NuxtLink
        >
      </p>
    </form>
  </main>
</template>
