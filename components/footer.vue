<script setup>
  const store = useStore();
  store.commit('getAllCategories');
  const categories = () => store.state.categories;
  const currentYear = new Date().getFullYear();
  const policies = [
    {
      label: 'Conditions of Use',
      href: '/',
    },
    {
      label: 'Privacy Notice',
      href: '/',
    },
  ];
  const privileges = [
    {
      explanation: 'Chance To Earn Coupons on Every Purchase',
      iconName: 'coupon',
    },
    {
      explanation: 'New Products and Opportunities Every Week',
      iconName: 'favourite',
    },
    {
      explanation: 'Payment Methods Suitable for Everyone',
      iconName: 'creditCard',
    },
    {
      explanation: 'Easy Product Exchange and Return',
      iconName: 'return',
    },
  ];

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
</script>

<template>
  <div>
    <button
      @click="scrollTop"
      class="w-full py-2 px-6 font-medium text-sm shadow-sm shadow-gray-400 bg-primary text-white hover:opacity-80 transition-all duration-200"
      title="Scroll to top"
    >
      Back To Top
    </button>

    <footer
      class="pb-10 px-24 max-xl:px-10 max-md:px-6 text-sm text-gray-500 bg-white"
    >
      <div
        class="py-10 border-b grid grid-cols-4 max-2xl:grid-cols-2 max-md:grid-cols-1 max-2xl:gap-y-5"
      >
        <div
          v-for="privilege in privileges"
          :key="privilege"
          class="flex items-center justify-center font-semibold text-lg gap-x-4 text-gray-800"
        >
          <DynamicIconRenderer
            :iconName="privilege.iconName"
            class="p-3.5 w-9 h-9 stroke-primary border-3 border-primary rounded-full box-content shrink-0"
          />
          <p class="w-[220px]">{{ privilege.explanation }}</p>
        </div>
      </div>

      <figure>
        <figcaption
          class="text-gray-700 pb-4 pt-6 font-bold text-base text-center"
        >
          Catalog
        </figcaption>
        <nav>
          <div class="pb-6 flex flex-col gap-y-1 items-center font-semibold">
            <ClientOnly>
              <NuxtLink
                v-for="category in categories()"
                :key="category"
                :to="'/categories/' + category.id"
                class="hover:text-primary transition-colors duration-200"
                :title="category.name"
              >
                {{ category.name }}
              </NuxtLink>
            </ClientOnly>
          </div>

          <div
            class="mb-2 pt-6 flex gap-x-6 justify-center items-center border-t text-center"
          >
            <NuxtLink
              v-for="policy in policies"
              :key="policy"
              :to="policy.href"
              class="hover:underline hover:text-black"
              :title="`View ${policy.label}`"
              >{{ policy.label }}</NuxtLink
            >
          </div>
        </nav>
      </figure>

      <p class="w-full flex gap-x-6 justify-center items-center text-xs">
        {{ `Copyright © ${currentYear} E-Shippr Inc. or its affiliates` }}
      </p>
    </footer>
  </div>
</template>
