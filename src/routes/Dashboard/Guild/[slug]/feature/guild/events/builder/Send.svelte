<script>
    import { browser } from '$app/environment';
    import { Handle, Position } from '@xyflow/svelte';
    $$restProps; // Silence SvelteKit warning

    import SettingsPanel from './SettingsPanel.svelte';

    const panel = new SettingsPanel({
        target: document.body
    });

    panel.$set({
        visible: false,
        settings: [
            { name: 'Channel ID', value: '%%{CHANNEL_ID}%%' },
            { name: 'Content', value: '' }
        ]
    });

    export let data = {
        channel: '',
        content: ''
    }

    // TF IS THIS
    $: {
        if (browser) {
            panel.$set({
                settings: [
                    { name: 'Channel ID', value: data.channel },
                    { name: 'Content', value: data.content }
                ]
            });
        }
    }
</script>

<Handle type="target" position={Position.Top} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="custom" on:click={() => {
    panel.$set({ visible: true });
}}>
    <p>Send</p>
    <p class="description">Send a message to a channel</p>
</div>

<Handle type="source" position={Position.Bottom} id="a" />

<style>
    .custom {
        padding: 10px;
        background-color: #1E1E1E;
        border-color: #3C3C3C;
        border-width: 3px;
        color: white;
        border-radius: 3px;
    }

    p {
        margin: 0;
        font-size: 0.8em;
    }

    .description {
        color: #666;
        font-size: 0.6em;
    }
</style>