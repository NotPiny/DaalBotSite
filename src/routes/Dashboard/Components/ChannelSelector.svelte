<script>
    import { browser } from '$app/environment';
import tools from '$lib/dashboard/tools';
    import { APIChannel } from '$lib/dashboard/types';
    import { onMount } from 'svelte';

    /**
     * @type {APIChannel}
     */
    export let selectedChannel = {
        id: '',
        name: '',
        type: '0',
        category: '',
        position: 0
    };

    export let allowedTypes = ['all']

    /**
     * @type {APIChannel[]}
     */
    let channels = [];
    /**
     * @type {APIChannel[]}
    */
    let channelsStart = [];
    let channelsReady = false;

    onMount(async() => {
        // @ts-ignore
        // [{"id":"1017715576073895956","name":"Text channels","type":4,"category":"None","position":1},{"id":"1017715576073895957","name":"Voice channels","type":4,"category":"None","position":2}...]
        channels = (await tools.guild.getChannels());
        channelsStart = channels; // Save the original list for searching

        channelsReady = true;
    });

    /**
     * @param {APIChannel} channel
     */
    function isEnabled(channel) {
        let valid = false;

        for (let i = 0; i < allowedTypes.length; i++) {
            if (allowedTypes[i] == 'all' && parseInt(channel.type) != 4) {
                valid = true;
                break;
            }
            if (channel.type == allowedTypes[i]) {
                valid = true;
                break;
            }
        }

        return valid ? 'enabled' : 'disabled';
    }

    let currentQuery = '';

    $: search(currentQuery);

    /**
     * @param {string} query
    */
    async function search(query) {
        if (query == '') {
            channels = channelsStart;
            return;
        }

        channels = channelsStart.filter(channel => channel.name.toLowerCase().includes(query.toLowerCase()));
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="comp_channel-selector-search" on:click={() => {
    if (browser) {
        // Focus the input when the search bar is clicked (idk why the input doesnt cover the whole div)
        /** @type {HTMLInputElement | null} */
        const input = document.querySelector('.comp_channel-selector-search input');
        if (input) {
            input.focus();
        }
    }
}}>
    <input type="text" placeholder="Search for a channel..." bind:value={currentQuery}/>
</div>
<div class="comp_channel-selector">
    {#if channelsReady}
        {#each channels as channel}
            <div class="channel-selector-entry channel-selector-{isEnabled(channel)}">
                <span class="channel-selector-icon">
                    {(() => {
                        switch (parseInt(channel.type)) {
                            case 0: // Text Channel
                                return '#';
                            case 2: // Voice Channel
                                return '🔊';
                            case 4: // Category
                                return 'v';
                            case 5: // News Channel
                                return '📰';
                            default:
                                return `[${channel.type}]`;
                        }
                    })()}
                </span>
                <span class="channel-selector-gap"/>
                <span class="channel-selector-name">{channel.name}</span>
            </div>
        {/each}
    {:else}
        <div>Loading...</div>
    {/if}
</div>

<style>
    .comp_channel-selector {
        padding: 5rem;

        color: white;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        gap: 1rem;
    }

    .channel-selector-entry {
        width: 100%;
    }

    .channel-selector-disabled {
        opacity: 0.5;
    }

    .channel-selector-gap {
        width: 0.25rem;
        display: inline-block;
    }

    .comp_channel-selector-search {
        padding: 1rem;
        display: flex;
        justify-content: center;

        position: absolute;
        top: 2em;
        left: 50%;
        transform: translateX(-50%);
    }

    .comp_channel-selector-search input {
        padding: 1.25rem;
        font-weight: bold;
        border-radius: 0.5rem;
        border: none;
        background-color: rgba(17, 16, 16, 0.5);
        color: white;

        text-align: center;
        font-size: large;
    }
</style>