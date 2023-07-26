<script setup>
  import Swal from 'sweetalert2';
  const store = useStore();
  const router = useRouter();
  const loggedInUser = () => store.state.loggedInUser;

  function pageContentOnError() {
    if (loggedInUser() === null)
      return {
        title: 'Your Cart Is Lost!',
        content: {
          lineOne: 'Uh, seems like we lost your cart, sorry. :(',
          lineTwo: 'But we may be able to find it back if you login!',
        },
        image: { href: '/confusedMan.webp', alt: 'Not Logged In' },
        button: {
          innerText: 'Login',
          navigateTo: '/login',
        },
      };
    else if (loggedInUser()?.cart?.length === 0)
      return {
        title: 'Your Cart Is Empty!',
        content: {
          lineOne: 'Seems like you didnt pick anything. :(',
          lineTwo: 'We got a lot of cool things, check our catalog!',
        },
        image: { href: '/emptyCart.webp', alt: 'Empty Shopping Cart' },
        button: {
          innerText: 'Catalog',
          navigateTo: '/#products',
        },
      };
  }

  function addToCart(product, amount) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    store.commit('manageAddingToCart', { user, product, amount });
    if (routeTo() !== '') {
      router.push(routeTo());
      store.commit('updateRouteToState', '');
    }
  }

  async function removeFromCart(product, amount, removeCompletely) {
    if (removeCompletely === false || (await areYouSure())) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      store.commit('manageRemovingFromCart', { user, product, amount, removeCompletely });
      if (routeTo() !== '') {
        router.push(routeTo());
        store.commit('updateRouteToState', '');
      }
    }
  }

  async function areYouSure() {
    let userResponse;
    await Swal.fire({
      title: 'Attention',
      icon: 'warning',
      text: 'Are you sure you want to remove this product from your cart? All quantities will be removed.',
      padding: '2em 1em 3em 1em',
      showDenyButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: 'Cancel',
      focusConfirm: true,
    }).then((result) => {
      userResponse = result.value;
    });
    return userResponse;
  }

  function getTotalPrice() {
    let totalPrice = 0;
    loggedInUser().cart.forEach((product) => {
      totalPrice += product.details.price * product.amount;
    });
    return `$${totalPrice}`;
  }

  definePageMeta({
    title: 'Shopping Cart',
  });
</script>

<template>
  <div class="py-24 px-24 max-xl:px-10 max-md:px-6">
    <main
      v-if="loggedInUser() === null || loggedInUser()?.cart?.length === 0"
      class="px-40 py-20 max-md:px-6 w-fit max-md:w-full mx-auto flex flex-col justify-center items-center bg-gradient-to-b from-primary to-white from-50% to-50% rounded-md shadow text-gray-100"
    >
      <h1 class="text-3xl max-sm:text-2xl font-extrabold text-center">
        {{ pageContentOnError().title }}
      </h1>
      <div class="mt-4 font-medium text-center leading-6 max-sm:text-sm">
        <p>{{ pageContentOnError().content.lineOne }}</p>
        <p>{{ pageContentOnError().content.lineTwo }}</p>
      </div>
      <NuxtLazyImage
        :src="pageContentOnError().image.href"
        :alt="pageContentOnError().image.alt"
        quality="90"
        width="300"
        class="my-10 drop-shadow-lg"
      />
      <NuxtLink
        :to="pageContentOnError().button.navigateTo"
        class="px-20 py-2.5 bg-primary text-white font-semibold rounded-md text-lg shadow-md hover:scale-95 active:scale-100 transition-all duration-200"
      >
        {{ pageContentOnError().button.innerText }}
      </NuxtLink>
    </main>
    <div
      v-else
      class="flex gap-x-4 max-xl:flex-col max-xl:gap-y-4"
    >
      <main
        class="px-16 py-16 w-[70%] max-3xl:w-[65%] max-2xl:px-10 max-2xl:py-12 max-xl:w-full max-xl:px-14 max-xl:py-14 bg-white rounded-md shadow-md"
      >
        <div
          class="flex justify-between items-end max-sm:flex-col max-sm:items-start max-sm:gap-y-4"
        >
          <h1 class="text-3xl max-sm:text-2xl font-bold tracking-wider text-left text-gray-800">
            My Cart
          </h1>
          <p
            class="text-sm font-medium max-md:text-xs max-md:w-1/2 max-md:text-right max-sm:w-full max-sm:text-left max-sm:text-sm"
          >
            You'll receive a coupon for your next purchase after checkout
          </p>
        </div>
        <ul class="mt-8">
          <li
            v-for="product in loggedInUser().cart"
            :key="product"
            class="flex py-6 border-t gap-x-6 max-sm:flex-col max-sm:gap-y-6"
          >
            <div
              class="rounded-sm overflow-hidden shadow-sm shrink-0 max-sm/md:my-auto max-sm/md:h-fit max-sm:h-72"
            >
              <NuxtLazyImage
                :src="product.details.images[0]"
                :alt="product.title"
                quality="80"
                format="webp"
                class="w-36 max-sm:w-full"
              />
            </div>

            <div class="w-full flex flex-col text-gray-800 justify-between">
              <div>
                <h2 class="w-full font-bold text-xl truncate max-sm:text-2xl">
                  {{ product.details.title }}
                </h2>
                <p
                  class="mt-2 font-medium text-sm line-clamp-2 leading-4 text-gray-600 max-sm:text-base max-sm:leading-5 max-sm:mt-4"
                >
                  {{ product.details.description }}
                </p>
              </div>

              <div
                class="flex items-center gap-x-4 max-sm/md:flex-col-reverse max-sm/md:items-end max-sm/md:gap-y-4 max-sm/md:mt-6"
              >
                <p
                  class="w-fit font-extrabold text-xl"
                  title="Product Cost"
                >
                  {{ `$${product.details.price}` }}
                </p>
                <div class="w-full flex justify-end items-center space-x-10 max-lg:space-x-6">
                  <NuxtLink
                    :to="`/productDetails/${product.details.id}`"
                    class="text-sm font-medium hover:underline"
                    title="See Product Details"
                  >
                    See details
                  </NuxtLink>

                  <div class="flex items-center space-x-2">
                    <p class="text-sm font-medium max-md:hidden">Quantity :</p>
                    <div class="flex">
                      <button
                        title="Decrease Quantity"
                        @click="removeFromCart(product.details, 1, false)"
                        class="px-2 py-1 bg-white shadow shadow-gray-400 rounded-l-md"
                      >
                        <IconsDecrease />
                      </button>

                      <p class="px-3 py-1 font-bold text-gray-600 bg-white shadow shadow-gray-400">
                        {{ product.amount }}
                      </p>

                      <button
                        title="Add More"
                        @click="addToCart(product.details, 1)"
                        class="px-2 py-1 bg-white shadow shadow-gray-400 rounded-r-md"
                      >
                        <IconsIncrease />
                      </button>
                    </div>
                  </div>

                  <button
                    @click="removeFromCart(product.details, 1, true)"
                    title="Remove Product From Cart"
                  >
                    <IconsCancel
                      class="px-2 py-1 w-[18px] box-content bg-white shadow shadow-gray-400 rounded-md"
                    />
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="flex items-center justify-end gap-x-6 text-gray-700 border-t pt-10">
          <p class="text-xl font-bold tracking-wider">SUB-TOTAL :</p>
          <p class="text-lg font-extrabold text-gray-800">{{ getTotalPrice() }}</p>
        </div>
      </main>

      <aside
        class="w-[30%] max-3xl:w-[35%] max-xl:w-full max-xl:px-14 pb-10 h-fit px-10 bg-white shadow-md text-gray-700 rounded-md"
      >
        <h1
          class="pt-16 pb-10 max-2xl:pt-12 max-2xl:pb-8 font-extrabold tracking-widest text-2xl border-b"
        >
          TOTAL
        </h1>
        <div class="pt-8 pb-6 flex justify-between items-center text-xl font-extrabold">
          <p>Sub-total</p>
          <p>{{ getTotalPrice() }}</p>
        </div>
        <div class="pb-8 flex justify-between items-center text-xl font-extrabold">
          <p>Delivery</p>
          <div class="flex space-x-3 items-end">
            <p class="leading-6">FREE</p>
            <p class="line-through text-sm">$20</p>
          </div>
        </div>
        <select
          name="deliveryType"
          class="pb-2 mb-6 w-full cursor-pointer outline-none border-b-2 border-gray-300 text-lg font-semibold text-gray-500"
        >
          <option value="fast">Fast Delivery [Free]</option>
          <option value="standard">Standard Delivery [Free]</option>
        </select>

        <button
          class="w-full py-3 bg-primary text-white text-lg font-bold tracking-widest hover:opacity-80 active:scale-90 transition-all duration-200"
        >
          CHECKOUT
        </button>
      </aside>
    </div>
  </div>
</template>
