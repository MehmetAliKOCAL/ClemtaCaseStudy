import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      products: [],
      categories: [],
      users: [],
      isFetching: false,
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

    async getAllProducts(state) {
      state.isFetching = true;
      const { products } = await $fetch('/api/getAllProducts').catch(
        (error) => error
      );
      state.products = products;
      state.isFetching = false;
    },

    async getProductsOfCategory(state, category) {
      state.isFetching = true;
      const { products } = await $fetch(`/api/${category}/getProducts`).catch(
        (error) => error
      );
      state.products = products;
      state.isFetching = false;
    },

    async searchProducts(state, searchQuery) {
      state.isFetching = true;
      const { products } = await $fetch(
        `/api/searchProducts?query=${searchQuery}`
      ).catch((error) => error);
      state.products = products;
      state.isFetching = false;
    },

    async getUsers(state) {
      console.log(localStorage.getItem('users'));
    },
  },
});
