<script setup>
  const store = useStore();
  store.commit('getAllProducts');
  store.commit('getAllCategories');
</script>

<template>
  <div>
    <slot />
  </div>
</template>
