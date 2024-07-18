<script>
    import tools from '$lib/dashboard/tools';
    import { APIChannel } from '$lib/dashboard/types';
    import { onMount } from 'svelte';

    export let guild = '';
    export let selectedChannel = {
        id: '0',
        name: 'None',
        type: '-1'
    };

    export let allowedTypes = ['all']

    /**
     * @type {APIChannel[]}
     */
    let channels = [];

    onMount(async() => {
        // @ts-ignore
        channels = JSON.parse(await tools.api.get(`https://api.daalbot.xyz/dashboard/guilds/channels`, guild)).sort((a, b) => a.position - b.position);
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
</script>

<div class="comp_channel-selector">
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
            <span class="channel-selector-name">{channel.name}</span>
        </div>
    {/each}
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
</style>