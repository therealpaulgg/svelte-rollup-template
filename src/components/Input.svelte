<script lang="ts">
    export let rules: ((val: string) => true | string)[] = []
    export let value = ""
    export let id = ""
    export let placeholder = ""
    export let autocomplete = "off"
    let valid: true | string = true

    function validate(e: any) {
        for (const rule of rules) {
            let result: string | true
            if (e.target.value) {
                result = rule(e.target.value)
            } else {
                result = rule(value)
            }
            if (typeof result == "string") {
                valid = result
                return
            }
        }
        valid = true
    }
</script>

<!-- 
    validate function subscribes to 3 events:
    - input - when the user types something in
    - blur - when the user leaves the input field
    - change - when the input is programatically changed
-->

<input
    type="text"
    {id}
    {placeholder}
    {autocomplete}
    on:input={validate}
    on:change={validate}
    on:blur={validate}
    class={'text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal ' + ($$props.class + ' ' + (typeof valid == 'string' ? 'border-red-500 dark:border-red-500' : ''))}
    bind:value />
{#if typeof valid == 'string'}
    <p class="text-red-500 text-xs italic">{valid}</p>
{/if}
