# create-memecoin-site

🚀 **A CLI tool to generate customizable websites for memecoins using Gatsby.**

## 📌 Introduction

`create-memecoin-site` is a command-line tool that helps you quickly generate a complete website for your memecoin. It automates the process of setting up a Gatsby-based site with customizable themes, blockchain options, and content tailored to your memecoin project.

## 🔧 Installation

You can run the tool directly using `npx` (recommended) or install it globally.

### Option 1: Run directly with npx

```sh
npx create-memecoin-site
```

### Option 2: Install globally

```sh
npm install -g create-memecoin-site
```

Then run:

```sh
create-memecoin-site
```

## 🚀 Usage

After running the command, the CLI will guide you through a series of prompts to configure your memecoin site.

### Step 1: Provide Basic Information

The first set of prompts will ask for details about your project:

- **Site Name** – The name of your site.
- **Folder Name** – The directory where the site will be created.
- **Memecoin Name** – The name of your token.
- **Symbol** – The symbol of your token (e.g., \$PEPE).
- **Contract Address** – The smart contract address of your memecoin.

### Step 2: Customize Your Site

You will be asked to provide additional details:

- **Site Title** – The title that appears in the browser tab.
- **Footer Description** – A short text for the footer.
- **Home Page Description** – A brief description for the homepage.
- **About Page Description** – Details about your project.
- **Disclaimer Message** – Any legal or important disclaimers.

### Step 3: Choose Your Theme and Blockchain

You can select the visual style and blockchain compatibility:

- **Site Theme**: `deepSea`, `dark`, `light`, `solarized`, `cyberpunk`, `matrix`
- **Blockchain**: `Solana`, `Ethereum`

### Step 4: Configure Tokenomics

Set the following token-related details:

- **Total Supply** – e.g., `420,690,000,000,001`
- **Taxes** – e.g., `No taxes, No Bullshit`
- **Burnt LP Status** – e.g., `LP tokens are burnt, and contract ownership is renounced.`

### Step 5: Select Background Shape

Choose a background shape to personalize your website:

- Options: `circle`, `square`, `triangle`, `heart`, `wave`, `ellipse`

### Step 6: Confirm and Generate the Site

After providing all the details, you will be asked to confirm. If you proceed, the tool will:

1. Clone the base template from the GitHub repository.
2. Update the `siteConfig.json` file with your inputs.
3. Generate the final site in the selected folder.
4. Display next steps to run the project.

## 📂 Project Structure

Once created, your project folder will look like this:

```
memecoin-site/
│── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── config/
│   │   ├── siteConfig.json  # Stores the project settings
│── static/
│── gatsby-config.js
│── package.json
│── README.md
```

## ▶️ Running the Site

After generating the project, navigate to the folder and install dependencies:

```sh
cd memecoin-site
npm install
```

Then start the development server:

```sh
npm run develop
```

Your memecoin site will be available at `http://localhost:8000`.

## 🛠 Customization

After generating the site, you can customize it further by editing the files in `src/` and updating `siteConfig.json`.

## ⚡ Troubleshooting

If you encounter issues:

- Ensure you have Node.js installed (`node -v` to check version).
- Run `npm install` again to ensure dependencies are installed.
- Delete the `node_modules` folder and `package-lock.json`, then reinstall dependencies:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```

## 📜 License

This project is licensed under the MIT License.

## 🙌 Contributing

Feel free to submit issues or pull requests to improve this tool.

## 🌎 Follow Us

Stay updated on new features and improvements!

Happy building! 🚀

