const config = useRuntimeConfig();

export default defineEventHandler(async () => {
  async function getAllProducts() {
    return await $fetch(`${config.API_URL}/products?limit=0&skip=0`, {
      method: 'GET',
    }).catch((error) => {
      return error;
    });
  }

  return await getAllProducts();
});
