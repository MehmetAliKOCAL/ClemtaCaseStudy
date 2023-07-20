<script setup>
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const queries = route.query;
  const currentPage = ref(queries.page);
  const isLastPage = ref(true);

  function paginate(products) {
    let singlePage = [];
    const allPages = [];
    const totalItemCount = products.length;
    const pageSize = 10;
    const totalPageCount = Math.floor(totalItemCount / pageSize);
    const leftoverItemsCount = totalItemCount % pageSize;
    isLastPage.value =
      Math.ceil(totalItemCount / pageSize) === parseInt(currentPage.value);

    for (let pageNumber = 0; pageNumber < totalPageCount; pageNumber++) {
      for (let itemCount = 0; itemCount < pageSize; itemCount++) {
        const itemIndex = itemCount + pageNumber * pageSize;
        singlePage.push(...products.slice(itemIndex, itemIndex + 1));
      }
      allPages.push(singlePage);
      singlePage = [];
    }

    if (leftoverItemsCount !== 0) {
      singlePage.push(
        ...products.slice(totalItemCount - leftoverItemsCount, totalItemCount)
      );
      allPages.push(singlePage);
    }

    return allPages;
  }
</script>

<template>
  <div>
    <!-- {{ store.state.products }}
    {{ store.state.categories }} -->
    <NuxtLink to="/">go to index</NuxtLink>
    <div
      v-for="product in paginate(store.state.products)[currentPage - 1]"
      :key="product"
      class="w-full"
    >
      <lazyImage
        :src="product.thumbnail"
        :alt="product.title"
      />{{ product.title }} {{ product.description }}
    </div>
    <button
      @click="
        currentPage >= 2 && router.push(`/products?page=${--currentPage}`)
      "
      class="p-1"
      :class="{ 'opacity-30 cursor-not-allowed': currentPage < 2 }"
    >
      <IconsArrowLeft />
    </button>
    <button
      @click="!isLastPage && router.push(`/products?page=${++currentPage}`)"
      class="p-1"
      :class="{ 'opacity-30 cursor-not-allowed': isLastPage }"
    >
      <IconsArrowRight />
    </button>
  </div>
</template>
