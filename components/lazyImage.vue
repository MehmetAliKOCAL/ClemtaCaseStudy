<script setup>
  const props = defineProps({
    src: {
      type: String,
      required: true,
      default: '',
    },
    alt: {
      type: String,
      required: false,
      default: 'image',
    },
    width: {
      type: String,
      required: false,
      default: '250',
    },
    height: {
      type: String,
      required: false,
      default: '250',
    },
    quality: {
      type: String,
      required: false,
      default: '80',
    },
  });
</script>

<template>
  <div class="w-fit h-fit">
    <div
      v-if="props.src === ''"
      class="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent"
    />
    <nuxt-img
      v-else
      :quality="props.quality"
      :height="props.height"
      :width="props.width"
      :src="props.src"
      :alt="props.alt"
      format="webp"
    />
  </div>
</template>
