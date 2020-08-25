<script lang="ts">
    export let collapsed
</script>

<style lang="scss">
    #sidebar {
        width: 450px;
        min-height: 100vh;
        height: 100%;
        position: fixed;
        overflow: auto;
        transition: 0.5s;
        // transform: translate(0%);
    }
</style>

<div
    id="sidebar"
    class="bg-gray-800 text-white shadow-inner"
    style="transform: {collapsed ? 'translate(-100%)' : 'translate(0%)'}">
    <div class="p-4">
        <slot />
    </div>
</div>
