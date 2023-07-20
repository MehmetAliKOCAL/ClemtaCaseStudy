import Toast from 'vue-toastification';

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    position: 'bottom-right',
    timeout: 3500,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  };

  nuxtApp.vueApp.use(Toast, options);
});
