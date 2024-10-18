<script>
// @ts-nocheck
    import tools from '$lib/dashboard/tools';
    import { onMount } from 'svelte';
    import { APIChannel } from '$lib/dashboard/types';
    import { browser } from '$app/environment';
    import { IconDots, IconCircleX } from '@tabler/icons-svelte';
    import ChannelSelector from '../../../../Components/ChannelSelector.svelte';
    
    /**
     * @type {APIChannel | null | undefined}
    */
    let selectedChannel = null;

    let currentGuild = '';

    let webhookData = {
        username: '',
        avatar: '',
        avatarURL: null,
        enabled: false
    }

    let injectedData = {};

    let sending = false;

    onMount(async() => {
        currentGuild = await tools.guild.extractURL(window.location.href);

        document.getElementById('modal-send').addEventListener('click', submitWebhookForm);
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

    function filterData(input) {
        if (JSON.stringify(input).match(/"embed":{"color":[0-9]*}/g)) {
            // Embed with only colour (invalid so bin it)
            const returnObj = {
                content: input.content
            }

            if (input.username) {
                returnObj.username = input.username;
            }

            if (input.avatar) {
                returnObj.avatar = input.avatar;
            }

            if (input.id) {
                returnObj.id = input.id;
            }

            return returnObj;
        } else {
            return input;
        }
    }

    async function sendMessage() {
        if (!browser || sending) return;
        sending = true; // Set sending to true to show spinner and disable button

        if (!selectedChannel) {
            notify('Please select a channel.', 'danger', 'exclamation-triangle');
            return sending = false;
        };
        /**
         * @type {HTMLIFrameElement | null}
        */
        // @ts-ignore
        const iframe = document.getElementById('embedbuilder');
        if (!iframe) {
            notify('Failed to send message (iframe not found).', 'danger', 'exclamation-triangle');
            return sending = false;
        };

        const contentWindow = iframe.contentWindow;
        if (!contentWindow) {
            notify('Failed to send message (contentWindow not found).', 'danger', 'exclamation-triangle');
            return sending = false;
        
        };

        // @ts-ignore
        const data = contentWindow.window.json;

        if (!data) {
            notify('Failed to send message (data not found).', 'danger', 'exclamation-triangle');
            return sending = false;
        };

        if (webhookData.enabled && !webhookData.avatarURL) {
            const formData = new FormData();
            formData.append('image', webhookData.avatar.split(';base64,')[1]); // Append the avatar to the form data

            const res = await fetch('https://api.imgbb.com/1/upload?key=156507fba973791ad2c2d9e55d8efe70', {
                method: 'POST',
                body: formData
            })
            const json = await res.json();
            webhookData.avatarURL = json.data.url;

            console.log('Webhook data:', webhookData);
        }

        const mRes = await fetch(`https://api.daalbot.xyz/dashboard/messages/create?guild=${currentGuild}&channel=${selectedChannel.id}${webhookData.enabled ? `&webhook=${encodeURIComponent(JSON.stringify({ username: webhookData.username, avatarURL: webhookData.avatarURL }))}` : ''}&data=${encodeURIComponent(JSON.stringify(filterData({ ...data, ...injectedData })))}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accesscode')}`
            }
        });

        if (mRes.status == 424) {
            notify('Failed to send message (Bot does not have a webhook in the channel).', 'danger', 'exclamation-triangle');   
        } else if (mRes.status == 200) {
            notify(`Message ${injectedData?.id ? 'updated' : 'sent'} successfully.`, 'success', 'check-circle');
        } else {
            notify('Failed to send message (API Req Failed / Check console)', 'danger', 'exclamation-triangle');
        }

        sending = false;
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    async function submitWebhookForm() {
        /**
         * @type {HTMLFormElement | null}
         */
        const form = document.getElementById('webhook-info');
        if (!form) return alert('Form not found.');

        const username = document.getElementById('username');
        if (!username) return alert('Username input not found.');

        /**
         * @type {HTMLInputElement | null}
         */
        const avatar = document.getElementById('avatar');
        if (!avatar) return alert('Avatar input not found.');

        /**
         * @type {HTMLInputElement | null}
        */
        const message_id = document.getElementById('message_id');
        if (!message_id) return alert('Message ID input not found.');

        if (username.value != '' || avatar.value != '') {
            if (!username.value) return alert('Please input a username.');
            if (!avatar.value) return alert('Please input an avatar.');

            const avatarBase64 = await toBase64(avatar.files[0]);
            if (!avatarBase64) return alert('Failed to convert avatar to base64.');

            webhookData = {
                username: username.value,
                avatar: avatarBase64,
                avatarURL: null,
                enabled: true
            }
        }

        if (message_id.value != '') {
            injectedData = {
                id: message_id.value
            }
        }

        document.getElementById('wh-dialog').hide();

        notify('Settings updated successfully.', 'success', 'check-circle');
    }
</script>

<svelte:head>
    <title>Message Builder - Dashboard</title>
</svelte:head>

<ChannelSelector bind:selectedChannel={selectedChannel} onSelect={() => {
    if (!browser) return;
    // @ts-ignore
    document.querySelector('.comp_channel-selector-wrapper').style.display = 'none';
    document.querySelector('main').style.display = 'flex';
}}
style="display: none;"
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<main class="sl-theme-dark">
    <h1>Message Builder</h1>

    <div class="channel-settings">
        <button class="channel-selector-trigger" on:click={() => {
            if (!browser) return;
            // @ts-ignore
            document.querySelector('.comp_channel-selector-wrapper').style.display = 'block'; // Show the channel selector
            document.querySelector('main').style.display = 'none'; // Hide the main content
            document.scrollingElement.scrollTop = 0; // Scroll to the top of the page
        }}>
            <p>
                {#if selectedChannel}
                    {selectedChannel.name}
                {:else}
                    Select a channel
                {/if}
            </p>
        </button>
        <sl-tooltip content="Webhook settings">
            <button on:click={() => {
                if (!browser) return;

                const dialog = document.querySelector('sl-dialog');
                if (dialog) {
                    // @ts-ignore
                    dialog.show();
                } else {
                    console.error('Dialog not found.');
                }
            }}><IconDots/></button>
        </sl-tooltip>
    </div>

    <iframe src="/html/embedbuilder/index.html" id="embedbuilder" title="Embed Builder"></iframe>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="send" on:click={sendMessage}>
        <button>
            {#if !sending}
            Send
            {:else}
            <sl-spinner
            style="--indicator-color: #4d4d4d;"
            ></sl-spinner>
            {/if}
        </button>
    </div>
</main>

<sl-dialog label="More Settings" class="sl-theme-dark" id="wh-dialog">
    <form id="webhook-info">
        <h3 style="margin-top: 0;">Webhook Info</h3>
        <label for="username">
            <p>Username</p>
        </label>
        <input placeholder="Input webhook username here" id="username" required/><br/>
        <label for="avatar">
            <p>Avatar</p>
            <button style="background-color: transparent; border: none;" on:click={() => {
                if (!browser) return;
                
                document.getElementById('avatar').value = '';
                document.getElementById('avatar').files = [];

                webhookData.enabled = false;
            }}>
                <IconCircleX size=20/>
            </button>
        </label>
        <input type="file" id="avatar" accept="image/png,image/jpeg,image/webp" required/>
    </form>
    <form id="more-options">
        <h3>More Options</h3>
        <label for="message_id">
            <p>Message ID</p>
        </label>
        <input placeholder="The message to be edited (optional)" id="message_id"/>
    </form>
    <!-- No longer a send button but fuck it its already set in the code -->
    <button slot="footer" variant="primary" id="modal-send">Set</button> 
</sl-dialog>

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

        display: flex;
    }

    label button {
        flex-direction: row-reverse;
        background-color: transparent;
        border: none;

        cursor: pointer;
    }

    label p {
        margin: 0;
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

    .send {
        padding: 0.5rem 1rem;
        background-color: #2f2f2f;
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        border: transparent 2.5px solid;
        border-radius: 5px;

        cursor: pointer;
        position: relative;
        top: 0.9rem;
    }

    .send:hover {
        background-color: #3f3f3f;
    }

    .send button {
        background-color: transparent;
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        border: transparent 2.5px solid;
        border-radius: 5px;
        padding: 0.25rem 1rem;

        cursor: pointer;
    }

    .sl-theme-dark {
        color: white;
    }

    .channel-settings {
        display: flex;
        justify-content: space-between;
        align-items: center;

        gap: 0.25rem;

        margin-top: 1rem;
    }

    .channel-settings button {
        background-color: transparent;
        border: solid var(--sl-input-border-width) var(--sl-input-border-color);

        border-radius: var(--sl-input-border-radius-medium);

        padding: 0.25rem 0.25rem;

        cursor: pointer;
    }

    button[variant="primary"] {
        background-color: var(--sl-color-gray-300);
        color: white;
        font-family: Poppins, sans-serif;
        font-size: 1rem;
        font-weight: bold;
        border: transparent 2.5px solid;
        border-radius: 5px;
        padding: 0.5rem 1rem;

        cursor: pointer;
    }

    .channel-selector-trigger p {
        margin: 0.2rem;

        font-family: Poppins, sans-serif;
        font-size: 1rem;
    }
</style>