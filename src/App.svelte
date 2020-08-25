<script lang="ts">
    import { Router, Link, Route } from "svelte-navigator"
    import Home from "./routes/Home.svelte"
    import Test from "./routes/Test.svelte"
    import Sidebar from "./components/Sidebar.svelte"
    import Navbar from "./components/Navbar.svelte"
    import NavbarLink from "./components/NavbarLink.svelte"
    import { onMount } from "svelte"
    let collapsed = false
</script>

<style lang="scss" global>
    @import "./App.sass";
    #app {
        font-family: "Open Sans", sans-serif;
    }
    #main {
        transition: 0.5s;
    }
</style>

<div id="app">
    <Sidebar {collapsed}>
        <h1>Hello There</h1>
    </Sidebar>

    <div id="main" style="margin-left: {collapsed ? 0 : 450}px">
        <Router basepath={process.env.BASE_URL} primary={false}>
            <Navbar>
                <NavbarLink to="/">Home</NavbarLink>
                <NavbarLink to="/test">Test</NavbarLink>
            </Navbar>
            <div class="px-10 py-4 mx-auto">
                <button
                    on:click={() => (collapsed = !collapsed)}
                    class="bg-gray-400 hover:bg-blue-300 hover:text-black
                    text-white font-bold py-2 px-4 rounded transition
                    duration-200">
                    {collapsed ? 'Show' : 'Hide'} Options
                </button>
                <p>{process.env.BASE_URL}</p>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="test" component={Test} />
            </div>
        </Router>
    </div>
</div>
