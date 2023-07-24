const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { searchQuery, page, pageSize } = getQuery(event);
  const skipAmount = (parseInt(page) - 1) * pageSize;

  async function searchProducts() {
    return await $fetch(
      `${config.API_URL}/products/?title=${searchQuery}&offset=${skipAmount}&limit=${pageSize}`
    ).catch((error) => {
      return error;
    });
  }

  return await searchProducts();
});
