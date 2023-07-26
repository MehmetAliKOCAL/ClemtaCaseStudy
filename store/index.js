import { createStore } from 'vuex';
const toast = useToast();

export const store = createStore({
  state() {
    return {
      isFetching: false,
      routeTo: '',
      categories: [],
      productDetails: [],
      products: [],
      sortedBy: {
        label: 'Price Ascending',
        sortBy: 'price',
        type: 'asc',
      },
      loggedInUser: null,
    };
  },

  mutations: {
    async getAllCategories(state) {
      state.isFetching = true;
      state.categories = await $fetch('/api/getAllCategories').catch((error) => error);
      state.isFetching = false;
    },

    async getProductById(state, productId) {
      state.productDetails = await $fetch(`/api/getProductById?productId=${productId}`).catch(
        (error) => error
      );
    },

    async getProducts(state, queries) {
      const filters = queries?.filters || {};
      const price = filters.price || {};

      state.isFetching = true;
      state.products = await $fetch(
        `/api/getPaginatedAndFilteredProducts?page=${queries?.page || 1}&pageSize=${
          queries?.pageSize || 12
        }&minVal=${price.min || ''}&maxVal=${price.max || ''}&category=${filters.category || ''}`
      ).catch((error) => error);

      this.commit('sortProducts', state.sortedBy);
      state.isFetching = false;
    },

    async searchProducts(state, queries) {
      const searchQuery = queries?.searchQuery || '';
      const page = queries?.page || 1;
      const pageSize = queries?.pageSize || 12;

      state.isFetching = true;
      state.products = await $fetch(
        `/api/searchProducts?searchQuery=${searchQuery}&page=${page}&pageSize=${pageSize}`
      ).catch((error) => error);

      this.commit('sortProducts', state.sortedBy);
      state.isFetching = false;
    },

    sortProducts(state, sortingMethod) {
      state.sortedBy = sortingMethod;
      let firstCase;
      let secondCase;

      switch (sortingMethod.type) {
        case 'asc':
          firstCase = 1;
          secondCase = -1;
          break;
        case 'desc':
          firstCase = -1;
          secondCase = 1;
          break;
      }

      state.products.sort((a, b) => {
        if (a[sortingMethod.sortBy] > b[sortingMethod.sortBy]) return firstCase;
        else if (a[sortingMethod.sortBy] < b[sortingMethod.sortBy]) return secondCase;
        else return 0;
      });
    },

    updateRouteToState(state, newRoute) {
      state.routeTo = newRoute;
    },

    updateLoggedInUserState(state, newValue) {
      state.loggedInUser = newValue;
    },

    register(state, registrationData) {
      let updatedUsersArray;
      const users = () => JSON.parse(localStorage.getItem('users'));
      let isUserAlreadyRegistered = (user) => user.email === registrationData.email;
      function registerUser(store) {
        localStorage.setItem('users', JSON.stringify(updatedUsersArray));
        toast.success("You've successfully registered!");
        store.commit('updateRouteToState', '/login');
      }
      function throwAlreadyRegisteredError() {
        toast.error('This e-mail is already in use');
      }

      if (users() === null) {
        updatedUsersArray = [registrationData];
        registerUser(this);
      } else if (users().some(isUserAlreadyRegistered)) {
        throwAlreadyRegisteredError();
      } else {
        updatedUsersArray = [...users(), registrationData];
        registerUser(this);
      }
    },

    login(state, loginData) {
      const users = () => JSON.parse(localStorage.getItem('users'));
      function throwNoUsersError(store) {
        toast.error('No account have been found, please register first');
        store.commit('updateRouteToState', '/register');
      }
      function login(store, user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        store.commit('updateLoggedInUserState', user);
        store.commit('updateRouteToState', '/');
        toast.success(`Welcome back, ${user.name.capitalize()}!`);
      }
      function throwInvalidCredentialsError() {
        toast.error('E-mail or password is incorrect');
      }

      if (users() === null) throwNoUsersError(this);
      else {
        const isLoginDataValid = users().some((user) => {
          const isMatching = user.email === loginData.email && user.password === loginData.password;
          if (isMatching) login(this, user);
          return isMatching;
        });
        if (!isLoginDataValid) throwInvalidCredentialsError();
      }
    },

    manageAddingToCart(state, payload) {
      let loggedInUser = payload.user;
      function throwNotLoggedInError(store) {
        toast.error('Please login to use cart');
        store.commit('updateRouteToState', '/login');
      }
      function addProductToCart(store) {
        loggedInUser.cart.push({ details: payload.product, amount: payload.amount });
        store.commit('saveCartChangesOnLocalStorage', {
          message: 'Product added to the cart',
          loggedInUser,
        });
      }
      function throwStockError() {
        toast.error("Due to insufficient stock, you can't have more than 5 of this item");
      }
      function addOneQuantityToProduct(store, itemIndex) {
        loggedInUser.cart[itemIndex].amount++;
        store.commit('saveCartChangesOnLocalStorage', {
          message: 'Added 1 more quantity to the cart',
          loggedInUser,
        });
      }

      if (payload.user === null) {
        throwNotLoggedInError(this);
      } else {
        let productOnCart = null;
        payload.user.cart.some((product) => {
          if (product.details.id === payload.product.id) {
            productOnCart = { details: product, index: payload.user.cart.indexOf(product) };
          }
        });
        if (productOnCart === null) {
          addProductToCart(this);
        } else if (productOnCart.details.amount >= 5) {
          throwStockError();
        } else {
          addOneQuantityToProduct(this, productOnCart.index);
        }
      }
    },

    manageRemovingFromCart(state, payload) {
      let loggedInUser = payload.user;
      function throwNotLoggedInError(store) {
        toast.error('Please login to use cart');
        store.commit('updateRouteToState', '/login');
      }
      function throwAlreadyRemovedError() {
        toast.info("This product already isn't in the cart");
      }
      function removeProductFromCart(store, itemIndex) {
        loggedInUser.cart.splice(itemIndex, 1);
        store.commit('saveCartChangesOnLocalStorage', {
          message: 'Product successfully removed from the cart',
          loggedInUser,
        });
      }
      function reduceQuantityOfProduct(store, itemIndex) {
        loggedInUser.cart[itemIndex].amount--;
        store.commit('saveCartChangesOnLocalStorage', {
          message: 'Removed 1 quantity from the cart',
          loggedInUser,
        });
      }

      if (payload.user === null) {
        throwNotLoggedInError(this);
      } else {
        let productOnCart = null;
        payload.user.cart.some((product) => {
          if (product.details.id === payload.product.id) {
            productOnCart = { details: product, index: payload.user.cart.indexOf(product) };
          }
        });
        if (productOnCart === null) {
          throwAlreadyRemovedError();
        } else if (productOnCart.details.amount === 1 || payload.removeCompletely) {
          removeProductFromCart(this, productOnCart.index);
        } else {
          reduceQuantityOfProduct(this, productOnCart.index);
        }
      }
    },

    saveCartChangesOnLocalStorage(state, payload) {
      const users = JSON.parse(localStorage.getItem('users'));
      const updatedUsersArray = users.map((user) => {
        if (user.email === payload.loggedInUser.email) return payload.loggedInUser;
        else return user;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsersArray));
      localStorage.setItem('loggedInUser', JSON.stringify(payload.loggedInUser));
      this.commit('updateLoggedInUserState', payload.loggedInUser);
      toast.success(payload.message);
    },
  },
});
