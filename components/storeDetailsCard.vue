<script setup>
  const tabs = [
    {
      text: 'Name : E-Shippr',
      iconName: 'text',
    },
    {
      text: 'Rated by : 812 People',
      iconName: 'chart',
    },
    {
      text: 'Score Average : 9.9 / 10',
      iconName: 'favourite',
    },
    {
      text: 'Successfull Sales : 2356',
      iconName: 'customer',
    },
    {
      text: 'Ask To Store',
      iconName: 'pen',
    },
  ];
</script>

<template>
  <div class="w-full rounded-md shadow-md bg-white overflow-hidden">
    <div class="px-7 py-3 flex justify-between items-center bg-gray-200 border-b border-gray-300">
      <h2 class="flex text-gray-600 font-semibold gap-x-2">
        <IconsStore />
        Store Details
      </h2>
      <p class="h-fit px-2 py-0.5 text-sm font-bold text-white bg-green-500 rounded-md">9.9</p>
    </div>
    <div class="px-7 py-4 text-gray-600 font-medium flex flex-col gap-y-2">
      <div
        v-for="tab in tabs"
        :key="tab"
        class="flex gap-x-2"
        :class="{ 'pb-2 mt-4 text-orange-600 cursor-pointer': tabs.at(-1) === tab }"
      >
        <DynamicIconRenderer
          :iconName="tab.iconName"
          class="w-6 stroke-gray-500"
        />
        <p>{{ tab.text }}</p>
      </div>
    </div>
  </div>
</template>
