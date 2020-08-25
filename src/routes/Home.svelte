<script lang="ts">
    import Button from "../components/Button.svelte"
    import { useNavigate } from "svelte-navigator"

    const navigate = useNavigate()
</script>

<h1 data-testid="home-header">Home</h1>

<Button on:click={() => navigate('/test')}>Go To Test</Button>
