<svelte:head>
    <title>
        Event Editor
    </title>
</svelte:head>

<script>
    import { onMount } from 'svelte';

    export let data;

    let editor; // Monaco editor instance

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

            // Listen for ctrl + s to save
            window.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 's') {
                    e.preventDefault();
                    // @ts-ignore
                    const editor = monaco.editor.getModels()[0];
                    const value = editor.getValue();
                    
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
    });
</script>

<style>
    #editor {
        width: 100%;
        height: 100vh;
    }
</style>
<div id="please-wait" class="loading">
    <div class="loading__spinner"></div>
    <h1 class="loading__text" style="color: white; font-family: Poppins, Sans-serif; text-align: center;">Please wait...</h1>
</div>
<div id="editor">
    <!-- Monaco code editor -->
</div>