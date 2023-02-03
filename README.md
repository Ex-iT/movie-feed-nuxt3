# Moviefeed

Daily listing of movies on Dutch TV using the [TVgids.nl](https://www.tvgids.nl/) API. This web app is suitable to be 'installed' on a mobile device which allows native sharing.

This is a [Nuxt 3](https://nuxt.com/) with [TypeScript](https://www.typescriptlang.org/) project. It uses a [Cloud Firestore](https://firebase.google.com/docs/firestore) to store the cached JSON data. The cache gets updated by a cronjob running a [GitHub Workflow](https://docs.github.com/en/actions/using-workflows).

## Development

First, install dependencies:

```bash
yarn install
```

Copy `.env.example` to `.env` in the root of the project and set the values.

And run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

To create a production build run:

```bash
yarn build
```
