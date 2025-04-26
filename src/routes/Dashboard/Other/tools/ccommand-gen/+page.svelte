<svelte:head>
    <title>DaalBot - Command Generator</title>
</svelte:head>

<script>
    import '$lib/dashboard/global.css';
    import CommandGenerator from './CommandGenerator.svelte';
</script>

<main>
    <h1>Command Generator</h1>
    <p>Generate a command that you can run to create a custom slash command with DaalBot</p>

    <div class="generator">
        <CommandGenerator />
    </div>
</main>

<style>
    .generator {
        width: 100%;
    }
</style>