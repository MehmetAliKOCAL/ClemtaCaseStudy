const config = useRuntimeConfig();

export default defineEventHandler(async () => {
  async function getAllCategories() {
    return await $fetch(`${config.API_URL}/categories`, {
      method: 'GET',
    }).catch((error) => {
      return error;
    });
  }

  return await getAllCategories();
});
