<script setup>
  String.prototype.capitalize = function () {
    return this.at(0).toUpperCase() + this.slice(1);
  };
</script>

<template>
  <div>
    <!-- <loadingIndicator /> -->
    <Header />
    <slot />
    <Footer />
  </div>
</template>
