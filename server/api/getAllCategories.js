const config = useRuntimeConfig();

export default defineEventHandler(async () => {
  async function getAllCategories() {
    return await $fetch(`${config.API_URL}/categories`).catch((error) => {
      return error;
    });
  }

  return await getAllCategories();
});
