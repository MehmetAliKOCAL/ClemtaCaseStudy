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
      default: '',
    },
    height: {
      type: String,
      required: false,
      default: '',
    },
    quality: {
      type: String,
      required: false,
      default: '80',
    },
  });
</script>

<template>
  <div
    :style="[
      props.width === '' && props.height === '' && 'aspect-ratio:1/1',
      props.width !== '' && `width:${props.width}px`,
      props.height !== '' && `height:${props.height}px`,
    ]"
  >
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
      loading="lazy"
      class="w-full h-full object-cover"
    />
  </div>
</template>
