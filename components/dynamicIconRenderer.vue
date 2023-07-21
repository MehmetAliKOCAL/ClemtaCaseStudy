<script setup>
  import { defineAsyncComponent } from 'vue';
  const props = defineProps({
    iconName: {
      type: String,
      required: true,
    },
  });

  function dynamicImport() {
    return defineAsyncComponent(() => import(`./icons/${props.iconName}.vue`));
  }
</script>

<template>
  <div>
    <component :is="dynamicImport()" />
  </div>
</template>
