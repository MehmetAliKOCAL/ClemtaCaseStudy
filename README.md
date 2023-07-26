# Disclaimer

The fake store API I used ([Platzi API](https://fakeapi.platzi.com/)) allows its users to save products and categories to their database. So the data I fetch to this website is user generated, therefore you may see some odd product names, broken images, or items and categories with no name.

## Table of Contents

- [Disclaimer](#disclaimer)
  - [Table of Contents](#table-of-contents)
  - [Features Requested From Me and What I Did In Return](#features-requested-from-me-and-what-i-did-in-return)
    - [1)](#1)
    - [2)](#2)
    - [3)](#3)
    - [4)](#4)
    - [5)](#5)
    - [6)](#6)
    - [7)](#7)
    - [8)](#8)
    - [9)](#9)
    - [10)](#10)
    - [11)](#11)
    - [12)](#12)
    - [13)](#13)
    - [14)](#14)
    - [15)](#15)
    - [16)](#16)
    - [17)](#17)
    - [19)](#19)
    - [20)](#20)
  - [Project Setup](#project-setup)
    - [1 - Clone the project](#1---clone-the-project)
    - [2 - Open the directory](#2---open-the-directory)
    - [3 - Install the dependencies](#3---install-the-dependencies)
    - [4 - Adjust the environment variables](#4---adjust-the-environment-variables)
    - [5 - Run the development server](#5---run-the-development-server)
  - [Production](#production)

This is a pre-interview case study project given by a company for my front-end dev job application.
Click [here](https://clemtacs.gwyndev.com) for live preview.

## Features Requested From Me and What I Did In Return

### 1)

> **R:** Implement a homepage that displays a grid or list of products, including their images, titles, prices, and ratings.

**S:** I made a landing page and added the [requested product list](https://clemtacs.gwyndev.com/#products) to it as a section.

### 2)

> **R:** Fetch product data from an API (or use mock data) to populate the product listing

**S:** Instead of using mock data, I chose to use [Platzi Fake Store API](https://fakeapi.platzi.com/) as a fake API.

### 3)

> **R:** Include pagination functionality to limit the number of products displayed per page.

**S:** In a production environment, doing filtering, sorting, paginating, and that type of stuff in the front end is a bad practice. Because for example, to paginate products in the front end, you have to fetch the whole data from the server and mutate it. Users probably won't even look at all the pages you will generate, but your website will slow down. Because of this, I used Platzi's filtering and paginating functions by sending additional queries while fetching the data.

### 4)

> **R:** Implement filtering options to allow users to filter products based on categories, prices, or other relevant attributes.

**S:** Again, I used Platzi for that and fetched the data pre-filtered in a way that the user wants. You select the filters you want, click on the 'Apply Filters' button, and voilà! filtered products will be fetched from the API and the page content will be replaced with the new data.

### 5)

> **R:** Implement sorting options to allow users to sort products based on price, popularity, or other criteria.

**S:** Since Platzi doesn't have a sorting feature, I didn't want to fetch whole data to be able to sort it in the front-end. Because if I do it like that, I would also have to do filtering and pagination too, that would slow down the page. And because of that, I did sorting in per page basis. For example, I fetch a single page of products from the server and then sort it in a way that the user wants in the front-end, then replaced the page content with it.

### 6)

> **R:** Add a search feature to allow users to search for specific products based on keywords.

**S:** This again requires fetching the whole data from the API to be able to do it in the front end, so I used Platzi's search feature.

### 7)

> **R:** Create a product detail page that shows additional information about a selected product when clicked.

**S:** Platzi doesn't offer that much data on products. Their name, price, a very short description, category, and that's all. No comments, no ratings. So I made some fake components giving fake info about shipment and the store etc. and completed the page with them. While inspecting products in [the products section of the index page](https://clemtacs.gwyndev.com/#products), if you click on a product, you'll be redirected to the page that shows the details.

### 8)

> **R:** Include a "Add to Cart" button on the product detail page to allow users to add products to their shopping cart.

**S:** I implemented the add to cart button in both [the products section of the index page](https://clemtacs.gwyndev.com/#products) and the product detail page.

### 9)

> **R:** Implement client-side form validation for the "Add to Cart" functionality.

**S:** Platzi doesn't offer a product quantity on product data. Therefore while adding one more quantity of the product to the user's cart, I checked if the user already has got 5 copies of it. And if so, the website will throw a toast error message to inform the user that the product stock is reached.

### 10)

> **R:** Create a shopping cart page that displays the selected products, quantities, and total prices.

**S:** [Done](https://clemtacs.gwyndev.com/cart). I also implemented a fake login/register feature with localStorage and Vuex to make the cart only available to logged-in users. After registering and logging in, add some products to your cart from [the products section of the index page](https://clemtacs.gwyndev.com/#products), and then check [the cart page](https://clemtacs.gwyndev.com/cart) to see your cart.

### 11)

> **R:** Allow users to update quantities or remove products from the shopping cart.

**S:** Done, you can increase or decrease the quantity or remove the product completely via the related buttons on [the cart page](https://clemtacs.gwyndev.com/cart).

### 12)

> **R:** Use Vuex to manage the application state, including the product listing and shopping cart.

**S:** Since Nuxt3 doesn't support Vuex natively anymore, I added Vuex as a plugin to the Nuxt and registered UseStore() composable to /composables/ directory for auto imports.

### 13)

> **R:** Apply appropriate routing using Nuxt.js to navigate between different pages.

**S:** I only used NuxtLink component and UseRouter() composable for routing.

### 14)

> **R:** Make sure the UI is visually appealing and responsive across different devices.

**S:** I got some problems about designing because the time given for project completion was limited, but I hope you like it.

### 15)

> **R:** Use CSS or a CSS framework (e.g., Tailwind CSS, Bootstrap) to style the application.

**S:** I used TailwindCSS.

### 16)

> **R:** Write clear and concise documentation explaining how to set up and run the application.

**S:** Check below. 👍

### 17)

> **Bonus R:** Implement user authentication to allow users to create accounts and manage their orders.

**S:** I implemented a login/register feature with Vuex and localStorage as I mentioned above.

> ### 18) **Bonus R:** Add a wishlist feature to allow users to save products for future reference.

**S:** I didn't have time for this...

### 19)

> **Bonus R:** Implement a product review/rating system.

**S:** Didn't have time for this too.

### 20)

> **Bonus R:** Incorporate server-side rendering (SSR) using Nuxt.js for improved performance and SEO.

**S:** Nuxt3 already comes with SSR activated, I also coded meta tags and open graph tags, and page titles for better SEO. Also tried to pay attention to semantic HTML structure as I can in this limited time.

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
