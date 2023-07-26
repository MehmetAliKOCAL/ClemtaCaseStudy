<script setup>
  const store = useStore();
  const route = useRoute();
  const productId = route.params.productId;
  const product = () => store.state.productDetails;
  const images = () => product().images;
  const imageToShow = ref(0);

  store.commit('getProductById', productId);
  definePageMeta({
    title: 'Product Details',
  });
</script>

<template>
  <div class="py-24 px-24 max-xl:px-10 max-md:px-6">
    <LoadingIndicator />
    <ClientOnly>
      <main class="flex gap-x-14">
        <section class="shrink-0 flex flex-col items-center">
          <NuxtLazyImage
            :src="images()[imageToShow]"
            :alt="product().title"
            format="webp"
            quality="80"
            class="rounded-[4px] shadow-md w-[640px] aspect-auto overflow-hidden"
          />

          <div class="flex space-x-4 mt-4">
            <button
              @click="imageToShow = images().indexOf(image)"
              v-for="image in images()"
              :key="image"
              class="rounded-md overflow-hidden shadow hover:opacity-70 transition-all duration-200 border-3"
              :class="[
                imageToShow === images().indexOf(image)
                  ? 'border-primary'
                  : 'border-gray-300',
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

        <section class="space-y-4">
          <h1 class="h-fit line-clamp-2 text-3xl font-semibold">
            {{ product().title }}
          </h1>
          <p>{{ product().description }}</p>
          <p class="font-bold text-4xl">{{ `$${product().price}` }}</p>
          <button class="block">add to cart</button>
          <button class="block">wishlist this item</button>
        </section>
      </main>
    </ClientOnly>
  </div>
</template>
