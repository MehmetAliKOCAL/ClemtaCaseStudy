<script setup>
  const store = useStore();
  store.commit('getAllProducts');
  store.commit('getAllCategories');

  String.prototype.capitalize = function () {
    return this.at(0).toUpperCase() + this.slice(1);
  };
</script>

<template>
  <div>
    <!-- <loadingIndicator /> -->
    <Header />
    <slot />
  </div>
</template>
