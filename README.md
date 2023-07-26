# Disclaimer

This is a pre-interview case study project given by a company for my front-end dev job application. Click [here](https://clemtacs.gwyndev.com) for live preview.

The fake store API I used ([Platzi API](https://fakeapi.platzi.com/)) allows its users to save products and categories to their database. So the data I fetch to this website is user generated, therefore you may see some odd product names, broken images, or items and categories with no name.

## Table of Contents

- [Disclaimer](#disclaimer)
  - [Table of Contents](#table-of-contents)
  - [Features Requested From Me and What I Did In Return](#features-requested-from-me-and-what-i-did-in-return)
    - [1 - Implement a homepage that displays a grid or list of products, including their images, titles, prices, and ratings.](#1---implement-a-homepage-that-displays-a-grid-or-list-of-products-including-their-images-titles-prices-and-ratings)
    - [2 - Fetch product data from an API (or use mock data) to populate the product listing](#2---fetch-product-data-from-an-api-or-use-mock-data-to-populate-the-product-listing)
    - [3 - Include pagination functionality to limit the number of products displayed per page.](#3---include-pagination-functionality-to-limit-the-number-of-products-displayed-per-page)
    - [4 - Implement filtering options to allow users to filter products based on categories, prices, or other relevant attributes.](#4---implement-filtering-options-to-allow-users-to-filter-products-based-on-categories-prices-or-other-relevant-attributes)
    - [5 - Implement sorting options to allow users to sort products based on price, popularity, or other criteria.](#5---implement-sorting-options-to-allow-users-to-sort-products-based-on-price-popularity-or-other-criteria)
    - [6 - Add a search feature to allow users to search for specific products based on keywords.](#6---add-a-search-feature-to-allow-users-to-search-for-specific-products-based-on-keywords)
    - [7 - Create a product detail page that shows additional information about a selected product when clicked.](#7---create-a-product-detail-page-that-shows-additional-information-about-a-selected-product-when-clicked)
    - [8 - Include a "Add to Cart" button on the product detail page to allow users to add products to their shopping cart.](#8---include-a-add-to-cart-button-on-the-product-detail-page-to-allow-users-to-add-products-to-their-shopping-cart)
    - [9 - Implement client-side form validation for the "Add to Cart" functionality.](#9---implement-client-side-form-validation-for-the-add-to-cart-functionality)
    - [10 - Create a shopping cart page that displays the selected products, quantities, and total prices.](#10---create-a-shopping-cart-page-that-displays-the-selected-products-quantities-and-total-prices)
    - [11 - Allow users to update quantities or remove products from the shopping cart.](#11---allow-users-to-update-quantities-or-remove-products-from-the-shopping-cart)
    - [12 - Use Vuex to manage the application state, including the product listing and shopping cart.](#12---use-vuex-to-manage-the-application-state-including-the-product-listing-and-shopping-cart)
    - [13 - Apply appropriate routing using Nuxt.js to navigate between different pages.](#13---apply-appropriate-routing-using-nuxtjs-to-navigate-between-different-pages)
    - [14 - Make sure the UI is visually appealing and responsive across different devices.](#14---make-sure-the-ui-is-visually-appealing-and-responsive-across-different-devices)
    - [15 - Use CSS or a CSS framework (e.g., Tailwind CSS, Bootstrap) to style the application.](#15---use-css-or-a-css-framework-eg-tailwind-css-bootstrap-to-style-the-application)
    - [16 - Write clear and concise documentation explaining how to set up and run the application.](#16---write-clear-and-concise-documentation-explaining-how-to-set-up-and-run-the-application)
    - [17 - Implement user authentication to allow users to create accounts and manage their orders.](#17---implement-user-authentication-to-allow-users-to-create-accounts-and-manage-their-orders)
    - [18 - Add a wishlist feature to allow users to save products for future reference.](#18---add-a-wishlist-feature-to-allow-users-to-save-products-for-future-reference)
    - [19 - Implement a product review/rating system.](#19---implement-a-product-reviewrating-system)
    - [20 - Incorporate server-side rendering (SSR) using Nuxt.js for improved performance and SEO.](#20---incorporate-server-side-rendering-ssr-using-nuxtjs-for-improved-performance-and-seo)
  - [Project Setup](#project-setup)
    - [1 - Clone the project](#1---clone-the-project)
    - [2 - Open the directory](#2---open-the-directory)
    - [3 - Install the dependencies](#3---install-the-dependencies)
    - [4 - Adjust the environment variables](#4---adjust-the-environment-variables)
    - [5 - Run the development server](#5---run-the-development-server)
  - [Production](#production)

## Features Requested From Me and What I Did In Return

### 1 - Implement a homepage that displays a grid or list of products, including their images, titles, prices, and ratings.

I made a landing page and added the [requested product list](https://clemtacs.gwyndev.com/#products) to it as a section.

### 2 - Fetch product data from an API (or use mock data) to populate the product listing

Instead of using mock data, I chose to use [Platzi Fake Store API](https://fakeapi.platzi.com/) as a fake API.

### 3 - Include pagination functionality to limit the number of products displayed per page.

In a production environment, doing filtering, sorting, paginating, and that type of stuff in the front end is a bad practice. Because for example, to paginate products in the front end, you have to fetch the whole data from the server and mutate it. Users probably won't even look at all the pages you will generate, but your website will slow down. Because of this, I used Platzi's filtering and paginating functions by sending additional queries while fetching the data.

### 4 - Implement filtering options to allow users to filter products based on categories, prices, or other relevant attributes.

Again, I used Platzi for that and fetched the data pre-filtered in a way that the user wants. You select the filters you want, click on the 'Apply Filters' button, and voilà! filtered products will be fetched from the API and the page content will be replaced with the new data.

### 5 - Implement sorting options to allow users to sort products based on price, popularity, or other criteria.

Since Platzi doesn't have a sorting feature, I didn't want to fetch whole data to be able to sort it in the front-end. Because if I do it like that, I would also have to do filtering and pagination too, that would slow down the page. And because of that, I did sorting in per page basis. For example, I fetch a single page of products from the server and then sort it in a way that the user wants in the front-end, then replaced the page content with it.

### 6 - Add a search feature to allow users to search for specific products based on keywords.

This again requires fetching the whole data from the API to be able to do it in the front end, so I used Platzi's search feature.

### 7 - Create a product detail page that shows additional information about a selected product when clicked.

Platzi doesn't offer that much data on products. Their name, price, a very short description, category, and that's all. No comments, no ratings. So I made some fake components giving fake info about shipment and the store etc. and completed the page with them. While inspecting products in [the products section of the index page](https://clemtacs.gwyndev.com/#products), if you click on a product, you'll be redirected to the page that shows the details.

### 8 - Include a "Add to Cart" button on the product detail page to allow users to add products to their shopping cart.

I implemented the add to cart button in both [the products section of the index page](https://clemtacs.gwyndev.com/#products) and the product detail page.

### 9 - Implement client-side form validation for the "Add to Cart" functionality.

Platzi doesn't offer a product quantity on product data. Therefore while adding one more quantity of the product to the user's cart, I checked if the user already has got 5 copies of it. And if so, the website will throw a toast error message to inform the user that the product stock is reached.

### 10 - Create a shopping cart page that displays the selected products, quantities, and total prices.

[Done](https://clemtacs.gwyndev.com/cart). I also implemented a fake login/register feature with localStorage and Vuex to make the cart only available to logged-in users. After registering and logging in, add some products to your cart from [the products section of the index page](https://clemtacs.gwyndev.com/#products), and then check [the cart page](https://clemtacs.gwyndev.com/cart) to see your cart.

### 11 - Allow users to update quantities or remove products from the shopping cart.

Done, you can increase or decrease the quantity or remove the product completely via the related buttons on [the cart page](https://clemtacs.gwyndev.com/cart).

### 12 - Use Vuex to manage the application state, including the product listing and shopping cart.

Since Nuxt3 doesn't support Vuex natively anymore, I added Vuex as a plugin to the Nuxt and registered UseStore() composable to /composables/ directory for auto imports.

### 13 - Apply appropriate routing using Nuxt.js to navigate between different pages.

I only used NuxtLink component and UseRouter() composable for routing.

### 14 - Make sure the UI is visually appealing and responsive across different devices.

I got some problems about designing because the time given for project completion was limited, but I hope you like it.

### 15 - Use CSS or a CSS framework (e.g., Tailwind CSS, Bootstrap) to style the application.

I used TailwindCSS.

### 16 - Write clear and concise documentation explaining how to set up and run the application.

Check below. 👍

### 17 - Implement user authentication to allow users to create accounts and manage their orders.

I implemented a login/register feature with Vuex and localStorage as I mentioned above.

### 18 - Add a wishlist feature to allow users to save products for future reference.

I didn't have time for this...

### 19 - Implement a product review/rating system.

Didn't have time for this too.

### 20 - Incorporate server-side rendering (SSR) using Nuxt.js for improved performance and SEO.

Nuxt3 already comes with SSR activated, I also coded meta tags and open graph tags, and page titles for better SEO. Also tried to pay attention to semantic HTML structure as I can in this limited time.

## Project Setup

### 1 - Clone the project

Open a command line interface and type the below code to clone the project to your computer, or just download the files by clicking the green 'Code' button above the page.

```bash
git clone https://github.com/MehmetAliKOCAL/ClemtaCaseStudy.git
```

### 2 - Open the directory

Get in the folder by typing below code to the cli you used to clone the project, or just simply drag and drop the folder to your favourite ide.

```bash
cd ClemtaCaseStudy
```

### 3 - Install the dependencies

Make sure to install the dependencies with a package manager via a cli.

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

### 4 - Adjust the environment variables

Open the project folder and remove the .example extension in the file named .env.example to set up the environment variables, that's all for setting up the project. I'm exposing the .env because I used a public fake API after all... If you want to use another API, you'll have to edit codes that are related to API in all files at /server/api/ and /store/ directories.

.env.example ---> .env

### 5 - Run the development server

To start the project in dev mode, type below code to your cli and navigate to `http://localhost:3000`

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

To Build the project for testing or hosting, use the code below.

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

To locally preview production build, use the code below.

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```
