<script lang="ts">
    export let active: boolean = false
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    function forward(event) {
        dispatch("click", event)
    }
</script>

<button
    on:click={forward}
    style={$$props.style}
    class={(active ? 'bg-blue-300 text-black' : 'bg-gray-400 text-white') + ' shadow hover:bg-blue-600 hover:text-white text-sm py-2 px-4 rounded transition duration-200 m-1 btn uppercase ' + $$props.class}>
    <slot />
</button>
