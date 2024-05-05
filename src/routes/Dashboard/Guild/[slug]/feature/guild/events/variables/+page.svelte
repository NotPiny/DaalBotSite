<script>
    import puzzleIcon from '$lib/images/svg/icons/filled/puzzle.svg';
    import globeIcon from '$lib/images/svg/icons/globe.svg';
    import { onMount } from 'svelte';
    import Popup from '../../../../../../../../components/Popup.svelte';

    onMount(() => {
        document.body.style.backgroundImage = 'linear-gradient(to right bottom, #6200ff, #6c0bf9, #7514f4, #7d1cee, #8323e9, #8724e4, #8b25df, #8e26da, #9022d4, #921fcf, #941bc9, #9517c4)';
        document.body.style.fontFamily = 'Poppins, sans-serif';
        document.body.style.height = '91.5vh';
    });

    /**
     * @param {string} editor
     */
    async function editVariable(editor) {
        if (editor === 'local') {
            const popupLocal = document.getElementById('popup-local');
            if (popupLocal) popupLocal.style.display = 'block';
        } else if (editor === 'global') {
            window.location.href += '/global';
        }
    }
</script>

<svelte:head>
    <title>Variables - Dashboard</title>
</svelte:head>

<Popup id="local">
    <h2 style="text-align: center;">Local variable</h2>
    <p>Local variables are only accessible in the event they are created in</p>

    <input type="text" placeholder="Event ID" class="input-box" style="margin-bottom: 1rem;" id="event_id"/>

    <center>
        <button on:click={() => {
            /**
             * @type {HTMLInputElement}
             */
            // @ts-ignore
            const eventIDElement = document.getElementById('event_id');
            const eventID = eventIDElement ? eventIDElement.value : '';
            
            if (eventID == '' || eventID == undefined) {
                alert('Please enter an event ID');
                return;
            }

            window.location.href += `/${eventID}`;
        }}>
            Open variables
        </button>
    </center>
</Popup>

<main>
    <h1 style="margin-bottom: 0.1rem;">Pick a scope</h1>
    <p style="margin-bottom: 2.5rem;">Please select the scope your variable is in</p>

    <div class="button-split">
        <button on:click={() => editVariable('local')}>
            <img class="editor-icon" src={puzzleIcon} alt="3 Squares with one circle" /><br/>
            <span class="button-label">Local</span>
        </button>
        <button on:click={() => editVariable('global')}>
            <img class="editor-icon" src={globeIcon} alt="3 Squares with one circle" /><br/>
            <span class="button-label">Global</span>
        </button>
    </div>
</main>

<style>
    * {
        font-family: Poppins, sans-serif;
        color: white;
    }

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 75%;
        height: 80%;

        margin-top: 5rem;

        margin-left: auto;
        margin-right: auto;

        background-color: #1a1b1f;

        border-radius: 10px;

        padding: 2rem;
    }

    .button-split {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    button {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        align-items: center;

        padding: 1rem;

        background-color: #353636;
        border-radius: 10px;

        border: none;

        cursor: pointer;
    }

    .editor-icon {
        width: 5rem;
        height: 5rem;

        filter: invert(1);

        padding-left: 2rem;
        padding-right: 2rem;
    }

    .button-label {
        font-size: 1.2rem;
    }

    .input-box {
        width: 100%;
        padding: 0.5rem;
        margin-top: 1rem;

        background-color: #353636;
        border: none;
        border-radius: 10px;
    }
</style>