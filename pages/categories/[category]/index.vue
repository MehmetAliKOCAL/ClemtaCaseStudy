<script setup>
  const route = useRoute();
  const store = useStore();
  const selectedCategory = route.params.category;
  onBeforeMount(() => {
    store.commit('getProductsOfCategory', selectedCategory);
  });

  function capitalize(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  }
  definePageMeta({
    title: capitalize(selectedCategory),
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
