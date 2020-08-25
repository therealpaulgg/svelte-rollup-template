# Svelte Rollup Template

I've been messing around at work with the Svelte UI framework, trying to get it production-ready for developers with developer-wanted features. Here is a repo of some of my findings.

It took a lot of time to get everything properly configured with the project for it to be production-ready. The following main high-level technologies of this project are:

- Rollup for bundling + development server
- Jest for Unit + Integration testing
- Svelte
- Tailwind CSS
- TypeScript

Some additional features that would be useful:
- HMR (Hot Module Reload) watch [https://github.com/rixo/rollup-plugin-svelte-hot](https://github.com/rixo/rollup-plugin-svelte-hot) for both CSS and Svelte components
- slightly faster developer compile times
- svelte-checker for type checking (todo)
- better developer server in general (rollup setup is wonderful for production)

## Rollup

Rollup is the project bundler. Hopefully not many changes will need to be made here.

When building for staging or production, assets in the `public` folder will be copied into `dist` automatically, as well as bundled JS, CSS, and a constructed `index.html` file. To deploy to production, all you need is to copy the contents from `dist` into your server. Please ensure your server has URL Rewrite on so all urls go to `index.html` and get handled by the SPA router.

## Environment Variables

Environment variables are useful in development, particularly with `API_URL` for different Backend endpoints in different stages (development, staging, production).

To set environment variables, change the `env_vars` Map object inside of `rollup.config.js`. These will be injected and you can use them in your application.

## Jest

Jest should be preconfigured to work with Svelte at this point. The one thing you may need to keep in mind: if you import Svelte components (uncompiled, .svelte files) from node_modules, you will need to add them as exceptions insode of jest.config.js, in the `transformIgnorePatterns` regex list. Ensure the name of the module (folder) is correct when adding it. __Do not add any unneeded modules, it will greatly increase build times.__

Tests will be written in integration, unit, and e2e using the file format: `*.spec.ts` at location `tests/<test_category>`.
