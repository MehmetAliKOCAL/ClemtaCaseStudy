<script setup>
  const store = useStore();
  const searchQuery = ref('');
  const hoveringElement = ref(null);
  const isFiltersMenuVisible = ref(false);
  const products = () => store.state.products;
  const categories = () => store.state.categories;
  const isFetching = () => store.state.isFetching;
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
  const priceFilters = reactive({
    min: {
      label: 'Min',
      value: '',
    },
    max: {
      label: 'Max',
      value: '',
    },
  });
  const ratingFilters = [
    { label: '⭐ 5 stars', value: { min: '4', max: '5' } },
    { label: '⭐ 4 stars and above', value: { min: '3', max: '4' } },
    { label: '⭐ 3 stars and above', value: { min: '2', max: '3' } },
    { label: '⭐ 2 stars and above', value: { min: '1', max: '2' } },
    { label: '⭐ 1 star and above', value: { min: '0', max: '1' } },
  ];
  const howDoesItWorkCards = [
    {
      phase: '1',
      title: 'Shopping',
      image: '/shopping.webp',
      details:
        'Search our products and find the one best suits your needs and budget. From clothing to electronics, we have a wide catalog!',
    },
    {
      phase: '2',
      title: 'Shipment',
      image: '/shipment.webp',
      details:
        'After you purchase your product, we will ship it within a business day. We offer free and quick shipping to every customer without charging extra for quick shipment.',
    },
    {
      phase: '3',
      title: 'Enjoy!',
      image: '/enjoy.webp',
      details:
        "You got your package, yaayy! If you think something is wrong with your package and it's related to us, you can return it right away! Other than that, enjoy your new stuff!",
    },
  ];

  function closeMenuRatherRedirectBack() {
    if (isFiltersMenuVisible.value) {
      isFiltersMenuVisible.value = false;
      navigator.preventDefault();
    }
  }

  onMounted(() => {
    window.addEventListener('popstate', closeMenuRatherRedirectBack());
  });
  onBeforeRouteLeave(() => {
    window.removeEventListener('popstate', closeMenuRatherRedirectBack());
  });
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
      class="py-10 px-24 max-xl:px-10 max-md:px-6 flex items-center bg-primary text-slate-100 max-md:flex-col max-md:space-y-10"
    >
      <div class="w-3/5 max-md:w-4/5 max-sm:w-full">
        <div class="w-4/5 max-lg:w-full">
          <h1 class="mb-6 font-bold text-4xl max-md:text-3xl">
            Buy Best Products From All Over The World
          </h1>
          <p>
            E-shippr offers fast and free shipping services all over the globe.
            Also we provide you the right to return your product without even
            pointing out a valid reason in 15 days. You didn't like the product?
            It doesn't looks like in the pictures? Well, no problem. If the
            product is not damaged after you receive it, you can return it! We
            will keep your money for 15 days in case of any unwanted situations!
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

    <div
      class="z-[1] h-1 relative w-full bg-white flex justify-center items-center"
    >
      <NuxtLink
        to="#products"
        class="p-3 rounded-full shadow-md hover:scale-110 hover:shadow-black/20 active:scale-90 transition-all duration-200 bg-white"
      >
        <IconsArrowDown />
      </NuxtLink>
    </div>

    <section
      class="pt-20 px-24 max-xl:px-10 max-md:px-6 bg-gradient-to-b from-primary to-slate-100 space-y-28"
    >
      <div class="flex flex-col justify-center items-center space-y-6">
        <h1 class="text-3xl font-bold text-white tracking-wide text-center">
          How It Works
        </h1>
        <p class="text-white text-center font-medium max-w-[1200px]">
          Welcome to our seamless e-commerce platform! Discover the easiest
          shopping experience with just three simple steps: Browse our diverse
          collection, add desired items to your cart, and securely checkout to
          have your products delivered right to your doorstep. Shop smart and
          hassle-free today!
        </p>
      </div>
      <div class="px- flex flex-wrap w-full justify-center gap-x-10 gap-y-14">
        <div
          v-for="card in howDoesItWorkCards"
          :key="card"
          class="p-10 relative flex flex-shrink min-w-52 flex-1 flex-col bg-white max-w-[350px] min-h-[450px] justify-around items-center box-content rounded-md shadow-md shadow-black/20 text-slate-600 font-bold"
        >
          <div
            class="w-16 h-16 -mt-8 top-0 text-xl absolute flex items-center justify-center outline outline-6 bg-white outline-white border-5 border-primary rounded-full text-primary"
          >
            {{ card.phase }}
          </div>
          <nuxt-img
            :src="card.image"
            quality="80"
            format="webp"
            height="200"
            class="drop-shadow-lg"
          />
          <div class="flex flex-col items-center">
            <h2>{{ card.title }}</h2>
            <p
              class="text-center font-semibold mt-4 leading-5.5 tracking-tight"
            >
              {{ card.details }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      id="products"
      class="px-24 pt-32 pb-10 max-xl:px-10 max-md:px-6"
    >
      <div
        class="pb-4 flex items-center justify-between border-b-1 max-md:flex-col max-md:border-none"
      >
        <h1
          class="text-gray-500 font-bold text-xl max-md:border-b-1 max-md:w-full max-md:mb-4 max-md:pb-4 max-md:border-gray-300"
        >
          Our Products
        </h1>
        <div
          @mouseenter="hoveringElement = 'search'"
          @mouseleave="hoveringElement = null"
          class="w-72 max-md:w-full relative flex items-center"
        >
          <input
            @keypress.enter="store.commit('searchProducts', searchQuery)"
            type="text"
            placeholder="Search a product..."
            class="py-2 max-md:py-3 pr-10 pl-12 rounded-xl border-1 border-gray-200 w-full placeholder:text-gray-300 outline-none transition-all duration-300 focus:shadow-md hover:shadow-md focus:border-transparent hover:border-transparent text-gray-500 font-medium max-md:text-lg"
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

      <button
        @click="isFiltersMenuVisible = !isFiltersMenuVisible"
        class="px-8 py-3 w-full md:hidden text-primary font-medium flex justify-center items-center gap-x-4 rounded-xl border shadow bg-white hover:bg-primary hover:text-white active:scale-90 transition-all duration-200"
      >
        <IconsFilter />
        Filter Products
      </button>
      <button
        @click="isFiltersMenuVisible = !isFiltersMenuVisible"
        class="w-screen h-screen fixed top-0 left-0 bg-black/70 z-[2] transition-all duration-300 md:hidden"
        :class="[
          isFiltersMenuVisible ? 'visible opacity-100' : 'invisible opacity-0',
        ]"
      />

      <div class="mt-8 flex gap-x-8 text-gray-300 font-bold">
        <aside
          class="z-[3] transition-all duration-300 bg-slate-100 max-md:py-4 max-md:px-6 max-md:w-full max-md:fixed max-md:bottom-0 max-md:left-0 max-md:rounded-t-2xl"
          :class="[
            !isFiltersMenuVisible
              ? 'max-md:translate-y-full'
              : 'max-md:translate-y-0',
          ]"
        >
          <h1 class="max-md:text-gray-500">FILTER PRODUCTS</h1>
          <hr
            class="mt-3 mb-4 border-gray-200 max-md:border-primary/50 max-md:border-1"
          />
          <div
            class="pr-6 w-max max-md:w-full max-h-[600px] max-md:max-h-[calc(100vh-300px)] overflow-y-auto"
          >
            <div class="space-y-2">
              <h2 class="text-gray-500">Price - $</h2>
              <div class="flex gap-x-2">
                <div
                  v-for="price in priceFilters"
                  :key="price"
                  class="flex gap-x-2 w-full"
                  :class="[
                    price.label === 'Min' &&
                      `after:content-['-'] after:text-gray-400`,
                  ]"
                >
                  <input
                    @keypress.e.prevent
                    @keypress.+.prevent
                    @keypress.-.prevent
                    type="number"
                    v-model="price.value"
                    :placeholder="price.label"
                    class="w-20 max-md:w-full py-1 px-2 rounded-md border-1 border-gray-300 outline-none placeholder:text-sm placeholder:font-medium text-gray-500"
                  />
                </div>
              </div>
            </div>

            <hr class="my-4 border-gray-300" />

            <div class="space-y-2">
              <h2 class="text-gray-500">Rating</h2>
              <div class="flex flex-col gap-y-2">
                <div class="max-md:space-y-1">
                  <div
                    v-for="rate in ratingFilters"
                    :key="rate"
                    class="flex gap-x-2 min-w-max"
                  >
                    <input
                      :id="rate.label"
                      name="rating"
                      type="radio"
                      class="accent-primary"
                      :value="rate.value"
                    />
                    <label
                      :for="rate.label"
                      class="text-gray-500 font-semibold"
                      >{{ rate.label }}</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <hr class="my-4 border-gray-300" />

            <div class="space-y-2">
              <h2 class="text-gray-500">Categories</h2>
              <div
                class="max-md:grid max-md:grid-cols-2 max-md:gap-y-1 max-md:gap-x-4"
              >
                <ClientOnly>
                  <div
                    v-for="category in categories()"
                    :key="category.label"
                    class="flex gap-x-2 min-w-max"
                  >
                    <input
                      :id="category.label"
                      type="checkbox"
                      class="accent-primary"
                      :value="category.value"
                    />
                    <label
                      :for="category.label"
                      class="text-gray-500 font-semibold"
                      >{{ category.label }}</label
                    >
                  </div>
                </ClientOnly>
              </div>
            </div>
          </div>

          <hr
            class="mt-4 border-gray-200 max-md:border-primary/50 max-md:border-1"
          />

          <button
            class="w-full py-2 px-6 mt-4 rounded-lg shadow shadow-black/20 bg-primary text-white hover:scale-95 active:scale-100 transition-all duration-200"
          >
            Apply Filters
          </button>
        </aside>

        <div class="w-full max-md:border-t max-md:border-gray-300 max-md:pt-4">
          <ClientOnly>
            <p class="text-gray-400 font-bold mb-6">
              {{ products().length }} Results
            </p>
          </ClientOnly>
          <ul class="h-full flex flex-wrap gap-4">
            <li
              v-if="products().length === 0 && isFetching() === false"
              class="px-10 w-full flex flex-col justify-center items-center space-y-4 text-xl font-bold text-gray-400"
            >
              <IconsWorkInProgress />
              <p>No related products have been found...</p>
            </li>
            <li
              v-else-if="isFetching() === true"
              v-for="duplicate in 12"
              :key="duplicate"
              class="flex-1"
            >
              <productCardSkeleton />
            </li>
            <ClientOnly>
              <li
                v-if="!isFetching()"
                v-for="product in products()"
                :key="product"
                @mouseenter="hoveringElement = product"
                @mouseleave="hoveringElement = null"
                class="flex-1 h-fit min-w-52 max-w-80 max-md:min-w-40 font-bold bg-white rounded-lg shadow-lg"
              >
                <div class="overflow-hidden rounded-t-lg relative">
                  <lazyImage
                    :src="product?.thumbnail"
                    format="webp"
                    quality="80"
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
                    <NuxtRating
                      :ratingValue="product.rating"
                      ratingSize="20px"
                      activeColor="#FF8B14"
                      class="w-24"
                    />
                    <p class="text-gray-400 text-sm">
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
        </div>
      </div>
    </section>
    <NuxtLink to="/products?page=1">go to products page</NuxtLink>
  </main>
</template>
