<script setup>
  const store = useStore();
  const router = useRouter();
  const routeTo = () => store.state.routeTo;
  const updateUserCookie = () => store.state.updateUserCookie;
  const userCookie = useCookie('userData');
  const isBeingHovered = ref(false);
  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: false,
      default: true,
    },
  });

  function addToCart(product, amount) {
    store.commit('addToCart', { user: userCookie.value, product, amount });
    if (routeTo() !== '') {
      router.push(routeTo());
      store.commit('updateRouteToState', '');
    }
    if (updateUserCookie()) {
      userCookie.value = store.state.loggedInUser;
      store.commit('updateUserCookieState', false);
    }
  }
</script>

<template>
  <div
    v-if="props.isVisible"
    @mouseenter="isBeingHovered = true"
    @mouseleave="isBeingHovered = false"
    class="min-w-52 max-w-80 max-md:min-w-40 font-bold bg-white rounded-lg"
  >
    <div class="overflow-hidden rounded-t-lg relative">
      <NuxtLink :to="`/productDetails/${product.id}`">
        <NuxtLazyImage
          :src="
            props.product.images.length !== 0
              ? props.product.images[0]
              : '/dummyProductImage.webp'
          "
          :alt="props.product.title"
          format="webp"
          quality="80"
          class="transition-all duration-300"
          :class="[
            isBeingHovered ? 'scale-125 opacity-70' : 'scale-100 opacity-100',
          ]"
      /></NuxtLink>
      <div
        class="flex items-end justify-end transition-all duration-200 max-md:opacity-100 max-md:visible"
        :class="[
          isBeingHovered ? ' opacity-100 visible' : 'opacity-0 invisible',
        ]"
      >
        <button
          @click="addToCart(props.product, 1)"
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
    <NuxtLink
      :to="`/productDetails/${product.id}`"
      class="p-4 block"
    >
      <p class="text-gray-700 line-clamp-2 leading-5">
        {{ props.product.title }}
      </p>
      <p class="text-sm text-gray-500 line-clamp-2">
        {{ props.product.category.name }}
      </p>
      <div class="flex justify-between items-center">
        <p class="font-semibold text-sm text-gray-400 line-clamp-1">
          5 In Stock
        </p>
        <p class="text-gray-800">{{ '$' + props.product.price }}</p>
      </div>
    </NuxtLink>
  </div>
</template>
