<script>
    let dev = false;

    import { onMount } from 'svelte';

    onMount(() => {
        dev = import.meta.env.DEV;

        if (localStorage.getItem('unstable_dev_toggle') == 'true') {
            dev = true;
        } else if (localStorage.getItem('unstable_dev_toggle') == 'false') {
            dev = false; // Ignore current environment if the client has forced dev mode off
        }

        if (dev) {
            console.log('Development mode is enabled');
        }
    });
</script>

{#if dev}
    <div class="dev_only">
        <slot></slot>
    </div>
{/if}