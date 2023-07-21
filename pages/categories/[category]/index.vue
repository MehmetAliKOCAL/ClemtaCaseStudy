<script setup>
  const route = useRoute();
  const store = useStore();

  onMounted(() => {
    store.commit('getProductsOfCategory', route.params.category);
  });

  definePageMeta({
    title: 'See Products',
  });
</script>
<template>
  <div>
    <div
      v-for="product in store.state.products"
      :key="product"
    >
      <p>{{ product.title }}</p>
    </div>
  </div>
</template>
