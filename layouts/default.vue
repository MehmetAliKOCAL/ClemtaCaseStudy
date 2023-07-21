<script setup>
  const store = useStore();
  store.commit('getAllProducts');
  store.commit('getAllCategories');
</script>

<template>
  <div>
    <!-- <loadingIndicator /> -->
    <Header />
    <slot />
  </div>
</template>
