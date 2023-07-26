<script setup>
  const store = useStore();
  const sortedBy = () => store.state.sortedBy;
  const isSortingMenuVisible = ref(false);
  const sortingMethods = [
    { label: 'Price Ascending', sortBy: 'price', type: 'asc' },
    { label: 'Price Descending', sortBy: 'price', type: 'desc' },
    { label: 'Name Ascending', sortBy: 'title', type: 'asc' },
    { label: 'Name Descending', sortBy: 'title', type: 'desc' },
  ];

  function sortProducts(sortBy) {
    store.commit('sortProducts', sortBy);
  }
</script>

<template>
  <div class="w-72 relative text-gray-500 max-md:w-full">
    <button
      @click="isSortingMenuVisible = !isSortingMenuVisible"
      class="py-2 max-md:py-3 px-6 w-full flex items-center justify-center gap-x-2 bg-white rounded-xl border shadow text-sm max-md:text-base"
    >
      <IconsSort class="w-4 max-md:w-5" />
      <p class="max-md:font-medium">
        {{ `Sorted by ${sortedBy().label}` }}
      </p>
    </button>
    <div
      class="z-[3] p-6 w-full absolute bg-white min-h-max space-y-4 rounded-md shadow font-medium"
      :class="[isSortingMenuVisible ? 'block' : 'hidden']"
    >
      <button
        v-for="sortingMethod in sortingMethods"
        :key="sortingMethod.label"
        @click="sortProducts(sortingMethod)"
        class="block hover:font-bold"
        :class="[
          sortedBy().label === sortingMethod.label
            ? 'text-primary'
            : 'hover:text-gray-700',
        ]"
      >
        {{ sortingMethod.label }}
      </button>
    </div>
  </div>
</template>
