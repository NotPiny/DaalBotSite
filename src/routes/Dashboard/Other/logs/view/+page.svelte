<svelte:head>
    <title>Logs - Dashboard</title>
</svelte:head>

<script>
    import tools from '$lib/dashboard/tools';
    import { onMount } from 'svelte';
    import '$lib/dashboard/global.css';

    let pasteID = '';

    let text = '';
    let mode = 'plain';
    let side1 = '';
    let side2 = '';

    onMount(async() => {
        const params = new URLSearchParams(window.location.search);
        pasteID = params.get('src') ?? `/UnknownError.txt`;

        if (params.has('raw')) {
            window.location.href = `https://termbin.com/${pasteID}`; // Redirect to the raw paste for when i need to use the function for other stuff
        }

        const response = await fetch(`/api/paste/${pasteID}`);
        text = (await response.text()).replace(`--- OLD ---\n`, '').replace(`--- NEW ---\n`, '\n:::');

        if (text.includes('\n:::')) {
            mode = 'split';
            [side1, side2] = text.split('\n:::');
        }
    })
</script>

<svelte:head>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/shoelace.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/themes/dark.css" />
</svelte:head>

<main class="sl-theme-dark">
    <h1>Logs</h1>
    {#if mode == 'plain'}
        <pre>{text}</pre>
    {:else}
        <div class="data-split">
            <div class="data-split-1">
                <pre>{side1}</pre>
            </div>
            <div class="data-split-2">
                <pre>{side2}</pre>
            </div>
        </div>
    {/if}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <sl-button href="https://termbin.com/{pasteID}">View original</sl-button>
</main>

<style>
    main {
        color: white;
    }

    pre {
        width: 100%;
        height: 100%;
        border: none;

        background-color: #2f2f2f;
        color: white;
    }

    .data-split {
        display: flex;
        flex-direction: row;
        width: 100%;

        gap: 10em;
    }

    .data-split-1, .data-split-2 {
        display: flex;
        flex-direction: column;
        gap: 1em;

        overflow: auto;
        font-size: 2em;
    }

    .data-split-1 {
        width: 45%;
    }

    .data-split-2 {
        width: 45%;
    }
</style>