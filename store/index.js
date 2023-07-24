import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      isFetching: false,
      categories: [],
      products: [],
    };
  },

  mutations: {
    async getAllCategories(state) {
      state.isFetching = true;
      state.categories = await $fetch('/api/getAllCategories').catch(
        (error) => error
      );
      state.isFetching = false;
    },

    async getProducts(state, queries) {
      const filters = queries?.filters || {};
      const price = filters.price || {};

      state.isFetching = true;
      state.products = await $fetch(
        `/api/getPaginatedAndFilteredProducts?page=${
          queries?.page || 1
        }&pageSize=${queries?.pageSize || 16}&minVal=${
          price.min || ''
        }&maxVal=${price.max || ''}&category=${filters.category || ''}`
      ).catch((error) => error);
      state.isFetching = false;
    },

    async searchProducts(state, queries) {
      const searchQuery = queries?.searchQuery || '';
      const page = queries?.page || 1;
      const pageSize = queries?.pageSize || 16;

      state.isFetching = true;
      state.products = await $fetch(
        `/api/searchProducts?searchQuery=${searchQuery}&page=${page}&pageSize=${pageSize}`
      ).catch((error) => error);
      state.isFetching = false;
    },
  },
});
