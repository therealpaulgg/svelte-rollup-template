import svelte from "rollup-plugin-svelte"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"
import sveltePreprocess from "svelte-preprocess"
import typescript from "@rollup/plugin-typescript"
import injectProcessEnv from "rollup-plugin-inject-process-env"
import postcss from "rollup-plugin-postcss"
import serve from "rollup-plugin-serve"
import html from "@open-wc/rollup-plugin-html"
import copy from "rollup-plugin-copy"

const env_vars = new Map([
    [
        "production",
        {
            API_URL: "https://api.example.com",
            BASE_URL: "/",
        },
    ],
    [
        "staging",
        {
            API_URL: "https://staging.api.example.com",
            BASE_URL: "/",
        },
    ],
    [
        "development",
        {
            API_URL: "http://localhost:8080",
            BASE_URL: "/",
        },
    ],
])

const environment = (() => {
    if (process.env.PRODUCTION) {
        return "production"
    } else if (process.env.STAGING) {
        return "staging"
    } else if (process.env.TEST) {
        return "test"
    } else {
        return "development"
    }
})()

console.log(`Environment: ${environment}`)

const production = environment === "production" || !process.env.ROLLUP_WATCH

const directory = production ? "dist" : "dev-dist"

const BASE_URL =
    env_vars.get(environment) && env_vars.get(environment).BASE_URL
        ? env_vars.get(environment).BASE_URL
        : "/"

export default {
    input: "src/main.ts",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        dir: directory,
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // postcss only needs to run for Tailwind CSS, svelte has preprocessor already
            preprocess: sveltePreprocess({
                postcss: false,
            }),
            // write svelte's CSS to an output directory
            css: (css) => {
                css.write(`${directory}/components.css`, !production)
            },
        }),
        // Tailwind's CSS to utils. Configured in tailwind.css and postcss.config.js
        postcss({
            extract: "utils.css",
        }),
        // Generate an HTML based off of an inline string.
        // Replace %PUBLIC_PATH% with the real public path of the site, for example, '/productivity/'
        html({
            name: "index.html",
            rootDir: directory,
            publicPath: BASE_URL,
            transform: (html) =>
                html
                    .replace("%PUBLIC_PATH%", BASE_URL)
                    .replace("%APP_TITLE%", "Hello There"),
            template: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf8" />
                <meta name="viewport" content="width=device-width" />

                <title>%APP_TITLE%</title>

                <base href="%PUBLIC_PATH%">

                <link rel="icon" type="image/png" href="favicon.png" />
                <link rel="stylesheet" href="components.css" />
                <link rel="stylesheet" href="utils.css" />
            </head>

            <body></body>
            </html>
            `,
        }),
        // need to copy assets to the built folder
        production &&
            copy({
                targets: [
                    {
                        src: "public/assets",
                        dest: `${directory}/`,
                    },
                    {
                        src: "public/favicon.png",
                        dest: `${directory}/`,
                    },
                ],
            }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        commonjs(),
        typescript({ sourceMap: !production }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production &&
            serve({
                contentBase: ["dev-dist", "public"],
                host: "localhost",
                port: 5000,
                historyApiFallback: true,
            }),

        !production && livereload("dev-dist"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
        // inject proper environment variables into program based on prod/staging/test/dev
        injectProcessEnv({
            ...env_vars.get(environment),
        }),
    ],
    watch: {
        clearScreen: false,
    },
}
