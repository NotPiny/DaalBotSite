<script>
    import { browser } from '$app/environment';
    import '$lib/dashboard/global.css';

    let fileContents = '';
    let disableTranscriptUpdate = false; // This is a hack to prevent the iframe update from causing the iframe to update in an infinite loop
    let transcriptPage = '<h1>Transcript Viewer</h1>';

    $: {
        (async() => {
            if (fileContents && browser && !disableTranscriptUpdate) {
                const transcript = JSON.parse(fileContents);
                /**
                 * @type {HTMLIFrameElement | null}
                */
                // @ts-ignore
                const transcriptView = document.getElementById('transcript-view');
                if (!transcriptView) return;

                const req = await fetch('https://api.daalbot.xyz/render/transcript', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(transcript)
                });

                transcriptPage = await req.text();

                disableTranscriptUpdate = true; // Make sure the next line doesn't cause the iframe to reload
                transcriptView.srcdoc = transcriptPage;
                transcriptView.style.display = 'block';

                const main = document.getElementById('uploader');
                if (main) {
                    main.style.display = 'none';
                }
            }
        })()
    }
</script>

<iframe id="transcript-view" srcdoc="{transcriptPage}" style="width: 100%; height: 100%; display: none;" title="Transcript preview window"/>

<main id="uploader">
    <h1>Transcript Viewer</h1>
    <div class="dropZoneContainer">
        <input type="file" accept=".json" class="FileUpload" on:change={async(event) => {
            // @ts-ignore
            const file = event.target.files[0];
            fileContents = await file.text();
        }} />    
        <div class="dropZoneOverlay">Drag and drop your transcript file <br />or<br />Click to add</div>
    </div>
</main>

<style>
    main {
        color: white;
    }

    input {
        margin-top: 1rem;

        padding: 1rem;
        border: 1px solid white;
        border-radius: 0.5rem;
        background-color: #0e0f11;

        text-align: center;
    }

    .dropZoneOverlay, .FileUpload {
        width: 283px;
        height: 71px;
    }

    .dropZoneOverlay {
        border: solid 1px;
        padding: 1rem;
        border-radius: 0.5rem;
        color: #ffffff;
        text-align: center;

        position: relative;
        z-index: 0;

        top: -105px;
    }

    .FileUpload {
        opacity: 0;
        position: relative;
        z-index: 1;
    }

    #transcript-view {
        border: none;

        height: 100vh !important;
    }
</style>

<!-- <main>
    <h1>
        This is coming soon!
    </h1>
    <p>
        Not right now because of weird iframe issues. (I'm working on it)
    </p>
</main> -->