<script setup>
  const route = useRoute();
</script>

<template>
  <NuxtLayout>
    <Title>{{ route.meta.title + ' | E-Shippr' }}</Title>
    <Meta
      propert="og:title"
      :content="route.meta.title + ' | E-Shippr'"
    />
    <Meta
      propert="twitter:title"
      :content="route.meta.title + ' | E-Shippr'"
    />
    <NuxtPage />
  </NuxtLayout>
</template>
