const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);
  async function searchProducts() {
    return await $fetch(`${config.API_URL}/products/search?q=${query}`, {
      method: 'GET',
    }).catch((error) => {
      return error;
    });
  }

  return await searchProducts();
});
