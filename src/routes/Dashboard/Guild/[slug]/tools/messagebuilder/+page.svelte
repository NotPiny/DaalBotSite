<script>
// @ts-nocheck

    import tools from '$lib/dashboard/tools';
    import { onMount } from 'svelte';
    import { APIChannel } from '$lib/dashboard/types';
    // @ts-ignore
    import { browser } from '$app/environment';
    import { IconCaretDown, IconCaretRight } from '@tabler/icons-svelte';

    /**
     * @type {Array<APIChannel> | null}
     */
    let channels = null;

    /**
     * @type {APIChannel | null | undefined}
    */
    let selectedChannel = null;

    onMount(async() => {
        await tools.page.applyStyles();
        channels = (await tools.guild.getChannels()).filter(channel => channel.type == '0');

        await new Promise(resolve => setTimeout(resolve, 500));

        /**
         * @type {Element | null}
        */
        const select = document.getElementById('channelSelector');

        if (select) {
            select.addEventListener('sl-change', (event) => {
                /**
                 * @type {string}
                */
                // @ts-ignore
                const channelId = event.target.value;

                if (channels) { selectedChannel = channels.find(channel => channel.id == channelId); } else {
                    console.error('Channels not found.');
                } 
            });
        } else {
            console.error('Select not found.');
        }
    });

    // Always escape HTML for text arguments!
    /**
     * @param {string | null} html
     */
        function escapeHtml(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }

    // Custom function to emit toast notifications (I dont know how tf this works but it does so I'm not touching it)
    /**
     * @param {any} message
     */
    function notify(message, variant = 'primary', icon = 'info-circle', duration = 3000) {
        const alert = Object.assign(document.createElement('sl-alert'), {
        variant,
        closable: true,
        duration: duration,
        innerHTML: `
            <sl-icon name="${icon}" slot="icon"></sl-icon>
            ${escapeHtml(message)}
        `
        });

        alert.classList.add('sl-theme-dark')

        // @ts-ignore
        document.querySelector('main').append(alert);
        // @ts-ignore
        return alert.toast();
    }

    async function sendMessage() {
        if (!browser) return;

        if (!selectedChannel) return alert('Please select a channel.');
        /**
         * @type {HTMLIFrameElement | null}
        */
        // @ts-ignore
        const iframe = document.getElementById('embedbuilder');
        if (!iframe) return alert(`Failed to send message (iframe not found).`);

        const contentWindow = iframe.contentWindow;
        if (!contentWindow) return alert(`Failed to send message (content window not found).`);

        // @ts-ignore
        const data = contentWindow.window.json;

        if (!data) return alert(`Failed to send message (data not found).`);

        const guildId = await tools.guild.extractURL(window.location.href);
        await fetch(`https://api.daalbot.xyz/dashboard/messages/create?guild=${guildId}&channel=${selectedChannel.id}&data=${encodeURIComponent(JSON.stringify(data))}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accesscode')}`
            }
        });

        notify('Message sent successfully.', 'success', 'check-circle');
    }

    async function submitWebhookForm() {
        const form = document.getElementById('webhook-info');
        if (!form) return alert('Form not found.');

        const username = document.getElementById('username');
        if (!username) return alert('Username input not found.');

        const avatar = document.getElementById('avatar');
        if (!avatar) return alert('Avatar input not found.');

        if (!username.value) return alert('Please input a username.');
        if (!avatar.value) return alert('Please input an avatar.');
    }
</script>

<svelte:head>
    <title>Message Builder - Dashboard</title>
</svelte:head>

<main class="sl-theme-dark">
    <h1>Message Builder</h1>

    {#if channels}
        <sl-select placeholder="Select a channel." size="medium" id="channelSelector">
            {#if channels}
                {#each channels as channel}
                    <sl-option value="{channel.id}">{channel.name}</sl-option>
                {/each}
            {/if}
        </sl-select>
    {:else}
        <p>Loading...</p>
    {/if}

    <iframe src="/html/embedbuilder/index.html" id="embedbuilder" title="Embed Builder"></iframe>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <sl-button-group label="Send Button Group">
        <sl-button on:click={sendMessage}>Send</sl-button>
        <sl-dropdown placement="bottom-end">
            <sl-button slot="trigger" caret>
                <sl-visually-hidden>More options</sl-visually-hidden>
            </sl-button>
            <sl-menu>
                <sl-menu-item disabled>Send as webhook</sl-menu-item>
            </sl-menu>
        </sl-dropdown>
    </sl-button-group>

    <!-- <div class="send">
        <button on:click={sendMessage}>Send</button> <button class="caret"><IconCaretRight /></button>
    </div> -->
</main>

<!-- <sl-dialog label="Author Info" class="sl-theme-dark" open>
    <form id="webhook-info">
        <label for="username">Username</label>
        <input placeholder="Input webhook username here" id="username"/><br/>
        <label for="avatar">Avatar</label>
        <input type="file" id="avatar"/>
    </form>
    <!-- svelte-ignore a11y-click-events-have-key-events --
    <!-- svelte-ignore a11y-no-static-element-interactions --
    <sl-button slot="footer" variant="primary" id="">Send</sl-button>
</sl-dialog> -->

<style>
    iframe {
        width: 100%;
        height: 100vh;
        border: none;

        margin-top: 1rem;
    }

    label {
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        font-weight: bold;
    }

    input {
        padding: 0.5rem 1rem;
        background-color: #2f2f2f;
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        border: transparent 2.5px solid;
        border-radius: 5px;

        width: 90%;

        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }

    input[type="file"] {
        margin-bottom: 0;
    }

    /* .send {
        margin-top: 1rem;
        
        padding: 0.5rem 1rem;
        background-color: #2f2f2f;
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        border: transparent 2.5px solid;
        border-radius: 5px;

        cursor: pointer;
    }

    .send button:hover {
        background-color: #3f3f3f;
    }

    .send button {
        background-color: transparent;
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        border: transparent 2.5px solid;
        border-radius: 5px;
        padding: 0.5rem 1rem;
    }

    .caret {
        margin-left: -2rem;
    } */

    .sl-theme-dark {
        color: white;
    }
</style>