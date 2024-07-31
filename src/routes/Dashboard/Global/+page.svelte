<script>
    import { onMount } from 'svelte';
    import dashTools from '$lib/dashboard/tools';
    import '$lib/dashboard/global.css';
</script>

<svelte:head>
    <title>Global Controls</title>
</svelte:head>

<main>
    <h1>
        Global Control
    </h1>
    <h2>
        Modules
    </h2>

    <div class="modules">
        <a href="/Dashboard/Global/guilds">Guilds</a>
    </div>
</main>

<style>
    * {
        color: white;
    }

    h1 {
        font-size: 2rem;
    }

    .modules {
        display: flex;
        flex-direction: row;

        gap: 1rem;
    }

    .modules a {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        margin: 0.5rem 0;

        padding: 0.75rem;
        border-radius: 0.5rem;
        background-color: #333;
    }
</style>