<script setup>
  const store = useStore();
  const searchQuery = ref('');
  const hoveringElement = ref(null);
  const landingSectionButtons = [
    {
      text: 'Products',
      href: '#products',
    },
    {
      text: 'Sign Up',
      href: '/register',
    },
  ];

  onBeforeMount(() => {
    store.commit('getAllProducts');
  });
  definePageMeta({
    title: 'You pick, We ship!',
  });
</script>

<template>
  <main>
    <section
      class="px-24 py-10 max-xl:px-10 max-md:px-6 flex items-center bg-primary text-slate-100 max-md:flex-col max-md:space-y-10"
    >
      <div class="w-3/5 max-md:w-4/5 max-sm:w-full">
        <div class="w-4/5 max-lg:w-full">
          <h1 class="mb-6 font-bold text-4xl max-md:text-3xl">
            Buy Best Products From All Over The World
          </h1>
          <p>
            E-shippr offers fast and free shipping services. Also you have the
            right to return your product without even pointing out a valid
            reason in 15 days. You didn't like the product? It doesn't looks
            like in the pictures? We will keep your money in case of any
            unwanted situations!
          </p>
          <nav class="mt-10 space-x-6 flex max-md:justify-center">
            <NuxtLink
              v-for="button in landingSectionButtons"
              :key="button"
              :to="button.href"
              class="w-40 py-2.5 inline-block text-center rounded-3xl font-semibold border-2 border-slate-100 hover:scale-95 active:scale-100 transition-all duration-200"
              :class="[
                landingSectionButtons.indexOf(button) % 2 === 1
                  ? 'bg-primary text-gray-100'
                  : 'bg-gray-100 text-primary',
              ]"
            >
              {{ button.text }}
            </NuxtLink>
          </nav>
        </div>
      </div>
      <div class="w-2/5 max-sm:w-3/5 drop-shadow-2xl">
        <nuxt-img
          src="/tv.webp"
          format="webp"
          quality="100"
          width="500"
        />
      </div>
    </section>
    <div class="w-full flex justify-center items-center -mt-7">
      <NuxtLink
        to="#products"
        class="p-3 rounded-full bg-gray-100"
      >
        <IconsArrowDown />
      </NuxtLink>
    </div>
    <section
      id="products"
      class="px-24 mt-8 py-20 max-xl:px-10 max-md:px-6 max-md:mt-6"
    >
      <div class="flex items-center justify-between border-b-1 pb-4">
        <h1 class="text-gray-500 font-bold text-xl">Our Products</h1>
        <div
          @mouseenter="hoveringElement = 'search'"
          @mouseleave="hoveringElement = null"
          class="w-72 relative flex items-center"
        >
          <input
            @keypress.enter="store.commit('searchProducts', searchQuery)"
            type="text"
            placeholder="Search a product..."
            class="py-2 pr-10 pl-12 rounded-xl border-1 border-gray-200 w-full placeholder:text-gray-300 outline-none transition-all duration-300 focus:shadow-md hover:shadow-md focus:border-transparent hover:border-transparent text-gray-500 font-medium"
            v-model="searchQuery"
          />
          <button
            @click="store.commit('searchProducts', searchQuery)"
            class="absolute ml-4"
          >
            <IconsSearch
              class="transition-all duration-300"
              :class="[
                hoveringElement === 'search'
                  ? 'stroke-gray-500'
                  : ' stroke-gray-400/60',
              ]"
            />
          </button>
          <button
            @click="
              searchQuery = '';
              store.commit('getAllProducts');
            "
            class="absolute right-3"
          >
            <IconsCancel
              class="transition-all duration-300"
              :class="[
                hoveringElement === 'search'
                  ? 'stroke-gray-500'
                  : ' stroke-gray-400/60',
              ]"
            />
          </button>
        </div>
      </div>
      <ul class="mt-8 flex flex-wrap gap-4">
        <li
          v-if="
            store.state.products.length === 0 &&
            store.state.isFetching === false
          "
          class="my-20 px-10 w-full flex flex-col justify-center items-center space-y-4 text-xl font-bold text-gray-400"
        >
          <IconsWorkInProgress />
          <p>No related products have been found...</p>
        </li>
        <li
          v-else-if="store.state.isFetching === true"
          v-for="duplicate in 16"
          :key="duplicate"
        >
          <productCardSkeleton />
        </li>
        <ClientOnly>
          <li
            v-if="!store.state.isFetching"
            v-for="product in store.state.products"
            :key="product"
            @mouseenter="hoveringElement = product"
            @mouseleave="hoveringElement = null"
            class="w-[200px] font-bold bg-white rounded-lg shadow-lg"
          >
            <div class="overflow-hidden rounded-t-lg relative">
              <lazyImage
                :src="product?.thumbnail"
                format="webp"
                quality="80"
                width="200"
                height="200"
                class="transition-all duration-300"
                :class="[
                  hoveringElement === product
                    ? 'scale-125 opacity-70'
                    : 'scale-100 opacity-100',
                ]"
              />
              <div
                class="flex items-end justify-end transition-all duration-200 max-md:opacity-100 max-md:visible"
                :class="[
                  hoveringElement === product
                    ? ' opacity-100 visible'
                    : 'opacity-0 invisible',
                ]"
              >
                <button
                  class="m-4 w-9 h-9 absolute transition-all duration-200 hover:scale-110 active:scale-90"
                >
                  <IconsCart
                    class="w-full h-full p-2 stroke-white hover:stroke-primary transition-all duration-200 bg-black/80 rounded-md"
                  />
                </button>
                <button
                  class="m-4 w-9 h-9 mb-16 absolute transition-all duration-200 hover:scale-110 active:scale-90"
                >
                  <IconsWishlist
                    class="w-full h-full p-2 stroke-white hover:stroke-red-500 transition-all duration-200 bg-black/80 rounded-md"
                  />
                </button>
              </div>
            </div>
            <div class="p-4">
              <p class="text-gray-700 line-clamp-2 leading-5">
                {{ product.title }}
              </p>
              <p class="text-sm text-gray-500 line-clamp-2">
                {{ product.brand }}
              </p>
              <div class="my-2 flex items-center">
                <div class="w-0">
                  <ratingStars
                    :rate="product.rating"
                    class="scale-75"
                  />
                </div>
                <p class="text-gray-400 text-sm ml-24">
                  {{ product.rating.toFixed(1) }}
                </p>
              </div>
              <div class="flex justify-between items-center">
                <p class="font-semibold text-sm text-gray-400 line-clamp-1">
                  {{ product.stock + ' In Stock' }}
                </p>
                <p class="text-gray-800">{{ '$' + product.price }}</p>
              </div>
            </div>
          </li>
        </ClientOnly>
      </ul>
    </section>
    <NuxtLink to="/products?page=1">go to products page</NuxtLink>
  </main>
</template>
