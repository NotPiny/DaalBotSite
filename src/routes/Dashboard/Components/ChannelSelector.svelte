<script>
    import { browser } from '$app/environment';
    import tools from '$lib/dashboard/tools';
    import { APIChannel } from '$lib/dashboard/types';
    import { onMount } from 'svelte';
    import TextIcon from '$lib/images/svg/icons/discord/channels/Text.svg';
    import VoiceIcon from '$lib/images/svg/icons/discord/channels/Voice.svg';
    import CategoryIcon from '$lib/images/svg/icons/discord/channels/Category.svg';
    import NewsIcon from '$lib/images/svg/icons/discord/channels/Announcement.svg';
    import ForumIcon from '$lib/images/svg/icons/discord/channels/Forum.svg';
    import HelpIcon from '$lib/images/svg/icons/discord/bar/Help.svg';
    import ThreadIcon from '$lib/images/svg/icons/discord/channels/Thread.svg';
    import MediaIcon from '$lib/images/svg/icons/discord/channels/Media.svg';

    /**
     * @type {APIChannel | null}
     */
    export let selectedChannel = null;

    export let allowedTypes = ['all']

    /**
     * @param {any} channel
    */
    export let onSelect = (channel) => {
        console.log(channel);
    }

    export let style = '';

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

        const disallowedAllTypes = [
            4, // Category
        ]

        for (let i = 0; i < allowedTypes.length; i++) {
            if (allowedTypes[i] == 'all' && !disallowedAllTypes.includes(parseInt(channel.type))) {
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

    /**
     * @param {string} id
     */
    function selectChannel(id) {
        if (channels.find(channel => channel.id == id && parseInt(channel.type) == 4)) {
            // If the channel is a category, don't select it unless categories are allowed
            if (!allowedTypes.includes('4')) {
                return;
            }
        }
        selectedChannel = channels.find(channel => channel.id == id) ?? null;

        const currentSelected = document.querySelector('.channel-selector-selected');
        if (currentSelected) {
            currentSelected.classList.remove('channel-selector-selected');
        }

        const selected = document.querySelector(`#channel-selector-${id}`);
        if (selected) {
            selected.classList.add('channel-selector-selected');
        }

        onSelect(selectedChannel);
    }
</script>

<div class="comp_channel-selector-wrapper" {style}>
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
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each channels as channel}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div 
                class="channel-selector-entry channel-selector-{isEnabled(channel)}"
                on:click={() => { selectChannel(channel.id); }}
                id="channel-selector-{channel.id}"
                >
                    <span class="channel-selector-icon">
                        <img src={(() => {
                            switch (parseInt(channel.type)) {
                                case 0: // Text Channel
                                    return TextIcon;
                                case 2: // Voice Channel
                                    return VoiceIcon;
                                case 4: // Category
                                    return CategoryIcon;
                                case 5: // News Channel
                                    return NewsIcon;
                                case 10: // Announcement Thread
                                    return ThreadIcon;
                                case 11: // Public Thread
                                    return ThreadIcon;
                                case 12: // Private Thread
                                    return ThreadIcon;
                                case 13: // Stage Channel
                                    return VoiceIcon;
                                case 15: // Forum Channel
                                    return ForumIcon;
                                case 16: // Media Channel (It's just a fancy forum channel with a different icon)
                                    return MediaIcon;
                                default:
                                    return HelpIcon;
                            }
                        })()} alt="Channel type icon" width=24 height=24/>
                    </span>
                    <span class="channel-selector-gap"/>
                    <span class="channel-selector-name">{channel.name}</span>
                </div>
            {/each}
        {:else}
            <div>Loading...</div>
        {/if}
    </div>
</div>

<style>
    .comp_channel-selector {
        padding: 5rem;
        margin-top: 3rem;

        color: white;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        gap: 1rem;
    }

    .channel-selector-entry {
        width: 100%;
        padding: 0.75rem;
        border-radius: 0.5rem;
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

    .channel-selector-selected {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .channel-selector-icon {
        position: relative;
        top: 17%;
        transform: translateY(-50%);
    }

    .channel-selector-name {
        top: 50%;
        transform: translateY(-50%);
    }
</style>