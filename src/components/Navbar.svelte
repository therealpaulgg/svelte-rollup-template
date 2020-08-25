<script lang="ts">
    export let collapsed = true
    import Typewriter from "svelte-typewriter/Typewriter.svelte"
</script>

<nav class="bg-gray-800 shadow-inner p-3">
    <div class="flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <div>
                <img
                    src="assets/img/1200px-Svelte_Logo.svg.png"
                    class="h-12 mr-2 fill-current"
                    alt="logo" />
            </div>
            <span class="font-semibold text-xl tracking-tight">
                Svelte Typescript Full Rollup Tempate
            </span>
        </div>
        <div class="block lg:hidden">
            <button
                class="flex items-center px-3 py-2 border rounded text-white
                border-white hover:text-blue-400 hover:border-blue-400"
                on:click={() => (collapsed = !collapsed)}>
                <svg
                    class="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>
        </div>
        <div
            class="w-full block flex-grow lg:flex lg:items-center lg:w-auto
            nav-toggler"
            class:hidden={collapsed}>
            <div class="text-sm lg:flex-grow">
                <slot />
            </div>
        </div>
    </div>
    <div>
        <div class="ml-2 text-white" style="font-weight: 100; font-size: 18px">
            <Typewriter cascade interval={150} cursor="#ffffff">
                <span class="uppercase">Hello</span>
                <span class="uppercase">There</span>
            </Typewriter>
        </div>
    </div>
</nav>
