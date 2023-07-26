<script setup>
  const store = useStore();
  const loggedInUser = () => JSON.parse(localStorage.getItem('loggedInUser'));
  onMounted(() => {
    if (loggedInUser() !== null) {
      store.commit('updateLoggedInUserState', loggedInUser());
    }
  });
  String.prototype.capitalize = function () {
    return this.at(0).toUpperCase() + this.slice(1);
  };
</script>

<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
