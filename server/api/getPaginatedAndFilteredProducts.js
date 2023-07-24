const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const queries = getQuery(event);
  const pageSize = queries.pageSize;
  const page = parseInt(queries.page) - 1;

  async function getPaginatedProducts() {
    return await $fetch(
      `${config.API_URL}/products/?categoryId=${queries.category}&price_min=${
        queries.minVal
      }&price_max=${queries.maxVal}&offset=${page * pageSize}&limit=${pageSize}`
    ).catch((error) => error);
  }

  return await getPaginatedProducts();
});
