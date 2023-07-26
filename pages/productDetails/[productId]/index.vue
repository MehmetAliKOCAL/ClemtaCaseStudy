<script setup>
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const routeTo = () => store.state.routeTo;
  const productId = route.params.productId;
  const product = () => store.state.productDetails;
  const images = () => product().images;
  const imageToShow = ref(0);
  const isPageLoaded = () => Object.keys(product()).length >= 1;
  store.commit('getProductById', productId);

  function addToCart(product, amount) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    store.commit('manageAddingToCart', { user, product, amount });
    if (routeTo() !== '') {
      router.push(routeTo());
      store.commit('updateRouteToState', '');
    }
  }

  function generateInstallmentText() {
    return `Now with $${(product().price / 36).toFixed(2)} x 36 months installment advantage!`;
  }

  definePageMeta({
    title: 'Product Details',
  });
</script>

<template>
  <div class="px-24 max-xl:px-10 max-md:px-6 max-sm:px-0 min-h-screen">
    <main
      v-if="isPageLoaded()"
      class="p-32 bg-white shadow max-2xl:px-14 max-2xl:py-20 max-sm:px-6"
    >
      <div class="flex gap-x-14 max-2xl:gap-x-8 4xl:border-b max-lg:flex-col">
        <section class="shrink-0 flex flex-col items-center">
          <div class="lg:hidden mb-6 max-lg:w-full max-lg:text-center">
            <h1 class="mb-4 py-1 h-fit line-clamp-2 text-4xl font-bold max-sm:text-3xl">
              {{ product().title }}
            </h1>
            <div class="text-sm font-bold text-gray-600 leading-4 max-md:text-xs">
              <p>Purchase today with free quick shipping option.</p>
              <p>0 / 0 - This product haven't been rated yet.</p>
              <p>Category : {{ product()?.category?.name }}</p>
            </div>
          </div>
          <NuxtLazyImage
            :src="images()[imageToShow]"
            :alt="product().title"
            format="webp"
            quality="80"
            class="rounded-[4px] shadow-md w-[600px] max-3xl:w-[500px] max-lg/xl:w-[400px] max-lg:w-full aspect-auto overflow-hidden"
          />

          <div class="flex space-x-4 mt-4">
            <button
              @click="imageToShow = images().indexOf(image)"
              v-for="image in images()"
              :key="image"
              class="rounded-md overflow-hidden shadow hover:opacity-70 transition-all duration-200 border-3"
              :class="[
                imageToShow === images().indexOf(image) ? 'border-primary' : 'border-gray-300',
              ]"
            >
              <nuxt-img
                :src="image"
                format="webp"
                quality="80"
                width="80"
                :alt="product().title"
              />
            </button>
          </div>
        </section>

        <section>
          <div class="max-lg:hidden">
            <h1 class="mb-4 py-1 h-fit line-clamp-2 text-4xl font-bold">
              {{ product().title }}
            </h1>
            <div class="text-sm font-bold text-gray-600 leading-4">
              <p>Purchase today with free quick shipping option.</p>
              <p>0 / 0 - This product haven't been rated yet.</p>
              <p>Category : {{ product().category.name }}</p>
            </div>
          </div>
          <div class="my-7 space-y-1">
            <h2 class="font-semibold text-2xl">Description</h2>
            <p class="font-medium leading-5 text-gray-600">{{ product().description }}</p>
          </div>

          <div class="pb-8 flex flex-col gap-y-4">
            <div>
              <p class="text-sm font-bold text-gray-600">
                Shopping credit can be used on this product.
              </p>
              <div class="flex gap-x-2 items-start">
                <IconsCreditCard class="w-6 stroke-gray-800 shrink-0" />
                <p class="text-sm font-bold text-gray-600">
                  {{ generateInstallmentText() }}
                </p>
              </div>
            </div>
            <div class="flex items-end gap-x-2">
              <p class="font-bold text-4xl text-gray-800">
                {{ `$${product().price}` }}
              </p>
              <p class="font-bold text-2xl text-gray-600 line-through">
                {{ `$${product().price + 108}` }}
              </p>
            </div>

            <div class="mt-6 flex flex-col gap-y-2 justify-center">
              <button
                @click="addToCart(product(), 1)"
                class="px-6 py-2 flex justify-center gap-x-4 bg-blue-600 rounded-md text-gray-100 font-semibold shadow-md border-2 border-blue-400 hover:opacity-80 active:scale-90 transition-all duration-200"
              >
                <IconsCart />
                Add To Cart
              </button>
              <button
                class="px-6 py-2 flex justify-center gap-x-4 bg-rose-600 rounded-md text-gray-100 font-semibold shadow-md border-2 border-rose-400 hover:opacity-80 active:scale-90 transition-all duration-200"
              >
                <IconsWishlist />
                Save For Later
              </button>
            </div>
          </div>

          <div class="py-6 flex gap-x-4 border-t justify-center max-4xl:hidden">
            <CargoCard />
            <StoreDetailsCard />
          </div>
        </section>
      </div>

      <div
        class="mt-10 py-6 flex gap-x-4 border-y justify-center 4xl:hidden max-md:flex-col max-md:gap-y-3"
      >
        <CargoCard />
        <StoreDetailsCard />
      </div>

      <section class="mt-16 text-gray-500">
        <h1 class="mb-6 font-bold">Frequently Asked Questions</h1>
        <Faq />
      </section>
    </main>
  </div>
</template>
