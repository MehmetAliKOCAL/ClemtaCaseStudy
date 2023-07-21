<template>
  <div class="w-[200px] overflow-hidden rounded-md">
    <div
      class="h-[200px] rounded-md animate-shimmer bg-gradient-to-r from-transparent via-gray-200 to-transparent"
    />
    <div
      v-for="duplicate in 3"
      :key="duplicate + 'secret'"
      class="mt-4 h-[15px] rounded-xl animate-shimmer bg-gradient-to-r from-transparent via-gray-200 to-transparent"
    />
  </div>
</template>
