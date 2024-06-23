<script>
    import Popup from "../../../../components/Popup.svelte"; // Just using popups because i dont want to have to manually do the modal stuff
    import { onMount } from 'svelte';
    import tools from "$lib/dashboard/tools";

    const features = {
        guild: [
            // { name: 'Autorole', value: 'autorole' },
            { name: 'Configuration', value: 'config' },
            { name: 'Events', value: 'events' },
            { name: 'Logs', value: 'logs' },
            { name: 'Tickets', value: 'ticket' },
            { name: 'Welcome Messages', value: 'welcome' },
        ],
        social: [
            { name: 'Twitch alerts', value: 'twitch' },
            { name: 'Youtube alerts', value: 'youtube' },
        ],
        xp: [
            { name: 'Leaderboard', value: 'leaderboard' },
            { name: 'User Lookup', value: 'lookup' },
            { name: 'Level Rewards', value: 'reward' }
        ]
    }

    let currentText = '';
    /**
     * @type {any[]}
     */
    let results = [];

    let guildId = '';

    onMount(async() => {
        guildId = await tools.guild.extractURL(window.location.href);

        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                console.log('Opening search');

                // @ts-ignore
                document.getElementById('popup-search').style.display = 'block';
            }
        })
    })

    $: {
        if (currentText.length > 0) {
            console.log('Searching for', currentText);
        }

        // Get results
        if (currentText.length > 0) {
            results = Object.keys(features).flatMap(category => {
                // @ts-ignore
                return features[category].filter(f => f.name.toLowerCase().includes(currentText.toLowerCase())).map(r => {
                r.name = r.name.split('')[0].toUpperCase() + r.name.slice(1);
                r.path = `/Dashboard/Guild/${guildId}/feature/${category}/${r.value}`;
                r.category = category;
                return r;
                });
            });
        }
    }
</script>

<Popup id="search">
    <input type="text" bind:value={currentText} placeholder="Search for a feature" />

    <div class="results">
        {#if currentText.length > 0}
            {#each Object.keys(features) as category}
                <!-- Only show category if it has results -->
                {#if results.filter(r => r.category === category).length > 0}
                    <h2>{category.split('')[0].toUpperCase() + category.slice(1)}</h2>
                    {#each results.filter(r => r.category === category) as result}
                        <a href={result.path} class="result" on:click={async() => {
                            // @ts-ignore
                            document.getElementById('popup-search').style.display = 'none';
                        }}>
                            <h4 style="margin: 0;">{result.name}</h4>
                        </a>
                    {/each}
                {/if}
            {/each}
        {/if}
    </div>
</Popup>

<style>
    .results {
        margin-top: 1rem;
        color: white;
    }

    .result {
        color: white;
        text-decoration: none;
        display: block;
        margin-bottom: 1rem;
    }

    input {
        width: 20rem;
        padding: 10px;
        margin-top: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>