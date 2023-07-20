const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const selectedCategory = event.context.params.category;
  async function getProducts() {
    return await $fetch(
      `${config.API_URL}/products/category/${selectedCategory}`,
      {
        method: 'GET',
      }
    ).catch((error) => {
      return error;
    });
  }

  return await getProducts();
});
