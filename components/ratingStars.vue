<script setup>
  const props = defineProps({
    rate: {
      type: String,
      required: true,
      default: '5',
    },
  });
</script>

<template>
  <div>
    <div class="w-[120px] h-[24px] relative bg-gray-400">
      <progress
        class="rating-progressBar w-full h-[24px] text-primary appearance-none border-none inline-block"
        :value="props.rate"
        max="5"
      ></progress>
      <svg class="absolute w-full h-full top-0 left-0">
        <use xlink:href="#symbols" />
      </svg>
    </div>
    <svg class="hidden">
      <defs>
        <symbol id="symbols">
          <path
            v-for="star in 5"
            :key="star"
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z M0 0 h24 v24 h-24 v-24"
            fill="white"
            fill-rule="evenodd"
            :transform="`translate(${24 * (star - 1)})`"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>
