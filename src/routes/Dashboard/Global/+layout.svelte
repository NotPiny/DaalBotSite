<script>
    import '$lib/dashboard/global.css';
</script>

<svelte:head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/shoelace.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/themes/dark.css" />
</svelte:head>

<div class="sl-theme-dark">
    <slot />
</div>