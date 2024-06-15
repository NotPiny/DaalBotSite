<svelte:head>
    <title>
        Event Editor - Dashboard
    </title>
</svelte:head>

<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { IconDeviceFloppy } from '@tabler/icons-svelte';

    // @ts-ignore
    export let data;

    // @ts-ignore
    let editor; // Monaco editor instance

    let isMobile = true;

    async function saveEvent() {
        // @ts-ignore
        const moneditor = editor.editor.getModels()[0];
        const value = moneditor.getValue();

        if (!browser) return console.error('This function is only available in the browser.');
        
        // Save the value
        const urlSearchParams = new URLSearchParams(window.location.search);

        fetch(`https://api.daalbot.xyz/dashboard/events/write?guild=${data.slug}&data=${encodeURIComponent(value)}&id=${urlSearchParams.get('id')}`, {
            method: 'POST',
            headers: {
                'Authorization': `${localStorage.getItem('accesscode')}`
            },
        }).then(res => res.json()).then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log('Saved!');
            }

            // Show toast
            // @ts-ignore
            document.getElementById('save-toast').show();
            setTimeout(() => {
                // @ts-ignore
                document.getElementById('save-toast').hide();
            }, 3000);
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * Initiates the Monaco editor
     * @param {boolean} readonly
     * @param {string} value
     */
    async function initiateMonacoEditor(readonly = false, value) {
        import('monaco-editor').then(monaco => {
            editor = monaco;
            try {
                // @ts-ignore
                document.getElementById('editor-selector').remove();
            } catch {}
            // @ts-ignore
            monaco.editor.create(document.getElementById('editor'), {
                value: value ?? `// To learn more please visit https://lnk.daalbot.xyz/EventsGuide

// Example
if (message.channel.name === "counting") {
    const lastCount = parseInt(utils.variables.get("lastCount") ?? 0);
    if (parseInt(message.content) !== lastCount + 1) {
        message.delete();
    } else {
        utils.variables.set("lastCount", parseInt(message.content));
    }
}`,
                language: 'javascript',
                theme: 'vs-dark',
                readOnly: readonly,
            });

            // Save event on Ctrl + S
            window.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 's') {
                    e.preventDefault();
                    saveEvent();
                }
            });
        });
    }

    onMount(async() => {
        document.body.style.backgroundColor = '#1e1e1e';
        document.body.style.height = '100%';
        // @ts-ignore
        document.querySelector('html').style.height = '100%';

        const urlSearchParams = new URLSearchParams(window.location.search);

        const eventRequest = await fetch(`https://api.daalbot.xyz/dashboard/events/read?guild=${data.slug}&id=${urlSearchParams.get('id')}`, {
            headers: {
                'Authorization': `${localStorage.getItem('accesscode')}`
            }
        });

        const eventCode = await eventRequest.text();

        await initiateMonacoEditor(false, eventCode);

        // @ts-ignore
        document.getElementById('please-wait').remove();

        // Set isMobile
        isMobile = navigator.userAgent.match(/Android|iPhone|iPad/i) !== null;

        if (isMobile) {
            alert('Hey! It seems you are using a mobile device. The save button is at the bottom of the page. Although this is usable, it is recommended to use a computer for a better experience.')
        } else if (!localStorage.getItem('events_seen_computer_save_prompt')) {
            alert('Hey! Just a heads up, you can save the event by pressing Ctrl + S. (You will only see this message once)');
            localStorage.setItem('events_seen_computer_save_prompt', 'true');
        }
    });
</script>

<style>
    #mobile-save-button {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        background-color: #1e1e1e;
        color: white;
        display: flex;
        z-index: 100;
        justify-content: center;
    }

    #mobile-save-button button {
        background-color: #252525;
        color: white;

        font-size: 1rem;

        border: 2px solid #ffffff;
        border-radius: 50%;
        padding: 1rem;

        cursor: pointer; /* For the mobile users with a mouse i guess :sob: */

        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        bottom: 1rem;
        right: 1rem;
    }

    #editor {
        width: 100%;
        height: 100%;
    }

    #please-wait {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #1e1e1e;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }
</style>
<div id="please-wait" class="loading">
    <sl-spinner style="font-size: 250px; --track-width: 25px; --indicator-color: var(--colour-primary);"></sl-spinner>
</div>

<sl-alert variant="success" id="save-toast" class="sl-theme-dark">
    <sl-icon slot="icon" name="check2-circle"></sl-icon>
    <strong>Your changes have been saved</strong>
</sl-alert>

{#if isMobile}
    <div id="mobile-save-button">
        <button on:click={() => saveEvent()}>
            <IconDeviceFloppy size={24} />
        </button>
    </div>
{/if}

<div id="editor">
    <!-- Monaco code editor -->
</div>