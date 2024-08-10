<script>
    import DashNav from "./DashNav.svelte";
    import Search from "./Search.svelte";
    import '$lib/dashboard/global.css';
    import { onMount } from "svelte";

    // Create ctrl + g event listener
    onMount(() => {
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'g') {
                window.location.href = '/Dashboard/Home';
            }
        });
    })
</script>
<svelte:head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/shoelace.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/themes/light.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/themes/dark.css" />
</svelte:head>
<Search />
<DashNav />
<slot />