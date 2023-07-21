<script setup>
  const store = useStore();
</script>
<template>
  <div
    class="w-screen h-screen bg-black/50 fixed top-0 transition-all duration-300 flex items-center justify-center z-20"
    :class="[
      store.state.isFetching ? 'opacity-100 visible' : 'opacity-0 invisible',
    ]"
  >
    <div
      class="w-4 p-5 bg-transparent rounded-full border-4 border-white/20 border-t-white animate-spin"
    />
  </div>
</template>
