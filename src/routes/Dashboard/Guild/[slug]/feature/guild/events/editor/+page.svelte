<svelte:head>
    <title>
        Event Editor
    </title>
</svelte:head>

<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    // @ts-ignore
    export let data;

    // @ts-ignore
    let editor; // Monaco editor instance

    let isMobile = true;

    async function saveEvent() {
        // @ts-ignore
        const moneditor = editor.editor.getModels()[0];
        const value = moneditor.getValue();
        
        // Save the value
        console.log('Saving...', value)

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
            alert('Hey! Just a heads up, you can save the event by pressing Ctrl + S.');
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
        width: 75%;
        background-color: #252525;
        color: white;

        font-size: 1rem;

        border: 5px solid #ffffff;
        border-radius: 5px;
        padding: 1rem;
    }

    #editor {
        width: 100%;
        height: 100vh;
    }
</style>
<div id="please-wait" class="loading">
    <div class="loading__spinner"></div>
    <h1 class="loading__text" style="color: white; font-family: Poppins, Sans-serif; text-align: center;">Please wait...</h1>
</div>
<div id="mobile-save-button" style="{isMobile ? '' : 'display: none;'}">
    <button on:click={() => saveEvent()}>Save</button>
</div>
<div id="editor">
    <!-- Monaco code editor -->
</div>