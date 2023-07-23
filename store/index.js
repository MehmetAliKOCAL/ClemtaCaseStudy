import { createStore } from 'vuex';

export const store = createStore({
  state() {
    return {
      isFetching: false,
      categories: [],
      products: [],
      users: [],
    };
  },

  mutations: {
    async getAllCategories(state) {
      state.isFetching = true;
      state.categories = await $fetch('/api/getAllCategories').catch(
        (error) => error
      );
      this.dispatch('addNamesToCategories');
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

  actions: {
    async addNamesToCategories() {
      const categories = this.state.categories;
      const categoryNames = await this.dispatch(
        'generateCapitalizedCategoryNames'
      );

      const namedCategories = {};
      for (let index = 0; index < categories.length; index++) {
        namedCategories[index] = {
          label: categoryNames[index],
          value: categories[index],
        };
      }
      this.state.categories = namedCategories;
    },

    async generateCapitalizedCategoryNames() {
      const categories = this.state.categories;
      return await Promise.all(
        categories.map((category) => {
          return category.split('-').join(' ').capitalize();
        })
      );
    },
  },
});
