## Setup

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

### Adjust the environment variables

Open the project folder and remove the .example extension in the file named .env.example to set up the environment variables, that's all for setting up the project. I'm exposing the .env because I used a public fake API after all... If you want to use another API, you'll have to edit codes that are related to API in all files at /server/api/ and /store/ directories.

.env.example ---> .env

### Run the development server

To start the project in dev mode, type below code to your cli and navigate to `http://localhost:3000`

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

### Production

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
