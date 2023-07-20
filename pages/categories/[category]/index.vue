<script setup>
  const route = useRoute();
  const store = useStore();
  onBeforeMount(() => {
    store.commit('getProductsOfCategory', route.params.category);
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
