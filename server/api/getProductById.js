const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const queries = getQuery(event);

  async function getProductById() {
    return await $fetch(
      `${config.API_URL}/products/${queries.productId}`
    ).catch((error) => error);
  }

  return await getProductById();
});
