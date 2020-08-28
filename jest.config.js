module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.svelte$": [
            "svelte-jester",
            {
                preprocess: true
            }
        ],
        "^.+\\.(js|ts)$": "ts-jest"
    },
    moduleFileExtensions: ["js", "ts", "svelte"],
    setupFilesAfterEnv: ["./jestSetup.ts"],
    transformIgnorePatterns: [
        "node_modules/(?!(svelte-typewriter|svelte-flatpickr)/)"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    globals: {
        "ts-jest": {
            isolatedModules: true
        }
    },
    testPathIgnorePatterns: ["/lib/", "/node_modules/"]
}