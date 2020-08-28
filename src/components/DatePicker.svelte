<script lang="ts">
    import Flatpickr from "svelte-flatpickr"
    import flatpickr from "flatpickr"
    import "flatpickr/dist/flatpickr.css"
    import "flatpickr/dist/themes/light.css"
    import moment from "moment"
    import Input from "./Input.svelte"

    let dateValue: string | [string, string] = ["", ""]
    $: updateDate(dateValue)

    function updateDate(dv: string | [string, string] | [Date, Date]) {
        if (Array.isArray(dv)) {
            if (
                typeof dv[0] != "string" &&
                String(new Date(dv[0])) !== "Invalid Date"
            ) {
                dv[0] = flatpickr.formatDate(dv[0], "Y-m-d")
            }
            if (
                typeof dv[1] != "string" &&
                String(new Date(dv[1])) !== "Invalid Date"
            ) {
                dv[1] = flatpickr.formatDate(dv[1], "Y-m-d")
            }
            if (
                moment(dv[0], "YYYY-MM-DD", true).isValid &&
                moment(dv[1], "YYYY-MM-DD", true).isValid &&
                flatpickr.parseDate(dv[0], "Y-m-d") >
                    flatpickr.parseDate(dv[1], "Y-m-d")
            ) {
                let temp = dv[0]
                dv[0] = dv[1]
                dv[1] = temp
                if (document.activeElement.id == "startDate") {
                    document.getElementById("endDate").focus()
                } else if (document.activeElement.id == "endDate") {
                    document.getElementById("startDate").focus()
                }
            }
        } else {
            dv = [moment(dv).format("YYYY-MM-DD"), ""]
        }
    }
</script>

<div>
    <Flatpickr
        options={{ mode: 'range', dateFormat: 'Y-m-d' }}
        bind:value={dateValue}
        element="#date-picker">
        <div id="date-picker">
            <input
                class="text-black focus:outline-none focus:shadow-outline border
                border-gray-300 rounded-lg py-2 px-4 block w-full
                appearance-none leading-normal"
                type="text"
                placeholder="Select Date"
                data-input />
        </div>
    </Flatpickr>
    {#if Array.isArray(dateValue)}
        <label for="startDate">Start Date</label>
        <Input
            id="startDate"
            rules={[(val) => moment(val, 'YYYY-MM-DD', true).isValid() || 'Invalid date']}
            placeholder="YYYY-MM-DD"
            bind:value={dateValue[0]} />
        <label for="endDate">End Date</label>
        <Input
            id="endDate"
            rules={[(val) => moment(val, 'YYYY-MM-DD', true).isValid() || 'Invalid date']}
            placeholder="YYYY-MM-DD"
            bind:value={dateValue[1]} />
    {:else}
        <p>
            You must have two dates available. Please select two from the date
            picker before attempting to type in dates.
        </p>
    {/if}
</div>
