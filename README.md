# PortfolioChat

A React portfolio with topic shortcuts and a chat interface. Replies are drawn from the profile in `src/profile.js`, so the site runs on static hosting without a backend or API key.

## Local development

```sh
npm ci
npm run dev
```

Edit the portfolio profile and chat replies in `src/profile.js`.

## GitHub Pages

Push the project to your GitHub repository’s `main` branch. In **Settings → Pages**, select **GitHub Actions** as the source. Run **Deploy portfolio to GitHub Pages** from the **Actions** tab if the initial push occurred before Pages was configured. The workflow builds the site and publishes `dist/`. The relative Vite base supports repository sites and root sites.
