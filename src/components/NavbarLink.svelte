<script lang="ts">
    import { Link } from "svelte-navigator"
    export let to = ""
</script>

<Link
    {to}
    class="block mt-4 lg:inline-block lg:mt-0 text-white
    hover:text-blue-400 mr-4">
    <slot />
</Link>
