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
      loggedInUser: '',
      updateUserCookie: false,
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

    updateUserCookieState(state, newValue) {
      state.updateUserCookie = newValue;
    },

    register(state, userData) {
      const users = () => JSON.parse(localStorage.getItem('users'));
      let isUserAlreadyRegistered = (user) => user.email === userData.email;
      const showSuccessfullFeedback = () => {
        toast.success("You've successfully registered!");
        this.commit('updateRouteToState', '/login');
      };

      if (users() === null) {
        localStorage.setItem('users', JSON.stringify([userData]));
        showSuccessfullFeedback();
      } else if (users().some(isUserAlreadyRegistered)) {
        toast.error('This e-mail is already in use');
      } else {
        localStorage.setItem('users', JSON.stringify([...users(), userData]));
        showSuccessfullFeedback();
      }
    },

    login(state, loginData) {
      const users = () => JSON.parse(localStorage.getItem('users'));

      if (users() === null) {
        toast.error('No account have been found, please register first');
        this.commit('updateRouteToState', '/register');
      } else {
        users().forEach((user) => {
          if (user.email === loginData.email && user.password === loginData.password) {
            toast.success(`Welcome back, ${user.name}`);
            this.commit('updateLoggedInUserState', user);
            this.commit('updateUserCookieState', true);
            this.commit('updateRouteToState', '/');
          }
        });
        if (state.loggedInUser === '') {
          toast.error('E-mail or password is incorrect');
        }
      }
    },

    addToCart(state, payload) {
      const users = () => JSON.parse(localStorage.getItem('users'));
      function success(message, store) {
        const updatedUsersArray = users().map((user) => {
          if (user.email === payload.user.email) return payload.user;
          else return user;
        });
        localStorage.setItem('users', JSON.stringify([...updatedUsersArray]));
        store.commit('updateLoggedInUserState', payload.user);
        store.commit('updateUserCookieState', true);
        toast.success(message);
      }
      function doIfNotLoggedIn(store) {
        toast.info('Please login to your account first');
        store.commit('updateRouteToState', '/login');
      }
      function doIfUserHasNoCart(store) {
        payload.user.cart = [{ details: payload.product, amount: payload.amount }];
        success('Product added to the cart', store);
      }
      function doIfUserDontHaveThisProduct(store) {
        payload.user.cart.push({ details: payload.product, amount: payload.amount });
        success('Product added to the cart', store);
      }
      function doIfUserExceedingMaxStock() {
        toast.error('Due to limited stock, you cannot have more than 5 of this item.');
      }
      function doIfUserAllEligible(store, itemIndex) {
        payload.user.cart[itemIndex].amount++;
        success('Added 1 more copy of the product to the cart', store);
      }

      if (payload.user === undefined) {
        doIfNotLoggedIn(this);
      } else if (payload.user.cart === undefined) {
        doIfUserHasNoCart(this);
      } else {
        let productOnCart = '';
        payload.user.cart.forEach((product) => {
          if (product.details.id === payload.product.id) {
            productOnCart = { details: product, index: payload.user.cart.indexOf(product) };
          }
        });
        if (productOnCart === '') {
          //implement only one quantity
          //implement removing completely while removing one at a time if user have only one quantity
          //implement removing at once
          doIfUserDontHaveThisProduct(this);
        } else if (productOnCart.details.amount >= 5) {
          doIfUserExceedingMaxStock();
        } else {
          doIfUserAllEligible(this, productOnCart.index);
        }
      }
      console.log(store.state.loggedInUser);
    },

    removeFromCart(state, payload) {
      function success(message, store) {
        const updatedUsersArray = users().map((user) => {
          if (user.email === payload.user.email) return payload.user;
          else return user;
        });
        localStorage.setItem('users', JSON.stringify([...updatedUsersArray]));
        store.commit('updateLoggedInUserState', payload.user);
        store.commit('updateUserCookieState', true);
        toast.success(message);
      }
      function removeProductFromCart(store, itemIndex) {
        payload.user.cart.slice(itemIndex, 1);
        success('Removed the product from cart', store);
      }

      if (payload.amount === 1 && productOnCart.amount) {
      }
      let productOnCart = '';
      payload.user.cart.forEach((product) => {
        if (product.details.id === payload.product.id) {
          productOnCart = { details: product, index: payload.user.cart.indexOf(product) };
        }
      });
    },

    toggleProductOnWishlist(state, payload) {
      const users = () => JSON.parse(localStorage.getItem('users'));
      function success(message, store) {
        const updatedUsersArray = users().map((user) => {
          if (user.email === payload.user.email) return payload.user;
          else return user;
        });
        localStorage.setItem('users', JSON.stringify([...updatedUsersArray]));
        store.commit('updateLoggedInUserState', payload.user);
        store.commit('updateUserCookieState', true);
        toast.success(message);
      }
      function doIfNotLoggedIn(store) {
        toast.info('Please login to your account first');
        store.commit('updateRouteToState', '/login');
      }
      function doIfUserHasNoWishlist(store) {
        payload.user.wishlist = [{ ...payload.product }];
        success('Product added to the wishlist', store);
      }
      function doIfUserDontHaveThisProduct(store) {
        payload.user.wishlist.push({ ...payload.product });
        success('Product added to the wishlist', store);
      }
      function doIfUserHaveThisProduct(store, itemIndex) {
        payload.user.wishlist.slice(itemIndex, 1);
        success('Removed the product from wishlist', store);
      }

      if (payload.user === undefined) {
        doIfNotLoggedIn(this);
      } else if (payload.user.wishlist === undefined) {
        doIfUserHasNoWishlist(this);
      } else {
        let wishlistedProduct = '';
        payload.user.wishlist.forEach((product) => {
          if (product.details.id === payload.product.id) {
            wishlistedProduct = { details: product, index: payload.user.wishlist.indexOf(product) };
          }
        });
        if (wishlistedProduct === '') {
          doIfUserDontHaveThisProduct(this);
        } else {
          doIfUserHaveThisProduct(this, wishlistedProduct.index);
        }
      }
    },
  },
});
