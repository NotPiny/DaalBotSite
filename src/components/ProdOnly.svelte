<script>
    let prod = false;

    import { onMount } from 'svelte';

    onMount(() => {
        prod = (!import.meta.env.DEV || localStorage.getItem('unstable_dev_toggle') == 'false');
    });
</script>

{#if prod}
    <div class="prod_only">
        <slot></slot>
    </div>
{/if}