import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      products: [],
      categories: [],
      searchResults: [],
      users: [],
    };
  },

  mutations: {
    async getAllCategories(state) {
      state.categories = await $fetch('/api/getAllCategories').catch(
        (error) => error
      );
    },

    async getAllProducts(state) {
      const { products } = await $fetch('/api/getAllProducts').catch(
        (error) => error
      );
      state.products = products;
    },

    async getProductsOfCategory(state, category) {
      const { products } = await $fetch(`/api/${category}/getProducts`).catch(
        (error) => error
      );
      state.products = products;
    },

    async searchProducts(state, searchQuery) {
      const { products } = await $fetch(
        `/api/searchProducts?query=${searchQuery}`
      ).catch((error) => error);
      state.searchResults = products;
    },

    async getUsers(state) {
      console.log(localStorage.getItem('users'));
    },
  },
});
